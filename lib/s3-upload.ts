import axiosInstance from '@/apis/axios/axiosInstance';
import axios from 'axios';

export interface UploadedFile {
    url: string;
    name: string;
    type: string;
    size: number;
}

export const getPresignedUrl = async (fileName: string, contentType: string, moduleName: any) => {
    try {
        if (!fileName) {
            throw new Error('File name is required');
        }

        const response = await axiosInstance.post('/pre-signed-url', {
            fileName: fileName,
            contentType: contentType,
            moduleName: moduleName
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting presigned URL:', error);
        throw error;
    }
};

export const uploadToS3 = async (file: File, moduleName: any): Promise<UploadedFile> => {
    try {
        // Ensure file has a valid name
        const fileName = file.name || `file-${Date.now()}`;
        const fileType = file.type || 'application/octet-stream';

        const presignedUrl = await getPresignedUrl(fileName, fileType, moduleName);

        if (!presignedUrl) {
            throw new Error('No presigned URL returned from getPresignedUrl');
        }

        const url = new URL(presignedUrl);

        await axios.put(presignedUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
            transformRequest: (data, headers) => {
                if (headers) {
                    delete headers.common;
                    delete headers.post;
                    delete headers.put;
                }
                return data;
            },
        });

        const fileUrl = `https://s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}${url.pathname}`;

        return {
            url: fileUrl,
            name: fileName,
            type: fileType,
            size: file.size
        };
    } catch (error: any) {
        console.error('Error uploading file to S3:', error);
        throw error?.response?.data || error.message || 'Failed to upload file';
    }
};

export const uploadMultipleToS3 = async (files: File[], moduleName: any): Promise<UploadedFile[]> => {
    try {
        // Upload files in parallel
        const uploadPromises = files.map(file => uploadToS3(file, moduleName));

        // Wait for all uploads to complete
        const results = await Promise.all(uploadPromises);
        return results;
    } catch (error) {
        console.error('Error uploading multiple files to S3:', error);
        throw error;
    }
};
