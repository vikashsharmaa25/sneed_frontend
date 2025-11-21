import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KnowledgeBaseHeader } from './KnowledgeBaseHeader';
import { KnowledgeBaseTable } from './KnowledgeBaseTable';
import { KnowledgeBaseDialog } from './KnowledgeBaseDialog';
import { KnowledgeBaseViewDialog } from './KnowledgeBaseViewDialog';
import { ConfirmationDialog } from '../common/ConfirmationDialog';
import { KnowledgeBaseItem } from '@/types/interface';
import { toast } from 'sonner';
import { updateKnowledgeBase, deleteKnowledgeBase } from '@/apis/all-apis';
import { Button } from '../ui/button';

export function KnowledgeBaseMain({
  knowledgeBaseData,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false
}: any) {
  const [items, setItems] = useState<KnowledgeBaseItem[]>(knowledgeBaseData?.items || []);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState<KnowledgeBaseItem | null>(null);

  useEffect(() => {
    if (knowledgeBaseData?.items) {
      setItems(knowledgeBaseData.items);
    }
  }, [knowledgeBaseData]);

  const handleAddNew = useCallback(() => {
    setCurrentItem(null);
    setIsEditDialogOpen(true);
  }, []);

  const handleView = useCallback((item: KnowledgeBaseItem) => {
    setCurrentItem(item);
    setIsViewDialogOpen(true);
  }, []);

  const handleEdit = useCallback((item: KnowledgeBaseItem) => {
    setCurrentItem(item);
    setIsEditDialogOpen(true);
  }, []);

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteKnowledgeBase(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-base'] });
      toast.success('Knowledge base item deleted successfully');
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete knowledge base item');
    },
  });

  const handleDeleteClick = useCallback((id: string) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (itemToDelete) {
      try {
        await deleteMutation.mutateAsync(itemToDelete);
      } catch (error) {
      }
    }
  }, [itemToDelete, deleteMutation]);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateKnowledgeBase(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-base'] });
      toast.success('Knowledge base item updated successfully');
      setIsEditDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update knowledge base item');
    },
  });

  const handleSaveKnowledgeBase = async (data: KnowledgeBaseItem) => {
    if (!data.id) {
      toast.error('Invalid item ID');
      return false;
    }

    const payload = {
      title: data.title,
      summary: data.summary,
      problem: data.problem,
      solution: data.solution
    };

    try {
      await updateMutation.mutateAsync({ id: data.id, data: payload });
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex flex-col max-w-[1220px] mx-auto">
      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setIsDeleteDialogOpen(false);
            setItemToDelete(null);
          }
        }}
        title="Delete Knowledge Base Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        confirmText={deleteMutation.isPending ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        variant="destructive"
        confirmButtonDisabled={deleteMutation.isPending}
      />
      <KnowledgeBaseHeader onAddNew={handleAddNew} onFilterClick={() => { }} />

      <div className="flex-1 overflow-hidden">
        <KnowledgeBaseTable
          items={items}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          totalItems={knowledgeBaseData?.count || 0}
        />
      </div>
      <div className='flex justify-center gap-4 my-5'>
        <Button
          onClick={onPrevious}
          variant="outline"
          disabled={!hasPrevious}
          className='min-w-[100px]'
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          variant="default"
          className='min-w-[100px] bg-blue-500 hover:bg-blue-600'
          disabled={!hasNext}
        >
          Next
        </Button>
      </div>

      {/* Edit Dialog */}
      <KnowledgeBaseDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveKnowledgeBase}
        initialData={currentItem}
      />

      {/* View Dialog */}
      <KnowledgeBaseViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        item={currentItem}
      />
    </div>
  );
}

export default KnowledgeBaseMain;
