"use client";

import { useState, useRef } from "react";
import { Loader2, ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageUploader({
    maxSizeMB = 5,
    className = "",
    accept = "image/*",
    onFileSelect,
}: any) {
    const [isUploading, setIsUploading] = useState(false);
    const [tempFile, setTempFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setTempFile(file);
        setPreviewUrl(URL.createObjectURL(file));

        if (onFileSelect) onFileSelect(file);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={cn("space-y-4", className)}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={accept}
                className="hidden"
                disabled={isUploading}
            />

            {previewUrl ? (
                <div className="relative group">
                    <div className="relative rounded-md overflow-hidden border">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            disabled={isUploading}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={!isUploading ? triggerFileInput : undefined}
                    className={cn(
                        "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer",
                        "hover:border-primary transition-colors",
                        isUploading && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <div className="flex flex-col items-center justify-center space-y-2">
                        {isUploading ? (
                            <>
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <p className="text-sm text-muted-foreground">Uploading...</p>
                            </>
                        ) : (
                            <>
                                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                    Click to upload or drag & drop
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG, GIF up to {maxSizeMB}MB
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
