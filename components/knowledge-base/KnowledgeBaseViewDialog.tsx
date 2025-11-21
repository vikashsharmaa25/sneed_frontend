import React from 'react';
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

export function KnowledgeBaseViewDialog({
  open,
  onOpenChange,
  item
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: KnowledgeBaseItem | null;
}) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl overflow-y-auto my-scroll">
        <DialogHeader>
          <DialogTitle>Knowledge Base Details</DialogTitle>
          <DialogClose><X className="size-4" /></DialogClose>
        </DialogHeader>
        <Separator />
        <DialogBody className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <div className="text-sm text-muted-foreground">
                <p><span className="font-medium">Category:</span> {item.category || 'N/A'}</p>
                <p><span className="font-medium">Author:</span> {item.author || 'N/A'}</p>
                <p><span className="font-medium">Last Updated:</span> {item.last_updated || 'N/A'}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Summary</h4>
              <p className="text-sm text-muted-foreground">{item.summary || 'No summary available'}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Problem</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {item.problem || 'No problem description available'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Solution</h4>
              <div className="text-sm text-muted-foreground whitespace-pre-line">
                {Array.isArray(item.solution)
                  ? item.solution.map((sol, i) => <p key={i} className="mb-2">{sol}</p>)
                  : item.solution || 'No solution provided'}
              </div>
            </div>

            {item.tags && item.tags.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.region && item.region.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Region</h4>
                <div className="flex flex-wrap gap-2">
                  {item.region.map((reg, index) => (
                    <span key={index} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
