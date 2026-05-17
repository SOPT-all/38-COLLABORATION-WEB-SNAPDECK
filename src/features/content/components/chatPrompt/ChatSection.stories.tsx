import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import "@/shared/styles/global.css";
import "@/shared/styles/theme.css";

import ChatPrompt from "./ChatPrompt";
import ChatPromptModeDropdown from "./ChatPromptModeDropdown";
import ChatSection from "./ChatSection";
import { HOME_ENTRY_CHAT_TURNS } from "./constants/chatGuideline";
import type { ChatPromptMode, ContentChatTurn } from "./types/chatPrompt";

const STATE_B_TURN: ContentChatTurn = {
  id: "state-b-turn",
  userMessage: "섹션 6에 대한 콘텐츠를 생성해줘",
  assistantStatus: "complete",
  statusLabel: "프로젝트 분석 완료",
  assistantMessage:
    "Apple의 생태계 전략 보고서에 6번째 섹션을 추가하고 상세 콘텐츠를 생성하겠습니다. 6번 슬라이드에는 향후 전망 및 결론을 담아 마무리하면 좋을 것 같네요. 바로 진행할까요?",
};

const panelDecorator = (Story: () => React.JSX.Element) => (
  <div className="bg-snapdeck-100 flex h-[68.3rem] justify-end">
    <Story />
  </div>
);

const meta = {
  title: "Features/Content/ChatSection",
  component: ChatSection,
  tags: ["autodocs"],
} satisfies Meta<typeof ChatSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "fullscreen" },
  decorators: [panelDecorator],
};

export const StateAOnHomeEntry: Story = {
  parameters: { layout: "fullscreen" },
  decorators: [panelDecorator],
  args: {
    turns: HOME_ENTRY_CHAT_TURNS,
  },
};

export const StateBAfterGuidelineChip: Story = {
  parameters: { layout: "fullscreen" },
  decorators: [panelDecorator],
  args: {
    turns: [STATE_B_TURN],
  },
};

export const WithPromptDraft: Story = {
  parameters: { layout: "fullscreen" },
  decorators: [panelDecorator],
  args: {
    initialPromptValue: "아아아",
  },
};

export const InputEmpty: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div className="w-[30.1rem]">
      <ChatPrompt initialValue="" />
    </div>
  ),
};

export const InputTyping: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div className="w-[30.1rem]">
      <ChatPrompt initialValue="아아아" />
    </div>
  ),
};

export const InputFilled: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div className="w-[30.1rem]">
      <ChatPrompt initialValue="아아아아" />
    </div>
  ),
};

const ModeDropdownStory = ({
  initialMode,
}: {
  initialMode: ChatPromptMode;
}) => {
  const [mode, setMode] = useState<ChatPromptMode>(initialMode);

  return <ChatPromptModeDropdown value={mode} handleOptionClick={setMode} />;
};

export const ModeDropdown: Story = {
  parameters: { layout: "centered" },
  render: () => <ModeDropdownStory initialMode="agent" />,
};

export const ModeDropdownAskSelected: Story = {
  parameters: { layout: "centered" },
  render: () => <ModeDropdownStory initialMode="ask" />,
};
