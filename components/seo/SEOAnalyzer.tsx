"use client";

import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { analyzeSEO } from "@/lib/ai-service";
import { cn } from "@/lib/utils";
export const SEOAnalyzer = ({
    title,
    description,
    content,
    focusKeyword,
    metaDescription = '',
}: any) => {
    const [issues, setIssues] = useState<any[]>([]);
    const [score, setScore] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        const analyzeContent = async () => {
            if (!focusKeyword) return;

            setIsAnalyzing(true);

            try {
                // Analyze the content using our AI service
                const { score: seoScore, suggestions } = await analyzeSEO(content, focusKeyword);
                setScore(seoScore);

                const newIssues: any[] = [];

                // Check title
                if (!title.toLowerCase().includes(focusKeyword.toLowerCase())) {
                    newIssues.push({
                        id: 'title-keyword',
                        severity: 'bad',
                        message: 'Focus keyword not in title',
                        tip: `Try adding the focus keyword "${focusKeyword}" to the title`,
                    });
                } else if (title.length > 60) {
                    newIssues.push({
                        id: 'title-length',
                        severity: 'ok',
                        message: 'Title is too long',
                        tip: 'Try to keep the title under 60 characters',
                    });
                } else {
                    newIssues.push({
                        id: 'title-ok',
                        severity: 'good',
                        message: 'Title is well-optimized',
                    });
                }

                // Check meta description
                if (!metaDescription) {
                    newIssues.push({
                        id: 'meta-missing',
                        severity: 'bad',
                        message: 'Meta description is missing',
                        tip: 'Add a meta description to improve click-through rates',
                    });
                } else if (metaDescription.length > 160) {
                    newIssues.push({
                        id: 'meta-length',
                        severity: 'ok',
                        message: 'Meta description is too long',
                        tip: 'Keep meta descriptions under 160 characters',
                    });
                } else {
                    newIssues.push({
                        id: 'meta-ok',
                        severity: 'good',
                        message: 'Meta description is well-optimized',
                    });
                }

                // Check content length
                const wordCount = content.split(/\s+/).length;
                if (wordCount < 300) {
                    newIssues.push({
                        id: 'content-length',
                        severity: 'ok',
                        message: 'Content is too short',
                        tip: 'Aim for at least 300 words for better SEO',
                    });
                } else {
                    newIssues.push({
                        id: 'content-length-ok',
                        severity: 'good',
                        message: 'Content length is good',
                    });
                }

                // Add AI suggestions
                suggestions.forEach((suggestion, index) => {
                    newIssues.push({
                        id: `suggestion-${index}`,
                        severity: 'ok',
                        message: suggestion,
                    });
                });

                setIssues(newIssues);
            } catch (error) {
                console.error('Error analyzing SEO:', error);
            } finally {
                setIsAnalyzing(false);
            }
        };

        analyzeContent();
    }, [title, description, content, focusKeyword, metaDescription]);

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'good':
                return 'text-green-500';
            case 'ok':
                return 'text-yellow-500';
            case 'bad':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'good':
                return <CheckCircle className="h-4 w-4" />;
            case 'ok':
                return <Info className="h-4 w-4" />;
            case 'bad':
                return <AlertCircle className="h-4 w-4" />;
            default:
                return <AlertTriangle className="h-4 w-4" />;
        }
    };

    const getScoreColor = () => {
        if (score >= 80) return 'bg-green-500';
        if (score >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">SEO Analysis</h3>
                <div className="flex items-center space-x-2">
                    <div className="relative h-3 w-24 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={cn(
                                "h-full rounded-full",
                                getScoreColor()
                            )}
                            style={{ width: `${score}%` }}
                        />
                    </div>
                    <span className="text-sm font-medium">{score}/100</span>
                </div>
            </div>

            {isAnalyzing ? (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <div className="space-y-3">
                    {issues.map((issue) => (
                        <div key={issue.id} className="flex items-start space-x-2">
                            <div className={cn("mt-0.5", getSeverityColor(issue.severity))}>
                                {getSeverityIcon(issue.severity)}
                            </div>
                            <div>
                                <p className="text-sm font-medium">{issue.message}</p>
                                {issue.tip && (
                                    <p className="text-xs text-muted-foreground">{issue.tip}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="pt-2 border-t">
                <h4 className="text-sm font-medium mb-2">Focus Keyword: {focusKeyword || 'Not set'}</h4>
                <p className="text-xs text-muted-foreground">
                    The focus keyword is used to analyze how well your content is optimized.
                </p>
            </div>
        </div>
    );
};

export default SEOAnalyzer;
