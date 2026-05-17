import type { SlidePreview } from "@/features/content/types/slideTitle";
import { cn } from "@/shared/utils/cn";

import SlidePreviewCard from "./SlidePreviewCard";

interface SlidePreviewListProps {
  slides: SlidePreview[];
  className?: string;
}

const SlidePreviewList = ({ slides, className }: SlidePreviewListProps) => {
  return (
    <section
      className={cn(
        "scrollbar-hide flex gap-[1rem] overflow-x-auto",
        className,
      )}
    >
      {slides.map((slide) => (
        <SlidePreviewCard
          key={slide.id}
          imageName={slide.imageName}
          alt={slide.title}
        />
      ))}
    </section>
  );
};

export default SlidePreviewList;
