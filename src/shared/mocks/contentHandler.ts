import { HttpResponse, http } from "msw";

export const contentHandlers = [
  http.get("/api", () => {
    return HttpResponse.json();
  }),
];
