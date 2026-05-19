import { HttpResponse, http } from "msw";

import { mockContentSlides } from "./mockContentSlides";

export const contentHandlers = [
  http.get("/api/v1/decks/:deckId", ({ params }) => {
    const deckId = Number(params.deckId);
    const filteredSlides = mockContentSlides.filter(
      (slide) => slide.deckId === deckId,
    );

    return HttpResponse.json({
      success: true,
      code: "DECK_FOUND",
      message: "덱 조회 완료",
      data: filteredSlides,
    });
  }),
];
