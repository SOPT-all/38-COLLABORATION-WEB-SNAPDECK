import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  HOME_ENTRY_CHAT_TURNS,
  STATE_B_CHAT_TURNS,
} from "@/features/content/constants/chatMessageMocks";
import "@/shared/styles/global.css";
import "@/shared/styles/theme.css";

import ChatPrompt from "./ChatPrompt";
import ChatPromptModeDropdown from "./ChatPromptModeDropdown";
import ChatSection from "./ChatSection";
import type { ChatPromptMode } from "./types/chatPrompt";

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
    turns: STATE_B_CHAT_TURNS,
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
