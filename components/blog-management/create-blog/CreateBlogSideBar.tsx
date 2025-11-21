"use client"

import React, { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { X as XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ImageUploader from '@/components/common/ImageUploader';

function CreateBlogSideBar({ formData, setFormData, onImageFile }: any) {
    const tagInputRef = useRef<HTMLInputElement>(null);
    const [tagInput, setTagInput] = useState('');

    const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (!formData.tags.includes(newTag)) {
                setFormData((v: any) => ({ ...v, tags: [...v.tags, newTag] }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData((v: any) => ({ ...v, tags: v.tags.filter((tag: string) => tag !== tagToRemove) }));
    };

    return (
        <div className="space-y-4">
            <Card className="overflow-hidden">
                <CardContent className="p-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-gray-700 font-medium">Featured Image</Label>
                            <ImageUploader
                                onFileSelect={(file: any) => {
                                    onImageFile(file);
                                    setFormData((v: any) => ({
                                        ...v,
                                        imageUrl: URL.createObjectURL(file)
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <Label htmlFor="tags" className="text-gray-700 font-medium">blogUrl</Label>
                            <Input placeholder="Url" className="border-gray-300" value={formData.blogUrl} onChange={(e) => setFormData((v: any) => ({ ...v, blogUrl: e.target.value }))} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags" className="text-gray-700 font-medium">Tags</Label>
                            <div
                                className="flex flex-wrap gap-2 border border-input rounded-md p-1 items-center"
                                onClick={() => tagInputRef.current?.focus()}
                            >
                                {formData.tags.map((tag: any) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="flex items-center gap-1 px-2 py-1 text-sm font-medium"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeTag(tag);
                                            }}
                                            className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                                        >
                                            <XIcon className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                                <Input
                                    ref={tagInputRef}
                                    id="tags"
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={addTag}
                                    placeholder={formData.tags.length === 0 ? 'Type and press Enter to add tags...' : 'Add more...'}
                                    className="flex-1 min-w-[100px] border-0 shadow-none focus-visible:ring-0 h-8"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default CreateBlogSideBar