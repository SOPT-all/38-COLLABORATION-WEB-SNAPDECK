import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSlideOrder } from "@/features/content/api";
import { contentQueryKeys } from "@/features/content/queries";
import type { SlideContentItem } from "@/features/content/types";

interface UpdateSlideOrderVariables {
  deckId: number;
  slideId: number;
  toOrder: number;
  nextSlides: SlideContentItem[];
}

interface UpdateSlideOrderContext {
  previousSlides?: SlideContentItem[];
}

export const useUpdateSlideOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SlideContentItem[],
    Error,
    UpdateSlideOrderVariables,
    UpdateSlideOrderContext
  >({
    mutationFn: ({ slideId, toOrder }) =>
      updateSlideOrder(slideId, { toOrder }),
    onMutate: async ({ deckId, nextSlides }) => {
      const queryKey = contentQueryKeys.deckSlides(deckId);

      await queryClient.cancelQueries({ queryKey });

      const previousSlides =
        queryClient.getQueryData<SlideContentItem[]>(queryKey);

      queryClient.setQueryData(queryKey, nextSlides);

      return { previousSlides };
    },
    onError: (_error, { deckId }, context) => {
      if (!context?.previousSlides) {
        return;
      }

      queryClient.setQueryData(
        contentQueryKeys.deckSlides(deckId),
        context.previousSlides,
      );
    },
    onSuccess: (updatedSlides, { deckId }) => {
      queryClient.setQueryData(
        contentQueryKeys.deckSlides(deckId),
        updatedSlides,
      );
    },
  });
};
