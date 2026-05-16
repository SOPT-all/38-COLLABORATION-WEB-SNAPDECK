import type { Meta, StoryObj } from "@storybook/react-vite";

import DashBoardCard from "./DashBoardCard";

const meta = {
  title: "features/home/DashBoardCard",
  component: DashBoardCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DashBoardCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    card: {
      id: 1,
      imgName: "img1",
      title: "Claude cop",
      slideCount: 1,
      createdAt: "2026-05-12T09:00:00",
      updatedAt: null,
    },
  },
};

export const Updated: Story = {
  args: {
    card: {
      id: 2,
      imgName: "img1",
      title: "Claude CopilotvsGPT in Agent Market",
      slideCount: 3,
      createdAt: "2026-05-10T09:00:00",
      updatedAt: "2026-05-14T09:00:00",
    },
  },
};
