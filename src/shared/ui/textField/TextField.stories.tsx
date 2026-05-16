import { useMemo, useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  type UrlImportChannel,
  deriveUrlFieldStatus,
} from "@/shared/libs/urlValidation";
import "@/shared/styles/global.css";
import "@/shared/styles/theme.css";
import {
  TextField,
  type TextFieldStatus,
} from "@/shared/ui/textField/TextField";

const URL_IMPORT_MESSAGES = {
  web: {
    success: "유효한 URL",
    error: "유효한 URL을 입력하세요 (예: https://example.com/)",
  },
  notion: {
    success: "유효한 Notion URL",
    error:
      "유효한 Notion URL을 입력하세요 (예: https://your-workspace.notion.site/...)",
  },
} as const;

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

**URL 가져오기 모달 예시**는 \`@/shared/libs/urlValidation\`의 \`deriveUrlFieldStatus\` + 위 메시지 객체로 부모에서 \`status\`/\`helperText\`를 맞추는 패턴을 **InteractiveUrlImport** 스토리에서 보여 줍니다.`,
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
            helperText={URL_IMPORT_MESSAGES.notion.success}
            defaultValue="https://x.notion.site/abc"
            readOnly
          />
        </div>
        <div className="flex flex-col gap-[0.6rem]">
          <span className="typo-caption-m-10 text-snapdeck-500">error</span>
          <TextField
            status="error"
            helperText={URL_IMPORT_MESSAGES.notion.error}
            defaultValue="x"
            readOnly
          />
        </div>
      </div>
    </div>
  ),
};

export const InteractiveUrlImport: Story = {
  render: () => <InteractiveUrlImportDemo />,
};

function helperForUrlStatus(
  status: TextFieldStatus,
  channel: UrlImportChannel,
): string | undefined {
  if (status === "default") return undefined;
  const m = URL_IMPORT_MESSAGES[channel];
  return status === "success" ? m.success : m.error;
}

function InteractiveUrlFieldBlock({ channel }: { channel: UrlImportChannel }) {
  const [value, setValue] = useState("");
  const [blurred, setBlurred] = useState(false);

  const status = useMemo(
    () => deriveUrlFieldStatus(value, blurred, channel),
    [value, blurred, channel],
  );

  const helperText = useMemo(
    () => helperForUrlStatus(status, channel),
    [status, channel],
  );

  const isNotion = channel === "notion";
  const label = isNotion ? "Notion" : "Web";
  const placeholder = isNotion
    ? "https://your-workspace.notion.site/..."
    : "https://example.com/";

  return (
    <section
      className="rounded-field border-snapdeck-200 flex max-w-[30rem] flex-col gap-[0.8rem] border p-[1.2rem]"
      aria-labelledby={`url-import-${channel}-heading`}
    >
      <h3
        id={`url-import-${channel}-heading`}
        className="typo-caption-m-10 text-snapdeck-600"
      >
        {label} ·{" "}
        <code className="text-snapdeck-500">channel=&quot;{channel}&quot;</code>
      </h3>
      <TextField
        status={status}
        helperText={helperText}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setBlurred(true)}
        placeholder={placeholder}
        aria-label={isNotion ? "Notion URL" : "웹 URL"}
      />
      <p className="typo-caption-m-10 text-snapdeck-500">
        status:{" "}
        <code className="bg-snapdeck-100 rounded px-[0.4rem] py-[0.1rem]">
          {status}
        </code>
        {" · "}
        <button
          type="button"
          className="typo-caption-m-10 text-snapdeck-600 underline"
          onClick={() => {
            setValue("");
            setBlurred(false);
          }}
        >
          초기화
        </button>
      </p>
    </section>
  );
}

function InteractiveUrlImportDemo() {
  return (
    <div className="flex max-w-[48rem] flex-col gap-[1.6rem]">
      <p className="typo-caption-m-10 text-snapdeck-500">
        URL 가져오기 모달 예시: \`deriveUrlFieldStatus\` + 채널별 문구로{" "}
        <strong>default → success → error</strong>를 맞춥니다. (데모 전용)
      </p>
      <div className="flex flex-col gap-[1.6rem] md:flex-row md:items-start md:gap-[2rem]">
        <div className="min-w-0 flex-1">
          <InteractiveUrlFieldBlock channel="notion" />
        </div>
        <div className="min-w-0 flex-1">
          <InteractiveUrlFieldBlock channel="web" />
        </div>
      </div>
    </div>
  );
}
