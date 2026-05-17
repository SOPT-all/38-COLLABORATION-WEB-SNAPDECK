import { useEffect, useId, useRef, useState } from "react";

import type { CategoryValue } from "@/features/home/constants/categoryOptions";

interface UseCategoryPanelProps {
  handleCategoryChange: (value: CategoryValue | undefined) => void;
}

const useCategoryPanel = ({ handleCategoryChange }: UseCategoryPanelProps) => {
  const categoryPanelId = useId();
  const promptContainerRef = useRef<HTMLDivElement>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleCategoryButtonClick = () => {
    setIsCategoryOpen((prev) => !prev);
  };

  const handleCategorySelect = (value: CategoryValue | undefined) => {
    handleCategoryChange(value);
    setIsCategoryOpen(false);
  };

  useEffect(() => {
    if (!isCategoryOpen) {
      return;
    }

    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (!promptContainerRef.current?.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
    };
  }, [isCategoryOpen]);

  return {
    categoryPanelId,
    handleCategoryButtonClick,
    handleCategorySelect,
    isCategoryOpen,
    promptContainerRef,
  };
};

export default useCategoryPanel;
