"use client";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot, Sparkles } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AISuggestionDialog } from "@/components/common/AISuggestionDialog"
import { generateProductSuggestions } from "@/lib/ai-service"
import { toast } from "sonner"

export const BasicInfoSection = ({ onSuggestion }: any) => {
  const [title, setTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  ;

  const handleAISuggestion = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title to generate suggestions.");
      return;
    }

    try {
      setIsGenerating(true);
      setAiSuggestions([]);
      setShowAIDialog(true);

      const suggestions = await generateProductSuggestions({
        title: title.trim(),
        count: 5
      });

      setAiSuggestions(suggestions);

      if (suggestions.length === 0) {
        toast.warning("Could not generate suggestions. Please try with a different title.");
      }
    } catch (error) {
      toast.error("Failed to generate AI suggestions. Please try again.");
      setShowAIDialog(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectSuggestion = (suggestion: { title: string; description: string }) => {
    setTitle(suggestion.title);

    if (onSuggestion) {
      onSuggestion({
        title: suggestion.title,
        description: suggestion.description
      });
    }

    toast.success("AI suggestion has been applied to the form.");
  };

  return (
    <>
      <div className="cardBg rounded-lg border p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="product-title" className="text-gray-700 font-medium">
                Product Title
              </Label>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAISuggestion}
                  disabled={isGenerating || !title.trim()}
                  className="flex items-center gap-2"
                  title={!title.trim() ? "Please enter a title to generate suggestions" : "Get AI suggestions"}
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <Input
                id="product-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title here"
                className="border-gray-300 pl-10"
                maxLength={60}
              />

              <Bot className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="text-xs text-muted-foreground flex justify-end">
              {title.length}/60 characters
            </div>
          </div>
        </div>
      </div>

      <AISuggestionDialog
        key={title} // Add key to force re-render when title changes
        open={showAIDialog}
        onOpenChange={setShowAIDialog}
        suggestions={aiSuggestions}
        onSelect={handleSelectSuggestion}
        isLoading={isGenerating}
      />
    </>
  );
};
