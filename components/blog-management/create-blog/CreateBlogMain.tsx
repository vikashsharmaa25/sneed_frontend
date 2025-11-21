'use client'

import { useEffect, useState } from 'react'
import CreateBlogHeader from './CreateBlogHeader'
import CreateBlogSideBar from './CreateBlogSideBar'
import CreateBlogBasicInfo from './CreateBlogBasicInfo'
import SeoSetting from './SeoSetting'
import { createBlog, getBlogById, updateBlog } from '@/apis/all-apis'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { uploadToS3 } from '@/lib/s3-upload'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function CreateBlogMain({ editId }: any) {
    const queryClient = useQueryClient()
    const { handleError } = useErrorHandler()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excrept: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
        tags: [],
        imageUrl: '',
        blogUrl: '',
    });

    // Fetch blog data if in edit mode
    const { data: blogData, isLoading: isLoadingBlog } = useQuery({
        queryKey: ['blog', editId],
        queryFn: () => getBlogById({ id: editId as string }),
        enabled: !!editId && isEditMode,
        select: (data) => data
    })

    // Update form data when blog data is loaded
    useEffect(() => {
        if (blogData?.data?.length > 0) {
            const blog = blogData.data[0];
            setFormData({
                title: blog.title || '',
                content: blog.content || '',
                excrept: blog.excerpt || '',
                seoTitle: blog.seoTitle || blog.title || '',
                seoDescription: blog.seoDescription || blog.excerpt || '',
                seoKeywords: Array.isArray(blog.seoKeywords) ? blog.seoKeywords.join(', ') : '',
                tags: Array.isArray(blog.tags) ? blog.tags : [],
                imageUrl: blog.imageUrl || '',
                blogUrl: blog.blogUrl || '',
            });
            if (blog.imageUrl) {
                setImageFile(blog.imageUrl);
            }
        }
    }, [blogData]);

    // Set edit mode if editId exists
    useEffect(() => {
        if (editId) {
            setIsEditMode(true);
        }
    }, [editId]);

    const createMutation = useMutation({
        mutationFn: createBlog,
        onMutate: () => setLoading(true),
        onSuccess: (data: any) => {
            toast.success("Post created successfully.")
            queryClient.invalidateQueries({ queryKey: ["blogs"] })
            router.push('/dashboard/blog')
        },
        onSettled: () => setLoading(false),
        onError: (error: any) => {
            handleError(error)
        }
    })

    const updateMutation = useMutation({
        mutationFn: (data: any) => updateBlog(editId as string, data),
        onMutate: () => setLoading(true),
        onSuccess: (data: any) => {
            toast.success("Post updated successfully.")
            queryClient.invalidateQueries({ queryKey: ["blogs"] })
            queryClient.invalidateQueries({ queryKey: ["blog", editId] })
            router.push('/dashboard/blog')
        },
        onSettled: () => setLoading(false),
        onError: (error: any) => {
            handleError(error)
        }
    })

    const handleSubmit = async () => {
        if (!formData.title.trim()) {
            toast.error("Title is required");
            return;
        }

        try {
            let imageUrl: any = formData.imageUrl;

            if (imageFile) {
                const uploaded = await uploadToS3(imageFile, 'blog');
                imageUrl = uploaded?.url || uploaded;
            }

            const payload = {
                ...formData,
                imageUrl,
            };

            if (isEditMode && editId) {
                await updateMutation.mutateAsync(payload);
            } else {
                await createMutation.mutateAsync(payload);
            }
        } catch (error) {
            toast.error(`Failed to ${isEditMode ? 'update' : 'create'} blog. Please try again.`);
        }
    };


    const handleImageFile = (file: File) => {
        setImageFile(file);
    };

    return (
        <div>
            <div className="space-y-2 max-w-4xl mx-auto">
                <CreateBlogHeader
                    handleSubmit={handleSubmit}
                    loading={loading}
                    disabled={!imageFile}
                    isEditMode={isEditMode}
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    <div className="lg:col-span-2 space-y-2">
                        <CreateBlogBasicInfo formData={formData} setFormData={setFormData} />
                        <SeoSetting formData={formData} setFormData={setFormData} />
                    </div>

                    <CreateBlogSideBar formData={formData} setFormData={setFormData} loading={loading} onImageFile={handleImageFile} />
                </div>
            </div>
        </div>
    )
}

export default CreateBlogMain