import { useState } from "react";

import type { CategoryValue } from "@/features/home/constants/categoryOptions";
import {
  type SourceActionValue,
  isUrlModalSourceAction,
} from "@/features/home/constants/sourceActions";

import useUrlModal from "./useUrlModal";

const useHomePrompt = () => {
  const [promptValue, setPromptValue] = useState("");
  const [categoryValue, setCategoryValue] = useState<CategoryValue>();
  const [slideCount, setSlideCount] = useState(5);
  const [selectedSourceAction, setSelectedSourceAction] =
    useState<SourceActionValue>();
  const {
    urlModalType,
    url,
    fieldStatus,
    helperText,
    isConfirmDisabled,
    resetUrlModal,
    handleUrlModalOpen,
    handleUrlModalOpenChange,
    handleUrlChange,
    handleUrlBlur,
  } = useUrlModal();

  const handleSourceActionClick = (value: SourceActionValue) => {
    if (isUrlModalSourceAction(value)) {
      handleUrlModalOpen(value);
      return;
    }
    setSelectedSourceAction((prev) => (prev === value ? undefined : value));
  };

  const handleUrlModalConfirm = () => {
    if (urlModalType) {
      setSelectedSourceAction(urlModalType);
    }
    resetUrlModal();
  };

  return {
    aiPromptProps: {
      promptValue,
      handlePromptChange: setPromptValue,
      categoryValue,
      handleCategoryChange: setCategoryValue,
      slideCount,
      handleSlideCountChange: setSlideCount,
      selectedSourceAction,
      handleSourceActionChange: setSelectedSourceAction,
      handleSourceActionClick,
    },
    urlModalProps: urlModalType
      ? {
          type: urlModalType,
          isOpen: true,
          value: url,
          fieldStatus,
          helperText,
          isConfirmDisabled,
          handleChange: handleUrlChange,
          handleBlur: handleUrlBlur,
          handleOpenChange: handleUrlModalOpenChange,
          handleConfirm: handleUrlModalConfirm,
        }
      : undefined,
  };
};

export default useHomePrompt;
