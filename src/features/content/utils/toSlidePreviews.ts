import { SLIDE_PREVIEW_COUNT } from "@/features/content/constants/slideContentExamples";
import { SLIDE_IMAGE_MAP } from "@/features/content/constants/slideImageMap";
import type { SlideContentItem } from "@/features/content/types";
import type { SlidePreview } from "@/features/content/types/slideTitle";

export const toSlidePreviews = (
  slides: SlideContentItem[],
  limit = SLIDE_PREVIEW_COUNT,
): SlidePreview[] =>
  [...slides]
    .sort((a, b) => a.order - b.order)
    .slice(0, limit)
    .map((slide) => ({
      id: slide.id,
      title: slide.title,
      imageName: slide.imageName as keyof typeof SLIDE_IMAGE_MAP,
    }));
