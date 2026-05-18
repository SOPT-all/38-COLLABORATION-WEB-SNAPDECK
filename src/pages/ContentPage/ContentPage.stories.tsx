import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter, Route, Routes } from "react-router";

import { PATHS } from "@/app/router/paths";
import {
  HOME_ENTRY_CHAT_TURNS,
  STATE_B_CHAT_TURNS,
} from "@/features/content/constants/chatMessageMocks";
import HomePage from "@/pages/HomePage";
import "@/shared/styles/global.css";
import "@/shared/styles/theme.css";

import ContentPage from "./index";

const withRouter = (Story: () => React.JSX.Element) => (
  <MemoryRouter initialEntries={[PATHS.content]}>
    <div className="relative h-[90rem] w-full overflow-hidden">
      <Routes>
        <Route path={PATHS.home} element={<HomePage />} />
        <Route path={PATHS.content} element={<Story />} />
      </Routes>
    </div>
  </MemoryRouter>
);

const meta = {
  title: "Pages/ContentPage",
  component: ContentPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "콘텐츠 구조 편집 페이지 (`/content`).",
          "",
          "- **왼쪽**: 덱 제목 + 슬라이드 미리보기 + 슬라이드 내용 카드(DnD/삭제)",
          "- **오른쪽**: `ChatSection` 고정 폭 사이드바",
          "",
          "Figma: view 2 (node `2392:1942`).",
          "",
          "| 스토리 | 용도 |",
          "| --- | --- |",
          "| Default | `/content` 기본 — 채팅 State A는 `ContentPage`가 `initialTurns`로 주입 |",
          "| StateAOnHomeEntry | 홈 진입 직후 채팅 스냅샷 |",
          "| StateBAfterGuidelineChip | 가이드라인 칩 전송 후 채팅 스냅샷 |",
          "| EmptyChatHistory | 채팅 히스토리 없음 |",
          "| LeaveConfirmModal | 백헤더 뒤로가기 → 이탈 확인 모달 (Figma `2424:5585`) |",
          "",
          "모든 스토리에서 **뒤로가기**를 누르면 `ConfirmModal`이 열립니다.",
        ].join("\n"),
      },
    },
    viewport: {
      defaultViewport: "desktop1440",
      viewports: {
        desktop1440: {
          name: "Desktop 1440",
          styles: { width: "1440px", height: "900px" },
        },
      },
    },
  },
  decorators: [withRouter],
  argTypes: {
    turns: {
      description:
        "채팅 턴 목록. 전달 시 제어 모드(스냅샷용). 미전달 시 `CONTENT_PAGE_INITIAL_CHAT_TURNS`를 `initialTurns`로 넘깁니다.",
      control: false,
    },
    initialLeaveModalOpen: {
      description: "이탈 확인 모달 초기 오픈 ",
      control: false,
    },
  },
} satisfies Meta<typeof ContentPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/** `/content` 라우트 기본 화면. 채팅·슬라이드 모두 인터랙션 가능. */
export const Default: Story = {};

/** 홈에서 진입한 직후 — 채팅 State A 고정 스냅샷. */
export const StateAOnHomeEntry: Story = {
  args: {
    turns: HOME_ENTRY_CHAT_TURNS,
  },
  parameters: {
    docs: {
      description: {
        story:
          "홈 프롬프트 전송 후 콘텐츠 페이지에 처음 도착한 상태. 사용자 요청 + 「프로젝트 분석 완료」 AI 응답 1턴.",
      },
    },
  },
};

/** 가이드라인 칩(예: 섹션 6 생성) 즉시 전송 후 — 채팅 State B 고정 스냅샷. */
export const StateBAfterGuidelineChip: Story = {
  args: {
    turns: STATE_B_CHAT_TURNS,
  },
  parameters: {
    docs: {
      description: {
        story:
          "State A에 이어 사용자가 「섹션 6에 대한 콘텐츠를 생성해줘」 요청을 보낸 뒤의 채팅. 퍼블리싱·회귀 스냅샷용.",
      },
    },
  },
};

export const LeaveConfirmModal: Story = {
  args: {
    initialLeaveModalOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "뒤로가기 클릭 시 표시되는 확인 모달 스냅샷. 실제 앱에서는 `initialLeaveModalOpen` 없이 뒤로가기로 열립니다.",
      },
    },
  },
};

export const EmptyChatHistory: Story = {
  args: {
    turns: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "채팅 턴이 없을 때 우측 패널 레이아웃(가이드라인·프롬프트만 표시).",
      },
    },
  },
};
