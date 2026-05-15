import type { SLIDE_IMAGE_MAP } from "@/features/content/constants/slideImageMap";

export interface SlidePreview {
  id: number;
  imageName: keyof typeof SLIDE_IMAGE_MAP;
  title: string;
}
