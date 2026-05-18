import { NotionIcon, ResearchIcon, ThunderIcon, WebIcon } from "@/assets";

export const SOURCE_ACTION_OPTIONS = [
  { value: "webResearch", label: "Web Research", Icon: ResearchIcon },
  { value: "webScrap", label: "Web Scrap", Icon: WebIcon },
  { value: "importNotion", label: "Import Notion", Icon: NotionIcon },
  { value: "autoAgent", label: "Auto Agent", Icon: ThunderIcon },
] as const;

export type SourceActionValue = (typeof SOURCE_ACTION_OPTIONS)[number]["value"];

export type UrlImportChannel = "notion" | "web";

export type UrlModalSourceActionValue = "webScrap" | "importNotion";

export const URL_MODAL_SOURCE_ACTION_CHANNEL = {
  webScrap: "web",
  importNotion: "notion",
} as const satisfies Record<UrlModalSourceActionValue, UrlImportChannel>;

export const isUrlModalSourceAction = (
  value: SourceActionValue,
): value is UrlModalSourceActionValue => {
  return value in URL_MODAL_SOURCE_ACTION_CHANNEL;
};
