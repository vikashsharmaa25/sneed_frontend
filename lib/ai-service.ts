import axios from 'axios';

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const generateProductSuggestions = async (productInfo: {
  title?: string;
  category?: string;
  keyFeatures?: string[];
  targetAudience?: string;
  count?: number;
}): Promise<any[]> => {
  try {
    const count = Math.min(Math.max(productInfo.count || 3, 1), 5);

    const prompt = `Generate ${count} different e-commerce product listings with the following details:
    ${productInfo.title ? `- Product Title: ${productInfo.title}` : ''}
    - Category: ${productInfo.category || 'General'}
    - Key Features: ${productInfo.keyFeatures?.join(', ') || 'Not specified'}
    - Target Audience: ${productInfo.targetAudience || 'General audience'}
    
    For each listing, provide:
    1. A unique and compelling product title (under 60 characters)
    2. A detailed product description (100-200 words)
    3. An SEO meta description (under 160 characters)
    4. 3-5 relevant tags
    5. A quality rating from 1-5 (5 being best) based on creativity, relevance, and market appeal
    
    Format the response as a JSON array of objects with these exact keys: title, description, metaDescription, tags, rating`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert e-commerce copywriter and SEO specialist. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        response_format: { type: 'json_object' },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const content = response.data.choices[0].message.content;

    try {
      const responseData = JSON.parse(content);

      let suggestions = [];
      if (Array.isArray(responseData)) {
        suggestions = responseData;
      } else if (responseData.listings && Array.isArray(responseData.listings)) {
        suggestions = responseData.listings;
      } else if (responseData.suggestions && Array.isArray(responseData.suggestions)) {
        suggestions = responseData.suggestions;
      }

      return suggestions.slice(0, count).map((suggestion: any) => ({
        title: suggestion.title || '',
        description: suggestion.description || '',
        metaDescription: suggestion.metaDescription || '',
        tags: Array.isArray(suggestion.tags) ? suggestion.tags : [],
        rating: typeof suggestion.rating === 'number'
          ? Math.min(5, Math.max(1, suggestion.rating))
          : Math.floor(Math.random() * 3) + 3,
      }));
    } catch (error) {
      throw new Error('Failed to parse AI response. Please try again.');
    }
  } catch (error) {
    return [
      {
        title: 'Error: Could not generate suggestions',
        description: 'We encountered an error while generating suggestions. Please try again later or enter the details manually.',
        metaDescription: '',
        tags: [],
        rating: 1
      }
    ];
  }
};

export const analyzeSEO = async (content: string, keyword: string) => {
  const wordCount = content.split(/\s+/).length;
  const keywordDensity = (content.toLowerCase().split(keyword.toLowerCase()).length - 1) / wordCount;

  const suggestions = [];

  if (wordCount < 300) {
    suggestions.push('Content is too short. Aim for at least 300 words.');
  }

  if (keywordDensity < 0.01) {
    suggestions.push(`Consider using the keyword "${keyword}" more often.`);
  } else if (keywordDensity > 0.03) {
    suggestions.push(`You might be overusing the keyword "${keyword}".`);
  }

  return {
    score: Math.min(100, Math.floor(
      30 +
      (Math.min(wordCount, 1000) / 1000 * 30) +
      (Math.min(keywordDensity * 1000, 30)) +
      (content.includes(keyword) ? 10 : 0)
    )),
    suggestions
  };
};
