import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function TruncatedText({
    text,
    maxLength = 40,
    className = "",
    emptyPlaceholder = "-",
    separator = ", "
}: any) {
    // Handle null/undefined/empty cases
    if (!text || (Array.isArray(text) && text.length === 0)) {
        return <span className="text-muted-foreground/50">{emptyPlaceholder}</span>
    }

    // Convert array to string if needed
    const textStr = Array.isArray(text) ? text.join(separator) : text;

    // Handle empty string case after conversion
    if (textStr.trim() === "") {
        return <span className="text-muted-foreground/50">{emptyPlaceholder}</span>
    }

    // Return full text if it's short enough
    if (textStr.length <= maxLength) {
        return <span className={className}>{textStr}</span>
    }

    // Truncate the text
    const truncatedText = textStr.substring(0, maxLength) + '...';

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <span className={`cursor-help ${className}`}>
                    {truncatedText}
                </span>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
                <p>{textStr}</p>
            </TooltipContent>
        </Tooltip>
    )
}
