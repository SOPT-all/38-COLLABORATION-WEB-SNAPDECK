import { useState } from "react";

import type { SourceActionValue } from "@/features/home/constants/sourceActions";

const usePromptSourceActions = () => {
  const [selectedSources, setSelectedSources] = useState<SourceActionValue[]>(
    [],
  );

  const handleToggleSource = (source: SourceActionValue) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((selectedSource) => selectedSource !== source)
        : [...prev, source],
    );
  };

  return {
    selectedSources,
    handleToggleSource,
  };
};

export default usePromptSourceActions;
