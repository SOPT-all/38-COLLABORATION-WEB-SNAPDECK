import type { DashBoardCardData } from "@/features/home/types/dashboard";
import { http } from "@/shared/api/http";

export const getDashBoardCards = () => {
  return http.get<DashBoardCardData[]>("/api/dashboards");
};
