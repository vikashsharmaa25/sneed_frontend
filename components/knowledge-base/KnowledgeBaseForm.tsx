import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function KnowledgeBaseForm({
    initialData,
    onSubmit,
    onCancel,
    submitButtonText = 'Submit',
    cancelButtonText = 'Cancel'
}: any) {
    const [formData, setFormData] = useState<Partial<any>>({
        title: "",
        summary: "",
        problem: "",
        solution: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                        id="title"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleChange}
                        placeholder="Enter title"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                        id="summary"
                        name="summary"
                        value={formData.summary || ''}
                        onChange={handleChange}
                        placeholder="Enter summary"
                        rows={3}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="problem">Problem *</Label>
                    <Textarea
                        id="problem"
                        name="problem"
                        value={formData.problem || ''}
                        onChange={handleChange}
                        placeholder="Describe the problem"
                        rows={4}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="solution">Solution *</Label>
                    <Textarea
                        id="solution"
                        name="solution"
                        value={formData.solution || ''}
                        onChange={handleChange}
                        placeholder="Provide the solution"
                        rows={4}
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                    >
                        {cancelButtonText}
                    </Button>
                )}
                <Button type="submit">
                    {submitButtonText}
                </Button>
            </div>
        </form>
    );
}

export default KnowledgeBaseForm;