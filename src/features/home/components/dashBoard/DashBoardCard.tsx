import { UserIcon } from "@/assets";
import img_explore1 from "@/assets/images/img_explore1.webp";
import img_explore2 from "@/assets/images/img_explore2.webp";
import img_explore3 from "@/assets/images/img_explore3.webp";
import TextButton from "@/shared/ui/textButton";
import { getDate } from "@/shared/utils/getDate";

import type { DashBoardCardData } from "../../types/dashboard";

interface DashBoardCardProps {
  card: DashBoardCardData;
}

const DASHBOARD_IMAGE_MAP: Record<string, string> = {
  img_explore1,
  img_explore2,
  img_explore3,
};

const DashBoardCard = ({ card }: DashBoardCardProps) => {
  const baseDate = card.updatedAt ?? card.createdAt;
  const relativeDate = getDate(baseDate);
  const imageUrl = DASHBOARD_IMAGE_MAP[card.imageName];

  return (
    <article className="bg-snapdeck-000 flex w-[25.6rem] flex-col rounded-[0.6rem] shadow-[0_0_0.4rem_0_rgba(0,0,0,0.1)]">
      <div className="border-snapdeck-300 relative w-full border-b px-[1.1rem] py-[0.6rem]">
        <img src={imageUrl} alt={`${card.title}`} />
        <span className="bg-snapdeck-500/80 text-snapdeck-000 absolute top-[0.7rem] left-[0.7rem] flex size-[2.4rem] items-center justify-center rounded-[2rem]">
          <UserIcon />
        </span>
        <span className="typo-caption-r-10 bg-snapdeck-000 text-snapdeck-500 absolute right-[0.7rem] bottom-[0.4rem] rounded-[10rem] px-[0.5rem] py-[0.1rem]">
          {card.slideCount} slides
        </span>
      </div>
      <div className="flex items-center justify-between p-[1rem]">
        <div className="flex flex-col gap-[0.3rem]">
          <p className="typo-caption-m-11">{card.title}</p>
          <p className="typo-caption-r-8">{relativeDate} 업데이트 됨</p>
        </div>
        <TextButton
          variant="primary"
          size="xs"
          className="typo-caption-r-8 mr-[0.6rem] h-[2rem] min-w-[3rem] rounded-sm px-[0.7rem]"
        >
          열기
        </TextButton>
      </div>
    </article>
  );
};

export default DashBoardCard;
