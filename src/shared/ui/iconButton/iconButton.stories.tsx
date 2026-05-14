import type { Meta, StoryObj } from "@storybook/react-vite";

import { ArrowUpIcon, CategoryIcon, DeleteIcon } from "@/assets";

import IconButton from "./IconButton";

const variantOptions = ["ghost", "primary"] as const;
const toneOptions = ["weak", "neutral"] as const;
const radiusOptions = ["sm", "md", "lg"] as const;
const iconSizeOptions = ["sm", "lg"] as const;

const meta = {
  title: "Shared/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    variant: "ghost",
    tone: "weak",
    radius: "md",
    iconSize: "lg",
    disabled: false,
    "aria-label": "아이콘 버튼",
    children: <CategoryIcon />,
  },
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
    },
    tone: {
      control: "select",
      options: toneOptions,
    },
    radius: {
      control: "select",
      options: radiusOptions,
    },
    iconSize: {
      control: "select",
      options: iconSizeOptions,
    },
    disabled: {
      control: "boolean",
    },
    "aria-label": {
      control: "text",
    },
    children: {
      control: false,
    },
    className: {
      control: false,
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ ...args }) => <IconButton {...args} />,
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <section>
        <h3 className="mb-8 text-4xl font-bold">Category</h3>
        <div className="flex items-center gap-20">
          <div className="ml-3 flex flex-col items-center gap-4">
            <span>Default</span>
            <IconButton
              variant="ghost"
              tone="weak"
              radius="lg"
              iconSize="lg"
              aria-label="카테고리"
            >
              <CategoryIcon />
            </IconButton>
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-8 text-4xl font-bold">Delete</h3>
        <div className="flex items-center gap-20">
          <div className="ml-3 flex flex-col items-center gap-4">
            <span>Default</span>
            <IconButton
              variant="ghost"
              tone="neutral"
              radius="sm"
              iconSize="sm"
              aria-label="삭제"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-8 text-4xl font-bold">Send</h3>
        <div className="ml-3 flex items-center gap-13">
          <div className="flex flex-col items-center gap-4">
            <span>Disabled</span>
            <IconButton
              variant="primary"
              radius="md"
              iconSize="lg"
              aria-label="전송"
              disabled
            >
              <ArrowUpIcon />
            </IconButton>
          </div>

          <div className="flex flex-col items-center gap-4">
            <span>Enabled</span>
            <IconButton
              variant="primary"
              radius="md"
              iconSize="lg"
              aria-label="전송"
            >
              <ArrowUpIcon />
            </IconButton>
          </div>
        </div>
      </section>
    </div>
  ),
};
