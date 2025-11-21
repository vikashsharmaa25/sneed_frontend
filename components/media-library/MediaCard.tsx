import { MediaCardProps } from '@/types/interface'
import { X } from 'lucide-react'
import Image from 'next/image'

export const MediaCard = ({ item, onRemove }: MediaCardProps) => {
  return (
    <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
      <div className="relative aspect-4/3 bg-gray-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded">
            {item.category}
          </span>
        </div>

        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-500">
          {item.date}
        </p>
      </div>
    </div>
  )
}
