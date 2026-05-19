import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSlideOrder } from "@/features/content/api";
import { contentQueryKeys } from "@/features/content/queries";
import type { SlideContentItem } from "@/features/content/types";

interface UpdateSlideOrderVariables {
  deckId: number;
  slideId: number;
  toOrder: number;
}

export const useUpdateSlideOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<SlideContentItem[], Error, UpdateSlideOrderVariables>({
    mutationFn: ({ slideId, toOrder }) =>
      updateSlideOrder(slideId, { toOrder }),
    onSuccess: (updatedSlides, { deckId }) => {
      queryClient.setQueryData(
        contentQueryKeys.deckSlides(deckId),
        updatedSlides,
      );
    },
  });
};
