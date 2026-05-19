import { useMutation } from "@tanstack/react-query";

import { deleteSlide } from "@/features/content/api";

export const useDeleteSlideMutation = () => {
  return useMutation({
    mutationFn: deleteSlide,
  });
};
