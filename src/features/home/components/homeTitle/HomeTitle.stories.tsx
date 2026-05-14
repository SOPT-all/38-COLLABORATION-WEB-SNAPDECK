import type { Meta, StoryObj } from "@storybook/react-vite";

import HomeTitle from "./HomeTitle";

const meta = {
  title: "Home/HomeTitle",
  component: HomeTitle,
  tags: ["autodocs"],
} satisfies Meta<typeof HomeTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
