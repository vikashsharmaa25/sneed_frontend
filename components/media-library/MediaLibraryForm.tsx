'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import MultiMediaUploader from '@/components/common/MultiMediaUploader';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { uploadMultipleToS3 } from '@/lib/s3-upload';
import Autocomplete from '@/components/common/Autocomplete';

import { useMutation, useQuery } from '@tanstack/react-query';
import { createMediaLibrary, getIndustries, getProductsName } from '@/apis/all-apis';

function MediaLibraryForm({ open, setOpen }: any) {
    const [formData, setFormData] = useState<any>({
        industry: '',
        productName: '',
        description: '',
        tags: [],
        files: [],
        moduleName: 'media-library'
    });

    const [tagInput, setTagInput] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: industriesData = { data: [] }, isLoading } = useQuery({
        queryKey: ['industries'],
        queryFn: getIndustries,
    });

    const industryOptions = (industriesData?.data || []).map((industry: any) => ({
        label: industry.name,
        value: industry.id.toString(),
    }));

    const handleInputChange = (field: keyof Omit<any, 'files' | 'tags'>, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };
    const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData((prev: any) => ({
                    ...prev,
                    tags: [...prev.tags, tagInput.trim()]
                }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        setFormData((prev: any) => ({
            ...prev,
            tags: prev.tags.filter((t: any) => t !== tag)
        }));
    };

    const handleFiles = (files: FileList | File[]) => {
        const fileArray = Array.from(files);
        const selected: any[] = fileArray
            .filter(file => file && file instanceof File)
            .map(file => ({
                ...file,
                preview: URL.createObjectURL(file),
                type: file.type || 'application/octet-stream'
            }));

        setFormData((prev: any) => ({
            ...prev,
            files: [...prev.files, ...selected]
        }));
    };

    const removeFile = (preview: string) => {
        setFormData((prev: any) => ({
            ...prev,
            files: prev.files.filter((file: any) => file.preview !== preview)
        }));
        URL.revokeObjectURL(preview);
    };
    const { data: productNameData = { data: [] }, isLoading: isProductsLoading } = useQuery({
        queryKey: ['product-names'],
        queryFn: getProductsName,
    });

    console.log(productNameData);

    const productOptions = (productNameData || []).map((product: any) => ({
        label: product.name,
        value: product.id.toString(),
    }));


    const createMediaMutation = useMutation({
        mutationFn: createMediaLibrary,
        onError: () => toast.error("Failed to create media library entry"),
        onSuccess: () => toast.success("Media library entry created!")
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.files.length === 0) {
            toast.error("Please select at least one file to upload");
            return;
        }

        setIsUploading(true);

        try {

            const uploadedFiles = await uploadMultipleToS3(formData.files, formData.moduleName);
            const filePaths = uploadedFiles.map((file) => file.url);
            const payload = {
                industryId: Number(formData.industry),
                productId: Number(formData.productName),
                description: formData.description,
                tags: formData.tags,
                filePaths: filePaths
            };
            await createMediaMutation.mutateAsync(payload);

            toast.success('Media uploaded & saved successfully!');
            setFormData((prev: any) => ({
                ...prev,
                productName: "",
                description: "",
                tags: [],
                files: []
            }));

        } catch (error: any) {
            toast.error(error.message || 'Something went wrong!');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleFilesSelect = (newFiles: File[]) => {
        const validTypes = [
            'image/jpeg', 'image/png', 'image/gif',
            'video/mp4', 'video/quicktime'
        ];

        const validFiles = newFiles.filter(file => {
            if (!validTypes.includes(file.type)) {
                // toast.error(`${file.name} is not supported`);
                return false;
            }

            if (file.size > 5 * 1024 * 1024) {
                toast.error(`${file.name} exceeds 5MB`);
                return false;
            }

            return true;
        });

        handleFiles(validFiles);
    };

    useEffect(() => {
        return () => {
            formData.files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        };
    }, [formData.files]);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Industry <span className="text-red-500">*</span></Label>
                        {isLoading ? (
                            <p className="text-sm text-gray-500">Loading...</p>
                        ) : (
                            <Autocomplete
                                value={
                                    formData.industry
                                        ? industryOptions.find((opt: any) => opt.value === formData.industry) || null
                                        : null
                                }
                                onChange={(item: any) => handleInputChange('industry', item.value)}
                                options={industryOptions}
                                placeholder="Select Industry"
                            />
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Product Name <span className="text-red-500">*</span></Label>
                        <Autocomplete
                            value={
                                formData.productId
                                    ? productOptions.find((opt: any) => opt.value === formData.productId) || null
                                    : null
                            }
                            onChange={(item: any) => handleInputChange('productId', item.value)}
                            options={productOptions}
                            placeholder="Select Product Name"
                            disabled={isProductsLoading}
                        />

                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Description <span className="text-red-500">*</span></Label>
                    <Textarea
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="min-h-[100px]"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md">
                        {formData.tags.map((tag: any) => (
                            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="flex items-center justify-center"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}

                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagInput}
                            placeholder="Type and press Enter"
                            className="flex-1 bg-transparent outline-none px-2 min-w-[150px]"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Upload Images or Videos <span className="text-red-500">*</span></Label>
                    <MultiMediaUploader
                        maxFiles={10}
                        maxSizeMB={5}
                        onFilesSelect={handleFilesSelect}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isUploading} className='bg-blue-500 hover:bg-blue-600'>
                    {isUploading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        'Upload Files'
                    )}
                </Button>
            </div>
        </form>
    );
}

export default MediaLibraryForm;
