import { HttpResponse, http } from "msw";

import { mockDashBoardCardsResponse } from "./mockDashBoardCards";

export const dashBoardHandlers = [
  http.get("/api/v1/sample-slides", () => {
    return HttpResponse.json(mockDashBoardCardsResponse);
  }),
];
