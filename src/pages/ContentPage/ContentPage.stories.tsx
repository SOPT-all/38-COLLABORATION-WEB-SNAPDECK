import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import {
  HOME_ENTRY_CHAT_TURNS,
  STATE_B_CHAT_TURNS,
} from "@/features/content/constants/chatMessageMocks";
import {
  SLIDE_CONTENT_EXAMPLES,
  SLIDE_PREVIEW_COUNT,
} from "@/features/content/constants/slideContentExamples";
import type { ContentChatTurn } from "@/features/content/types/chat";
import "@/shared/styles/global.css";
import "@/shared/styles/theme.css";

import ContentPage from "./index";

const PUBLISHING_SLIDES = SLIDE_CONTENT_EXAMPLES.slice(0, SLIDE_PREVIEW_COUNT);

const withRouter = (Story: () => React.JSX.Element) => (
  <MemoryRouter initialEntries={["/content"]}>
    <Story />
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
          "| Default | `/content` 기본 — 채팅 State A(`HOME_ENTRY_CHAT_TURNS`)는 `ChatSection` 내부 기본값 |",
          "| StateAOnHomeEntry | 홈 진입 직후 채팅 스냅샷(제어 모드) |",
          "| StateBAfterGuidelineChip | 가이드라인 칩 전송 후 채팅 스냅샷 |",
          "| StateBInteractive | State B에서 채팅 입력·가이드라인 동작 확인 |",
          "| FiveSlidePublishing | 채팅 `Total 5 slides`와 맞춘 5장 슬라이드 목업 |",
          "| EmptyChatHistory | 채팅 히스토리 없음 |",
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
        "채팅 턴 목록. 전달 시 제어 모드(스냅샷용). 미전달 시 `ChatSection`이 `HOME_ENTRY_CHAT_TURNS`로 비제어 초기화.",
      control: false,
    },
    onTurnsChange: {
      description:
        "제어 모드에서 채팅 턴 변경 콜백. `StateBInteractive` 등에서 사용.",
      control: false,
    },
    initialSlides: {
      description:
        "슬라이드 목업. 미전달 시 `SLIDE_CONTENT_EXAMPLES`(12장). `FiveSlidePublishing`은 5장만 사용.",
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
          "State A에 이어 사용자가 「섹션 6에 대한 콘텐츠를 생성해줘」 요청을 보낸 뒤의 채팅. 퍼블리싱·회귀 스냅샷용(입력해도 턴이 갱신되지 않음).",
      },
    },
  },
};

const StatefulContentPage = ({
  initialTurns,
  ...pageProps
}: React.ComponentProps<typeof ContentPage> & {
  initialTurns: ContentChatTurn[];
}) => {
  const [turns, setTurns] = useState(initialTurns);

  return <ContentPage {...pageProps} turns={turns} onTurnsChange={setTurns} />;
};

/** State B에서 채팅 프롬프트·가이드라인 칩 인터랙션 검증. */
export const StateBInteractive: Story = {
  render: () => <StatefulContentPage initialTurns={STATE_B_CHAT_TURNS} />,
  parameters: {
    docs: {
      description: {
        story:
          "`turns` + `onTurnsChange`로 제어 모드. 새 메시지 전송·가이드라인 동작을 확인할 때 사용.",
      },
    },
  },
};

/** 채팅 「Total 5 slides」와 슬라이드 수를 맞춘 퍼블리싱 목업. */
export const FiveSlidePublishing: Story = {
  args: {
    turns: HOME_ENTRY_CHAT_TURNS,
    initialSlides: PUBLISHING_SLIDES,
  },
  parameters: {
    docs: {
      description: {
        story:
          "슬라이드 5장(`SLIDE_PREVIEW_COUNT`) + 채팅 State A. 전체 12장 목업(`SLIDE_CONTENT_EXAMPLES`)과 구분.",
      },
    },
  },
};

/** 채팅 히스토리가 비어 있는 레이아웃. */
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
