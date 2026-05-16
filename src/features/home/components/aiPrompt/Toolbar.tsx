import { type ChangeEvent, type ReactNode, useRef } from "react";

import { ClipIcon } from "@/assets";
import type { CounterValueProps } from "@/features/home/types/counter";
import IconButton from "@/shared/ui/iconButton";
import TextButton from "@/shared/ui/textButton";

import Counter from "./Counter";

interface ToolbarProps extends Omit<CounterValueProps, "className"> {
  sourceActions?: ReactNode;
  handleFileChange?: (files: FileList) => void;
}

const Toolbar = ({
  value,
  min,
  max,
  handleChange,
  sourceActions,
  handleFileChange,
}: ToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (!files?.length) {
      return;
    }

    handleFileChange?.(files);
    event.currentTarget.value = "";
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[0.8rem]">
        <IconButton
          variant="ghost"
          tone="weak"
          className="hover:bg-sub-blue-1 p-[1rem]"
          radius="lg"
          aria-label="참고 자료 추가 버튼"
          onClick={handleFileButtonClick}
        >
          <ClipIcon />
        </IconButton>
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          onChange={handleFileInputChange}
        />
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
