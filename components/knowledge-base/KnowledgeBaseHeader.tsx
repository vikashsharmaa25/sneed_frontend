import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function KnowledgeBaseHeader({
  title = "Knowledge Base",
  description = "Manage and explore your documentation",
}: any) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}
