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
  const imageSrc = SLIDE_IMAGE_MAP[imageName];

  return (
    <div
      className={cn(
        "border-snapdeck-300 rounded-button shrink-0 overflow-hidden border",
        className,
      )}
    >
      <img src={imageSrc} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
};

export default SlidePreviewCard;
