export const CATEGORY_OPTIONS = [
  { value: "report", label: "Report" },
  { value: "standard", label: "Standard" },
  { value: "presentation", label: "Presentation" },
  { value: "keynote", label: "Keynote" },
] as const;

export type CategoryValue = (typeof CATEGORY_OPTIONS)[number]["value"];
