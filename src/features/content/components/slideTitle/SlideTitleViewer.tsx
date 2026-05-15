import SlidePreviewList from "@/features/content/components/slideTitle/SlidePreviewList";
import SlideTitleInput from "@/features/content/components/slideTitle/SlideTitleInput";
import type { SlidePreview } from "@/features/content/types/slideTitle";
import { cn } from "@/shared/utils/cn";

interface SlideTitleViewerProps {
  labelId: string;
  title: string;
  slides: SlidePreview[];
  onTitleChange?: (value: string) => void;
  onTitleBlur?: () => void;
  className?: string;
}

const SlideTitleViewer = ({
  labelId,
  title,
  slides,
  onTitleChange,
  onTitleBlur,
  className,
}: SlideTitleViewerProps) => {
  return (
    <section
      aria-labelledby={labelId}
      className={cn("flex w-full flex-col items-start gap-[0.6rem]", className)}
    >
      <h2 id={labelId} className="text-snapdeck-400 typo-head-b-14">
        제목
      </h2>

      <div className="flex w-full flex-col items-start gap-[0.6rem]">
        <SlideTitleInput
          value={title}
          onChange={onTitleChange}
          onBlur={onTitleBlur}
        />

        <SlidePreviewList slides={slides} />
      </div>
    </section>
  );
};

export default SlideTitleViewer;
