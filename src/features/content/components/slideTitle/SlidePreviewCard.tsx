import { SLIDE_IMAGE_MAP } from "@/features/content/constants/slideImageMap";
import { cn } from "@/shared/utils/cn";

interface SlidePreviewCardProps {
  imageName: keyof typeof SLIDE_IMAGE_MAP;
  alt?: string;
  className?: string;
}

const SlidePreviewCard = ({
  imageName,
  alt = "slide preview",
  className,
}: SlidePreviewCardProps) => {
  const Svg = SLIDE_IMAGE_MAP[imageName];

  return (
    <div
      className={cn(
        "border-snapdeck-300 rounded-button shrink-0 overflow-hidden border",
        className,
      )}
    >
      <Svg aria-label={alt} className="h-full w-full" />
    </div>
  );
};

export default SlidePreviewCard;
