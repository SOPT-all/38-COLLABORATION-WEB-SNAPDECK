import { HttpResponse, http } from "msw";

import { mockDashBoardCardsResponse } from "./mockDashBoardCards";

export const dashBoardHandlers = [
  http.get("/api/dashboards", () => {
    return HttpResponse.json(mockDashBoardCardsResponse);
  }),
];
