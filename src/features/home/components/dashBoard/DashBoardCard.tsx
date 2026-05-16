import { UserIcon } from "@/assets";
import TextButton from "@/shared/ui/textButton";
import { getDate } from "@/shared/utils/getDate";

import type { DashBoardCardData } from "../../types/dashboard";
import img1 from "./img1.png";
import img2 from "./img2.png";
import img3 from "./img3.png";

interface DashBoardCardProps {
  card: DashBoardCardData;
}

const DASHBOARD_IMAGES: Record<string, string> = {
  img1,
  img2,
  img3,
};

const DashBoardCard = ({ card }: DashBoardCardProps) => {
  const imgURL = DASHBOARD_IMAGES[card.imgName];

  const baseDate = card.updatedAt ?? card.createdAt;
  const relativeDate = getDate(baseDate);

  return (
    <article className="bg-snapdeck-000 flex h-[20rem] w-[25.6rem] flex-col rounded-[0.6rem] pt-[0.6rem] shadow-[0_0_0.4rem_0_rgba(0,0,0,0.18)]">
      <div className="border-snapdeck-300 relative w-full border-b pb-[1rem]">
        <img
          src={imgURL}
          alt={`${card.title}`}
          className="h-[13.1rem] w-[23.4rem]"
        />
        <span className="bg-snapdeck-500/80 text-snapdeck-000 absolute top-[0rem] left-[0.7rem] flex size-[2.4rem] items-center justify-center rounded-[2rem]">
          <UserIcon />
        </span>
        <span className="typo-caption-r-10 bg-snapdeck-000 text-snapdeck-500 absolute right-[0.7rem] bottom-[0.4rem] rounded-[10rem] px-[0.5rem] py-[0.1rem]">
          {card.slideCount} slides
        </span>
      </div>
      <div className="flex items-center justify-between py-[1.1rem] pt-[0.7rem]">
        <div className="flex flex-col gap-[0.3rem]">
          <p className="typo-caption-m-11">{card.title}</p>
          <p className="typo-caption-r-8">{relativeDate} 업데이트 됨</p>
        </div>
        <TextButton
          variant="primary"
          className="typo-caption-r-8 h-[2rem] w-[3rem] rounded-sm"
        >
          열기
        </TextButton>
      </div>
    </article>
  );
};

export default DashBoardCard;
