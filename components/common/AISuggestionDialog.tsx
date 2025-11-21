"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogBody,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function AISuggestionDialog({
    open,
    onOpenChange,
    suggestions,
    onSelect,
    isLoading = false,
}: any) {
    const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

    // Reset selection when dialog opens/closes
    useEffect(() => {
        setSelectedSuggestion(null);
    }, [open]);

    const handleSelect = () => {
        if (selectedSuggestion !== null) {
            const { title, description } = suggestions[selectedSuggestion];
            onSelect({ title, description });
            onOpenChange(false);
        }
    };

    const renderDots = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 w-2 rounded-full ${i < Math.round(rating) ? "bg-teal-500" : "bg-gray-300"
                                }`}
                        />
                    ))}
            </div>
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0 overflow-hidden">
                <DialogHeader className="border-b px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <DialogTitle className="m-0">AI Recommendation</DialogTitle>
                        </div>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                        Here are some catchy and effective title ideas
                    </p>
                </DialogHeader>

                <DialogBody className="overflow-y-auto flex-1 p-0">
                    {isLoading ? (
                        <div className="flex-1 flex items-center justify-center py-8">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <div className="h-8 w-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                                <p>Generating suggestions...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3 p-6">
                            {suggestions.map((suggestion: any, index: number) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedSuggestion(index)}
                                    className="flex items-start gap-3 p-4 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <input
                                        type="radio"
                                        checked={selectedSuggestion === index}
                                        onChange={() => setSelectedSuggestion(index)}
                                        className="mt-1 h-4 w-4 cursor-pointer"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-normal text-base text-gray-700 dark:text-gray-300 mb-1">
                                            {suggestion.title}
                                        </h4>
                                        {suggestion.rating !== undefined && renderDots(suggestion.rating)}
                                    </div>
                                </div>
                            ))}
                            {suggestions.length === 0 && !isLoading && (
                                <div className="text-center py-8 text-muted-foreground">
                                    No suggestions available. Try adjusting your input and try again.
                                </div>
                            )}
                        </div>
                    )}
                </DialogBody>

                <DialogFooter className="border-t px-6 py-4">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                        className="bg-gray-200 hover:bg-gray-300 border-0"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSelect}
                        disabled={selectedSuggestion === null || isLoading}
                        className="text-white border-0"
                    >
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}