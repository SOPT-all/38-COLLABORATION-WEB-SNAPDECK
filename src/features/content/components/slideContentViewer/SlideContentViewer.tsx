import { useId } from "react";

import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SlideContentDragOverlay from "@/features/content/components/slideContentViewer/SlideContentDragOverlay";
import SortableSlideContentCard from "@/features/content/components/slideContentViewer/SortableSlideContentCard";
import useSlideContentDnd, {
  SLIDE_CONTENT_DND_MODIFIERS,
} from "@/features/content/hooks/useSlideContentDnd";
import type {
  SlideContentItem,
  SlideReorderPayload,
} from "@/features/content/types";
import { cn } from "@/shared/utils/cn";

export interface SlideContentViewerProps {
  slides: SlideContentItem[];
  onReorder: (payload: SlideReorderPayload) => void;
  onDelete: (slideId: number) => void;
  className?: string;
}

const SlideContentViewer = ({
  slides,
  onReorder,
  onDelete,
  className,
}: SlideContentViewerProps) => {
  const labelId = useId();
  const {
    activeSlide,
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    sensors,
    slideIds,
    sortedSlides,
  } = useSlideContentDnd({ slides, onReorder });

  return (
    <section
      aria-labelledby={labelId}
      className={cn(
        "flex h-[45.5rem] max-h-full w-full flex-col items-start gap-12 self-stretch",
        className,
      )}
    >
      <h2 id={labelId} className="text-snapdeck-400 typo-head-b-14">
        내용
      </h2>

      <div className="flex min-h-0 w-full flex-1 flex-col items-start gap-10 overflow-y-auto pr-12">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={SLIDE_CONTENT_DND_MODIFIERS}
          sensors={sensors}
          onDragCancel={handleDragCancel}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext
            items={slideIds}
            strategy={verticalListSortingStrategy}
          >
            {sortedSlides.map((slide) => (
              <SortableSlideContentCard
                key={slide.id}
                slide={slide}
                onDelete={onDelete}
              />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeSlide ? (
              <SlideContentDragOverlay slide={activeSlide} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </section>
  );
};

export default SlideContentViewer;
