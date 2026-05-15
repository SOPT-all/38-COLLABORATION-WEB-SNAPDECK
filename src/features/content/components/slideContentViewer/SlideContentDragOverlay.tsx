import SlideContentCard from "@/features/content/components/slideContentViewer/SlideContentCard";
import SlideContentDragHandle from "@/features/content/components/slideContentViewer/SlideContentDragHandle";
import { SLIDE_CONTENT_CARD_OVERLAY_WIDTH_CLASS_NAME } from "@/features/content/constants/slideContentViewer.constants.ts";
import type { SlideContentItem } from "@/features/content/types";
import { cn } from "@/shared/utils/cn";

interface SlideContentDragOverlayProps {
  slide: SlideContentItem;
}

const SlideContentDragOverlay = ({ slide }: SlideContentDragOverlayProps) => {
  return (
    <div
      className={cn(SLIDE_CONTENT_CARD_OVERLAY_WIDTH_CLASS_NAME, "opacity-40")}
    >
      <SlideContentCard
        slide={slide}
        dragHandle={<SlideContentDragHandle order={slide.order} isDragging />}
        hideDeleteButton
      />
    </div>
  );
};

export default SlideContentDragOverlay;
