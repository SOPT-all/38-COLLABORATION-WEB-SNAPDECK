import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";

import {
  contentQueryKeys,
  useDeckSlidesQuery,
  useDeleteSlideMutation,
  useUpdateSlideOrderMutation,
} from "@/features/content/queries";
import type {
  SlideContentItem,
  SlideReorderPayload,
} from "@/features/content/types";
import { normalizeSlideOrders } from "@/features/content/utils";
import { isApiError } from "@/shared/api";

const DEFAULT_DECK_ERROR_MESSAGE = "덱 정보를 불러오지 못했습니다.";
const EMPTY_SLIDES: SlideContentItem[] = [];

const getDeckErrorMessage = (error: Error | null) => {
  if (isApiError(error)) {
    return error.message;
  }

  return DEFAULT_DECK_ERROR_MESSAGE;
};

const useContentDeckSlides = (deckId: number) => {
  const queryClient = useQueryClient();
  const query = useDeckSlidesQuery(deckId);
  const { mutate: updateSlideOrder, isPending: isReordering } =
    useUpdateSlideOrderMutation();
  const { mutate: deleteSlide } = useDeleteSlideMutation();
  const slides = query.data ?? EMPTY_SLIDES;

  const updateDeckSlides = useCallback(
    (updater: (currentSlides: SlideContentItem[]) => SlideContentItem[]) => {
      queryClient.setQueryData(
        contentQueryKeys.deckSlides(deckId),
        (currentSlides: SlideContentItem[] | undefined) =>
          updater(currentSlides ?? slides),
      );
    },
    [deckId, queryClient, slides],
  );

  const handleDelete = useCallback(
    (slideId: number) => {
      const previousSlides =
        queryClient.getQueryData<SlideContentItem[]>(
          contentQueryKeys.deckSlides(deckId),
        ) ?? slides;

      updateDeckSlides((currentSlides) =>
        normalizeSlideOrders(
          currentSlides.filter((slide) => slide.id !== slideId),
        ),
      );

      deleteSlide(slideId, {
        onError: () => {
          queryClient.setQueryData(
            contentQueryKeys.deckSlides(deckId),
            previousSlides,
          );
        },
      });
    },
    [deckId, deleteSlide, queryClient, slides, updateDeckSlides],
  );

  const handleReorder = useCallback(
    ({ slideId, toOrder }: SlideReorderPayload) => {
      if (isReordering) {
        return;
      }

      updateSlideOrder({
        deckId,
        slideId,
        toOrder,
      });
    },
    [deckId, isReordering, updateSlideOrder],
  );

  return {
    errorMessage: getDeckErrorMessage(query.error),
    handleDelete,
    handleReorder,
    isError: query.isError,
    isPending: query.isPending,
    slides,
  };
};

export default useContentDeckSlides;
