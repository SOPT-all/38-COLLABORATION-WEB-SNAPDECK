import type { ReactNode } from "react";

import { DeleteIcon } from "@/assets";
import { SLIDE_CONTENT_CARD_WIDTH_CLASS_NAME } from "@/features/content/constants/slideContentViewer.constants.ts";
import type { SlideContentItem } from "@/features/content/types";
import IconButton from "@/shared/ui/iconButton/IconButton";
import { cn } from "@/shared/utils/cn";

interface SlideContentCardProps {
  slide: SlideContentItem;
  dragHandle: ReactNode;
  isDragging?: boolean;
  hideDeleteButton?: boolean;
  onDelete?: (slideId: number) => void;
}

const slideContentCardClassName = cn(
  "relative flex min-h-[10rem] items-start gap-12",
  SLIDE_CONTENT_CARD_WIDTH_CLASS_NAME,
  "rounded-sm border border-snapdeck-300 bg-snapdeck-000",
  "p-[1rem] pr-[5rem] transition-[box-shadow,opacity]",
  "data-[dragging=true]:opacity-70 data-[dragging=true]:shadow-elevation-2",
);

const getContentLines = (content: string) => {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

const hasBulletPrefix = (line: string) => {
  return line.startsWith("•");
};

const SlideContentCard = ({
  slide,
  dragHandle,
  isDragging = false,
  hideDeleteButton = false,
  onDelete,
}: SlideContentCardProps) => {
  const titleId = `slide-content-${slide.id}-title`;
  const contentLines = getContentLines(slide.content);
  const isBulletContent =
    contentLines.length > 0 && contentLines.every(hasBulletPrefix);

  return (
    <article
      aria-labelledby={titleId}
      className={slideContentCardClassName}
      data-dragging={isDragging || undefined}
    >
      <div className="flex shrink-0">{dragHandle}</div>

      <div className="flex size-24 shrink-0 items-center justify-center">
        <span className="bg-sub-blue-2 text-snapdeck-000 typo-caption-r-10 flex size-20 shrink-0 items-center justify-center rounded-full">
          {slide.order}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-10 py-[0.9rem]">
        <h3 id={titleId} className="text-snapdeck-700 typo-head-b-17">
          {slide.title}
        </h3>

        {isBulletContent ? (
          <ul className="text-snapdeck-700 typo-body-m-15 flex flex-col gap-10 px-10">
            {contentLines.map((line, index) => (
              <li key={`${slide.id}-${index}`}>{line}</li>
            ))}
          </ul>
        ) : contentLines.length > 0 ? (
          <div className="text-snapdeck-700 typo-body-m-15 flex flex-col gap-10">
            {contentLines.map((line, index) => (
              <p key={`${slide.id}-${index}`}>{line}</p>
            ))}
          </div>
        ) : null}

        {slide.footer ? (
          <div className="flex flex-col gap-10">
            <div className="bg-snapdeck-500 h-px w-full" />
            <p className="text-snapdeck-700 typo-body-m-15 whitespace-pre-line">
              {slide.footer}
            </p>
          </div>
        ) : null}
      </div>

      {!hideDeleteButton && onDelete ? (
        <IconButton
          variant="ghost"
          tone="neutral"
          radius="sm"
          iconSize="sm"
          aria-label={`${slide.order}번 슬라이드 삭제`}
          className="absolute top-0 right-0"
          onClick={() => onDelete(slide.id)}
        >
          <DeleteIcon />
        </IconButton>
      ) : null}
    </article>
  );
};

export default SlideContentCard;
