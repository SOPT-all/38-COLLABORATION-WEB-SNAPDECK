import { LogoImg } from "@/assets";
import { cn } from "@/shared/utils/cn";

const MENU_ITEMS = ["블로그", "지원", "가격", "대시보드"];

const HomeHeader = () => {
  return (
    <header
      className={cn("bg-snapdeck-000", "z-(--z-header)", "h-[4.7rem] px-16")}
    >
      <div className="flex h-full items-center justify-between pt-[0.9rem]">
        <LogoImg className="size-[3rem]" />

        <div className="flex items-center gap-[2rem]">
          <ul
            className={cn(
              "typo-body-r-14 text-snapdeck-500",
              "flex items-center gap-[2.2rem]",
            )}
          >
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

          <button
            type="button"
            className={cn(
              "typo-head-sb-14",
              "bg-snapdeck-700 text-snapdeck-000",
              "m-[0.3rem] flex size-[3.2rem] items-center justify-center rounded-full",
            )}
          >
            J
          </button>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
