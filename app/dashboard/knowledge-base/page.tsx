'use client'

import { getKnowledgeBase } from '@/apis/all-apis'
import KnowledgeBaseMain from '@/components/knowledge-base/KnowledgeBaseMain'
import { useQuery } from '@tanstack/react-query';
import { TableSkeleton } from '@/components/Skelton';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useState } from 'react';

const { handleError } = useErrorHandler();

function Page() {
    const [paginationStack, setPaginationStack] = useState<string[]>([]);
    const [currentKey, setCurrentKey] = useState<string | null>(null);

    const { data, isLoading, error } = useQuery<any>({
        queryKey: ['knowledge-base', currentKey],
        queryFn: () => getKnowledgeBase({
            exclusiveStartKey: currentKey || undefined,
            limit: 10
        }),
        retry: false,
        keepPreviousData: true
    } as any);

    const handleNext = () => {
        if (data?.lastKey) {
            if (currentKey) {
                setPaginationStack(prev => [...prev, currentKey]);
            }
            setCurrentKey(data.lastKey);
        }
    };

    const handlePrevious = () => {
        const previousStack = [...paginationStack];
        const previousKey = previousStack.pop();
        setPaginationStack(previousStack);
        setCurrentKey(previousKey || null);
    };

    if (isLoading) return <div className='cardBg'><TableSkeleton /></div>;
    if (error) return handleError(error);

    return (
        <div className='cardBg'>
            <KnowledgeBaseMain
                knowledgeBaseData={data}
                onNext={handleNext}
                onPrevious={paginationStack.length > 0 ? handlePrevious : undefined}
                hasNext={!!data?.lastKey}
                hasPrevious={paginationStack.length > 0}
            />
        </div>
    )
}

export default Page;
