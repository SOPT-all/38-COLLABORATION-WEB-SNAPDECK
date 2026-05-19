import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postDeckSlide } from "@/features/content/api/contentApi";
import { contentQueryKeys } from "@/features/content/queries";

export const usePostDeckSlideMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deckId: number) => postDeckSlide(deckId),

    onSuccess: (updatedSlides, deckId) => {
      queryClient.setQueryData(
        contentQueryKeys.deckSlides(deckId),
        updatedSlides,
      );
    },
  });
};
