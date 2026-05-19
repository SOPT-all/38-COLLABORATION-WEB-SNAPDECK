import { LogoImg } from "@/assets";

const MENU_ITEMS = ["블로그", "지원", "가격", "대시보드"];

const HomeHeader = () => {
  return (
    <header className="sticky top-0 z-(--z-header) h-[4.7rem] px-16">
      <div className="flex h-full items-center justify-between pt-[0.9rem]">
        <button
          type="button"
          aria-label="홈으로 이동"
          className="cursor-pointer"
        >
          <LogoImg className="size-[3rem]" />
        </button>

        <div className="flex items-center gap-[2rem]">
          <nav aria-label="주요 메뉴">
            <ul className="typo-body-r-14 text-snapdeck-500 flex items-center gap-[2.2rem]">
              {MENU_ITEMS.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="hover:text-snapdeck-700 transition-colors duration-200"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            aria-label="사용자 메뉴"
            className="typo-head-sb-14 bg-snapdeck-700 text-snapdeck-000 m-[0.3rem] flex size-[3.2rem] items-center justify-center rounded-full"
          >
            J
          </button>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
