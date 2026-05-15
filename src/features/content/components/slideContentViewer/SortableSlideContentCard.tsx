import type { CSSProperties } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import SlideContentCard from "@/features/content/components/slideContentViewer/SlideContentCard";
import SlideContentDragHandle from "@/features/content/components/slideContentViewer/SlideContentDragHandle";
import { SLIDE_CONTENT_CARD_WIDTH_CLASS_NAME } from "@/features/content/constants/slideContentViewer.constants.ts";
import type { SlideContentItem } from "@/features/content/types";
import { cn } from "@/shared/utils/cn";

interface SortableSlideContentCardProps {
  slide: SlideContentItem;
  onDelete: (slideId: number) => void;
}

const SortableSlideContentCard = ({
  slide,
  onDelete,
}: SortableSlideContentCardProps) => {
  const {
    attributes,
    isDragging,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: slide.id });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 1 : undefined,
  };

  const dragHandle = (
    <SlideContentDragHandle
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      order={slide.order}
    />
  );

  return (
    <div
      ref={setNodeRef}
      className={cn("relative", SLIDE_CONTENT_CARD_WIDTH_CLASS_NAME)}
      style={style}
    >
      <SlideContentCard
        slide={slide}
        dragHandle={dragHandle}
        isDragging={isDragging}
        onDelete={onDelete}
      />
    </div>
  );
};

export default SortableSlideContentCard;
