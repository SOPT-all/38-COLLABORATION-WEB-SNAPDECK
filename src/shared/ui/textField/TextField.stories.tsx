import type { Meta, StoryObj } from "@storybook/react-vite";

import "@/shared/styles/global.css";
import "@/shared/styles/theme.css";
import {
  TextField,
  type TextFieldStatus,
} from "@/shared/ui/textField/TextField";

const meta = {
  title: "Shared/TextField",
  component: TextField,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
공통 **TextField**입니다. \`status\`·\`helperText\`는 **부모**에서 결정합니다.

- **\`status\`**: \`default\` · \`success\` · \`error\` — 셸(테두리·배경) 스타일
- **\`helperText\`**: 성공/오류 안내 문구(없으면 하단 행 미표시). \`success\`일 때 기본으로 체크 아이콘 + 녹색 문구(\`showCheckIcon={false}\`로 아이콘만 끌 수 있음)
- **\`disabled\`**: 입력 불가 + 회색 셸, 헬퍼 미표시(폼에서 제외되는 비활성)
- **\`readOnly\`**: 입력만 막고 **\`status\` 셸·헬퍼는 유지** — 값 표시만 하거나 성공/오류 UI를 유지할 때

부모에서 \`status\`와 \`helperText\`를 결정해서 넘기면 TextField는 해당 상태를 렌더링합니다.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["default", "success", "error"] satisfies TextFieldStatus[],
      description: "셸 스타일",
    },
    helperText: { description: "하단 안내(없으면 미표시)" },
    showCheckIcon: {
      control: "boolean",
      description: "success일 때 체크 아이콘 표시",
    },
    disabled: { description: "비활성(회색 셸, 헬퍼 없음)" },
    readOnly: { description: "읽기 전용(status·헬퍼 유지)" },
    containerClassName: {
      description: "최상위 래퍼 `className`",
      table: { type: { summary: "string" } },
    },
    className: { description: "`input` 전용 클래스" },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "default",
    placeholder: "입력",
  },
};

export const SuccessWithHelper: Story = {
  args: {
    status: "success",
    helperText: "조건을 만족했습니다.",
    defaultValue: "https://example.com/",
    readOnly: true,
  },
};

export const ErrorWithHelper: Story = {
  args: {
    status: "error",
    helperText: "올바른 값을 입력해 주세요.",
    defaultValue: "x",
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    status: "success",
    helperText: "비활성 시에는 헬퍼가 숨겨집니다.",
    disabled: true,
    defaultValue: "https://example.com/",
  },
};

export const ReadOnlySuccess: Story = {
  args: {
    status: "success",
    helperText: "유효한 URL",
    readOnly: true,
    defaultValue: "https://example.com/",
  },
};

export const StatusRow: Story = {
  render: () => (
    <div className="flex max-w-[96rem] flex-col gap-[2rem]">
      <p className="typo-caption-m-10 text-snapdeck-500">
        열: <strong>status</strong> — default · success · error
      </p>
      <div className="grid gap-[1.6rem] md:grid-cols-3">
        <div className="flex flex-col gap-[0.6rem]">
          <span className="typo-caption-m-10 text-snapdeck-500">default</span>
          <TextField status="default" placeholder="https://..." />
        </div>
        <div className="flex flex-col gap-[0.6rem]">
          <span className="typo-caption-m-10 text-snapdeck-500">success</span>
          <TextField
            status="success"
            helperText="조건을 만족했습니다."
            defaultValue="입력 완료"
            readOnly
          />
        </div>
        <div className="flex flex-col gap-[0.6rem]">
          <span className="typo-caption-m-10 text-snapdeck-500">error</span>
          <TextField
            status="error"
            helperText="올바른 값을 입력해 주세요."
            defaultValue="x"
            readOnly
          />
        </div>
      </div>
    </div>
  ),
};
