import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import { STATE_B_CHAT_TURNS } from "@/features/content/constants/chatMessageMocks";
import "@/shared/styles/global.css";
import "@/shared/styles/theme.css";

import ContentPage from "./index";

const withRouter = (Story: () => React.JSX.Element) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const meta = {
  title: "Pages/ContentPage",
  component: ContentPage,
  parameters: { layout: "fullscreen" },
  decorators: [withRouter],
} satisfies Meta<typeof ContentPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StateBAfterGuidelineChip: Story = {
  args: {
    turns: STATE_B_CHAT_TURNS,
  },
};
