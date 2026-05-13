import type { Meta, StoryObj } from "@storybook/react-vite";

import { ArrowUpIcon, CategoryIcon, DeleteIcon } from "@/assets";

import IconButton from "./IconButton";

const meta = {
  title: "Shared/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    variant: "category",
    "aria-label": "아이콘 버튼",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <section>
        <h3 className="mb-8 text-4xl font-bold">Category</h3>
        <div className="flex items-center gap-20">
          <div className="ml-3 flex flex-col items-center gap-4">
            <span>Default</span>
            <IconButton variant="category" aria-label="카테고리">
              <CategoryIcon />
            </IconButton>
          </div>

          <div className="flex flex-col items-center gap-4">
            <span>Hover</span>
            <IconButton
              variant="category"
              aria-label="카테고리 hover"
              className="bg-sub-blue-2 text-snapdeck-000"
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
            <IconButton variant="delete" aria-label="삭제">
              <DeleteIcon />
            </IconButton>
          </div>

          <div className="flex flex-col items-center gap-4">
            <span>Hover</span>
            <IconButton
              variant="delete"
              aria-label="삭제 hover"
              className="bg-sub-blue-2 text-snapdeck-000"
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
            <IconButton variant="send" aria-label="전송 비활성화" disabled>
              <ArrowUpIcon />
            </IconButton>
          </div>

          <div className="flex flex-col items-center gap-4">
            <span>Enabled</span>
            <IconButton variant="send" aria-label="전송">
              <ArrowUpIcon />
            </IconButton>
          </div>
        </div>
      </section>
    </div>
  ),
};
