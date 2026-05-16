import type { DashBoardCardData } from "@/features/home/types/dashboard";
import type { BaseSuccess } from "@/shared/types/api";

export const mockDashBoardCards: DashBoardCardData[] = [
  {
    id: 1,
    imageName: "explore1",
    title: "Claude cop",
    slideCount: 1,
    createdAt: "2026-05-11T09:00:00",
    updatedAt: null,
  },
  {
    id: 2,
    imageName: "explore2",
    title: "Claude CopilotvsGPT in Agent Market",
    slideCount: 5,
    createdAt: "2026-05-10T09:00:00",
    updatedAt: "2026-05-11T09:00:00",
  },
  {
    id: 3,
    imageName: "explore3",
    title: "Zero-Click Era Survival Guide",
    slideCount: 3,
    createdAt: "2026-05-09T09:00:00",
    updatedAt: null,
  },
];

export const mockDashBoardCardsResponse: BaseSuccess<DashBoardCardData[]> = {
  success: true,
  code: "200",
  message: "대시보드 카드 목록 조회 성공",
  data: mockDashBoardCards,
};
