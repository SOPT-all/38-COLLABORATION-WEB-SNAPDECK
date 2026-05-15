import type { ReactNode } from "react";

import { ClipIcon } from "@/assets";
import type { CounterValueProps } from "@/features/home/types/counter";
import IconButton from "@/shared/ui/iconButton";
import TextButton from "@/shared/ui/textButton";

import Counter from "./Counter";

interface ToolbarProps extends Omit<CounterValueProps, "className"> {
  sourceActions?: ReactNode;
}

const Toolbar = ({
  value,
  min,
  max,
  handleChange,
  sourceActions,
}: ToolbarProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[0.8rem]">
        <IconButton
          variant="ghost"
          tone="weak"
          className="hover:text-snapdeck-000 hover:bg-sub-blue-1 p-[1rem]"
          radius="lg"
          aria-label="참고 자료 추가 버튼"
        >
          <ClipIcon />
        </IconButton>
        <Counter
          value={value}
          min={min}
          max={max}
          handleChange={handleChange}
        />
        {sourceActions}
      </div>
      <TextButton
        type="submit"
        variant="primary"
        className="typo-caption-m-10 h-[2rem]"
      >
        생성
      </TextButton>
    </div>
  );
};

export default Toolbar;
