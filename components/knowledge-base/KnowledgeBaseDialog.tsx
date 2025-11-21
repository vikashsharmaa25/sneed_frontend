"use client";

import { KnowledgeBaseForm } from './KnowledgeBaseForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogBody,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { KnowledgeBaseItem } from '@/types/interface';

export function KnowledgeBaseDialog({ open, onOpenChange, onSave, initialData }: any) {
  const handleSave = (data: KnowledgeBaseItem) => {
    onSave(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl overflow-y-auto my-scroll">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Knowledge Base Item' : 'Add New Knowledge Base Item'}</DialogTitle>
          <DialogClose><X className="size-4" /></DialogClose>
        </DialogHeader>
        <Separator />
        <DialogBody>
          <KnowledgeBaseForm
            initialData={initialData}
            onSubmit={handleSave}
            onCancel={handleCancel}
            submitButtonText={initialData ? 'Update Item' : 'Create Item'}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}