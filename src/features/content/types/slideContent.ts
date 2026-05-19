export interface SlideContentItem {
  id: number;
  deckId: number;
  order: number;
  imageName: string;
  title: string;
  content: string;
  footer: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface SlideReorderPayload {
  slideId: number;
  toOrder: number;
  nextSlides: SlideContentItem[];
}
