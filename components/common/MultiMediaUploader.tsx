"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Loader2, Image as ImageIcon, Video, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileWithPreview extends File {
    preview: string;
    type: 'image' | 'video';
}

export default function MultiMediaUploader({
    maxFiles = 10,
    maxSizeMB = 50,
    className = "",
    accept = "image/*,video/*",
    onFilesSelect,
}: {
    maxFiles?: number;
    maxSizeMB?: number;
    className?: string;
    accept?: string;
    onFilesSelect?: (files: File[]) => void;
}) {
    const [isUploading, setIsUploading] = useState(false);
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFilesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []);

        // Check if adding new files would exceed maxFiles limit
        if (files.length + newFiles.length > maxFiles) {
            alert(`You can only upload up to ${maxFiles} files`);
            return;
        }

        // Check file sizes and types
        const validFiles = newFiles.filter(file => {
            const isImage = file.type.startsWith('image/');
            const isVideo = file.type.startsWith('video/');
            const isValidSize = file.size <= maxSizeMB * 1024 * 1024;

            if (!isImage && !isVideo) {
                console.warn(`File ${file.name} is not an image or video`);
                return false;
            }

            if (!isValidSize) {
                console.warn(`File ${file.name} exceeds maximum size of ${maxSizeMB}MB`);
                return false;
            }

            return true;
        });

        // Create file previews
        const filesWithPreviews = validFiles.map(file => ({
            ...file,
            preview: URL.createObjectURL(file),
            type: file.type.startsWith('video/') ? 'video' as const : 'image' as const,
        }));

        setFiles(prev => [...prev, ...filesWithPreviews]);

        if (onFilesSelect) {
            onFilesSelect([...files, ...validFiles]);
        }
    }, [files, maxFiles, maxSizeMB, onFilesSelect]);

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset input to allow selecting the same file again
            fileInputRef.current.click();
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        // Revoke the object URL to avoid memory leaks
        URL.revokeObjectURL(newFiles[index].preview);
        newFiles.splice(index, 1);
        setFiles(newFiles);

        if (onFilesSelect) {
            onFilesSelect(newFiles);
        }
    };

    // Clean up object URLs on unmount
    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    return (
        <div className={cn("space-y-4", className)}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFilesChange}
                accept={accept}
                className="hidden"
                multiple
                disabled={isUploading || files.length >= maxFiles}
            />

            {files.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {files.map((file, index) => (
                        <div key={index} className="relative group">
                            <div className="relative rounded-md overflow-hidden border aspect-square">
                                {file.type === 'image' ? (
                                    <img
                                        src={file.preview}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-black flex items-center justify-center">
                                        <Video className="h-8 w-8 text-white" />
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    disabled={isUploading}
                                >
                                    <X className="h-3 w-3" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                                    {file.name}
                                </div>
                            </div>
                        </div>
                    ))}

                    {files.length < maxFiles && (
                        <div
                            onClick={!isUploading ? triggerFileInput : undefined}
                            className={cn(
                                "border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer",
                                "hover:border-primary transition-colors aspect-square",
                                isUploading && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <div className="text-center p-4">
                                <ImageIcon className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                                <span className="text-sm text-muted-foreground">
                                    Add more
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onClick={!isUploading ? triggerFileInput : undefined}
                    className={cn(
                        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer",
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
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                    Click to upload or drag & drop
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Images and videos up to {maxSizeMB}MB each
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Max {maxFiles} files
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
