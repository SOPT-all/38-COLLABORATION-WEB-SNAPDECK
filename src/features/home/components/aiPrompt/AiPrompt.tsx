import type { FormEvent } from "react";

import { RightSmallIcon } from "@/assets";
import {
  CATEGORY_OPTIONS,
  type CategoryValue,
} from "@/features/home/constants/categoryOptions";
import {
  SOURCE_ACTION_OPTIONS,
  type SourceActionValue,
} from "@/features/home/constants/sourceActions";
import useCategoryPanel from "@/features/home/hooks/useCategoryPanel";
import TextButton from "@/shared/ui/textButton";

import PromptTextarea from "./PromptTextarea";
import SourceActions from "./SourceActions";
import Toolbar from "./Toolbar";
import Category from "./category";

interface AiPromptProps {
  promptValue: string;
  handlePromptChange: (value: string) => void;
  categoryValue?: CategoryValue;
  handleCategoryChange: (value: CategoryValue | undefined) => void;
  slideCount: number;
  handleSlideCountChange: (value: number) => void;
  selectedSourceAction?: SourceActionValue;
  handleSourceActionChange: (value: SourceActionValue | undefined) => void;
  handleSourceActionClick: (value: SourceActionValue) => void;
  handleSubmit: () => void;
  minSlideCount?: number;
  maxSlideCount?: number;
  handleFileChange?: (files: FileList) => void;
}

const AiPrompt = ({
  promptValue,
  handlePromptChange,
  categoryValue,
  handleCategoryChange,
  slideCount,
  handleSlideCountChange,
  selectedSourceAction,
  handleSourceActionChange,
  handleSourceActionClick,
  handleSubmit,
  minSlideCount = 1,
  maxSlideCount = 5,
  handleFileChange,
}: AiPromptProps) => {
  const {
    categoryPanelId,
    handleCategoryButtonClick,
    handleCategorySelect,
    isCategoryOpen,
    promptContainerRef,
  } = useCategoryPanel({ handleCategoryChange });
  const categoryLabel =
    CATEGORY_OPTIONS.find(({ value }) => value === categoryValue)?.label ??
    "Styles";
  const selectedSourceActionOption = SOURCE_ACTION_OPTIONS.find(
    ({ value }) => value === selectedSourceAction,
  );

  const handleSelectedSourceActionClick = () => {
    handleSourceActionChange(undefined);
  };

  let selectedSourceActionButton;

  if (selectedSourceActionOption) {
    const SelectedSourceActionIcon = selectedSourceActionOption.Icon;

    selectedSourceActionButton = (
      <TextButton
        variant="primary"
        size="sm"
        iconSize="sm"
        className="typo-caption-r-8 h-[2rem] gap-[0.5rem] rounded-[0.6rem] pr-[0.8rem] pl-[0.3rem]"
        leftIcon={
          <SelectedSourceActionIcon className="[--icon-stroke-width:1]" />
        }
        onClick={handleSelectedSourceActionClick}
      >
        {selectedSourceActionOption.label}
      </TextButton>
    );
  }

  const isDisabled = !promptValue.trim();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form
      aria-label="프롬프트 입력"
      className="flex flex-col items-center gap-[2.8rem]"
      onSubmit={handleFormSubmit}
    >
      <div
        ref={promptContainerRef}
        className="border-snapdeck-300 bg-snapdeck-000 relative flex w-[60.2rem] flex-col rounded-[0.8rem] border"
      >
        {isCategoryOpen ? (
          <div
            id={categoryPanelId}
            className="animate-category-panel-enter bg-snapdeck-300/10 absolute bottom-full left-0 mb-[1.4rem] rounded-[0.4rem] backdrop-blur-[0.4rem]"
          >
            <Category
              value={categoryValue}
              handleChange={handleCategorySelect}
            />
          </div>
        ) : null}

        <div className="pt-[1.2rem] pl-[1.4rem]">
          <TextButton
            variant="primary"
            size="xs"
            rightIcon={<RightSmallIcon />}
            iconSize="sm"
            state={isCategoryOpen ? "active" : "default"}
            className="typo-caption-r-10 h-[2.3rem] min-w-[5.5rem] gap-[0.2rem] rounded-[0.6rem] px-[0.8rem]"
            aria-controls={categoryPanelId}
            aria-expanded={isCategoryOpen}
            onClick={handleCategoryButtonClick}
          >
            {categoryLabel}
          </TextButton>
        </div>

        <div className="border-snapdeck-300 h-[10rem] border-b p-[1.4rem]">
          <PromptTextarea
            value={promptValue}
            handleChange={handlePromptChange}
          />
        </div>

        <div className="px-[1.5rem] py-[1rem]">
          <Toolbar
            value={slideCount}
            min={minSlideCount}
            max={maxSlideCount}
            handleChange={handleSlideCountChange}
            handleFileChange={handleFileChange}
            disabled={isDisabled}
            sourceActions={selectedSourceActionButton}
          />
        </div>
      </div>

      <SourceActions handleSourceActionClick={handleSourceActionClick} />
    </form>
  );
};

export default AiPrompt;
