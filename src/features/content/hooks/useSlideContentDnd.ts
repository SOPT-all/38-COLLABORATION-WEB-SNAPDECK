import { useCallback, useMemo, useState } from "react";

import {
  type DragEndEvent,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import type {
  SlideContentItem,
  SlideReorderPayload,
} from "@/features/content/types";
import {
  reorderSlides,
  sortSlidesByOrder,
} from "@/features/content/utils/reorderSlides.ts";

interface UseSlideContentDndParams {
  slides: SlideContentItem[];
  onReorder: (payload: SlideReorderPayload) => void;
}

export const SLIDE_CONTENT_DND_MODIFIERS = [restrictToVerticalAxis];

const useSlideContentDnd = ({
  slides,
  onReorder,
}: UseSlideContentDndParams) => {
  const [activeSlideId, setActiveSlideId] = useState<number | null>(null);
  const sortedSlides = useMemo(() => sortSlidesByOrder(slides), [slides]);
  const slideIds = useMemo(
    () => sortedSlides.map((slide) => slide.id),
    [sortedSlides],
  );
  const activeSlide = useMemo(
    () => sortedSlides.find((slide) => slide.id === activeSlideId) ?? null,
    [activeSlideId, sortedSlides],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    setActiveSlideId(Number(active.id));
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      setActiveSlideId(null);

      if (!over || active.id === over.id) {
        return;
      }

      const fromIndex = sortedSlides.findIndex(
        (slide) => slide.id === active.id,
      );
      const toIndex = sortedSlides.findIndex((slide) => slide.id === over.id);

      if (fromIndex < 0 || toIndex < 0) {
        return;
      }

      const movedSlide = sortedSlides[fromIndex];
      const nextSlides = reorderSlides(sortedSlides, fromIndex, toIndex);

      onReorder({
        slideId: movedSlide.id,
        fromOrder: movedSlide.order,
        toOrder: toIndex + 1,
        nextSlides,
      });
    },
    [onReorder, sortedSlides],
  );

  const handleDragCancel = useCallback(() => {
    setActiveSlideId(null);
  }, []);

  return {
    activeSlide,
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    sensors,
    slideIds,
    sortedSlides,
  };
};

export default useSlideContentDnd;
