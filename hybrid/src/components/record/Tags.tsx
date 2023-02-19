import { filterType } from '@/app/(main)/record/page';
import Tag from './Tag';

interface tagsProps {
  filter: filterType;
  onDeleteFilter: (tag: string) => void;
}

export default function Tags({ filter, onDeleteFilter }: tagsProps) {
  return (
    <div>
      <Tag tagName='name' value={filter.name} onDeleteFilter={onDeleteFilter} />
      <Tag
        tagName='opponent'
        value={filter.opponent}
        onDeleteFilter={onDeleteFilter}
      />
      <Tag
        tagName='dateFrom'
        value={filter.dateFrom}
        onDeleteFilter={onDeleteFilter}
      />
      <Tag
        tagName='dateTo'
        value={filter.dateTo}
        onDeleteFilter={onDeleteFilter}
      />
      <Tag
        tagName='leastMoves'
        value={filter.leastMoves}
        onDeleteFilter={onDeleteFilter}
      />
      <Tag
        tagName='timeLimit'
        value={filter.timeLimit}
        onDeleteFilter={onDeleteFilter}
      />
    </div>
  );
}
