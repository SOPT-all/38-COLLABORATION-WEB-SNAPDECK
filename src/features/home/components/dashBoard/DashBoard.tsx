import { useDashBoardCardsQuery } from "@/features/home/queries/useDashBoardCardsQuery";

import DashBoardCard from "./DashBoardCard";

const DashBoard = () => {
  const { data: dashBoardCards = [] } = useDashBoardCardsQuery();

  return (
    <section className="bg-snapdeck-000 flex w-[111.6rem] flex-col rounded-[0.6rem] px-[2rem] pb-[1.6rem] shadow-[0_0_0.4rem_0_rgba(0,0,0,0.25)]">
      <header className="flex items-center justify-between py-[1.7rem]">
        <h2 className="typo-head-b-17 text-snapdeck-900">대시보드</h2>
        <button
          type="button"
          disabled
          className="typo-caption-m-11 text-snapdeck-500 hover:text-snapdeck-700"
        >
          전체보기
        </button>
      </header>

      <ul className="flex gap-[1.2rem]">
        {dashBoardCards.map((card) => (
          <li key={card.id}>
            <DashBoardCard card={card} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DashBoard;
