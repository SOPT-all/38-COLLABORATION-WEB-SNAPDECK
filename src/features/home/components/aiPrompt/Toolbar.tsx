import { type ReactNode, useState } from "react";

import { ClipIcon } from "@/assets";
import IconButton from "@/shared/ui/iconButton";
import TextButton from "@/shared/ui/textButton";

import Counter from "./Counter";

interface ToolbarProps {
  sourceActions?: ReactNode;
}

const Toolbar = ({ sourceActions }: ToolbarProps) => {
  const [slideCount, setSlideCount] = useState(5);

  const handleSlideCountChange = (value: number) => {
    setSlideCount(value);
  };

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
          value={slideCount}
          min={1}
          max={5}
          handleChange={handleSlideCountChange}
        />
        {sourceActions}
      </div>
      <TextButton variant="primary" className="typo-caption-m-10 h-[2rem]">
        생성
      </TextButton>
    </div>
  );
};

export default Toolbar;
