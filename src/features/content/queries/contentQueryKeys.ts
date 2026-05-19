export const contentQueryKeys = {
  all: ["content"] as const,
  deck: (deckId: number) => [...contentQueryKeys.all, "deck", deckId] as const,
  deckSlides: (deckId: number) =>
    [...contentQueryKeys.deck(deckId), "slides"] as const,
  deckChats: (deckId: number) =>
    [...contentQueryKeys.deck(deckId), "chats"] as const,
};
