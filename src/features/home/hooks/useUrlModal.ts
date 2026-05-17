import { useState } from "react";

import type { SourceActionValue } from "@/features/home/constants/sourceActions";

export type UrlModalType = Extract<
  SourceActionValue,
  "webScrap" | "importNotion"
>;
type UrlImportChannel = "notion" | "web";
type UrlFieldStatus = "default" | "success" | "error";

const URL_MODAL_CHANNEL: Record<UrlModalType, UrlImportChannel> = {
  webScrap: "web",
  importNotion: "notion",
};

const URL_FIELD_MESSAGE: Record<
  UrlImportChannel,
  Record<"success" | "error", string>
> = {
  web: {
    success: "유효한 URL",
    error: "유효한 URL을 입력하세요 (예:https://example.com/)",
  },
  notion: {
    success: "유효한 Notion URL",
    error:
      "유효한 Notion URL을 입력하세요 (예: https://your-workspace.notion.site/...)",
  },
};

const getHttpUrl = (value: string): URL | null => {
  try {
    const url = new URL(value);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url;
  } catch {
    return null;
  }
};

const isValidWebUrl = (value: string): boolean => Boolean(getHttpUrl(value));

const isSameOrSubDomain = (host: string, domain: string): boolean =>
  host === domain || host.endsWith(`.${domain}`);

const isValidNotionUrl = (value: string): boolean => {
  const url = getHttpUrl(value);

  if (!url) {
    return false;
  }

  const host = url.hostname.toLowerCase();
  return (
    isSameOrSubDomain(host, "notion.so") ||
    isSameOrSubDomain(host, "notion.site")
  );
};

const isValidUrl = (value: string, channel: UrlImportChannel): boolean =>
  channel === "notion" ? isValidNotionUrl(value) : isValidWebUrl(value);

const getUrlFieldStatus = (
  value: string,
  isFieldBlurred: boolean,
  channel: UrlImportChannel,
): UrlFieldStatus => {
  const trimmed = value.trim();

  if (!trimmed) {
    return isFieldBlurred ? "error" : "default";
  }

  return isValidUrl(trimmed, channel) ? "success" : "error";
};

const useUrlModal = () => {
  const [urlModalType, setUrlModalType] = useState<UrlModalType | null>(null);
  const [url, setUrl] = useState("");
  const [isFieldBlurred, setIsFieldBlurred] = useState(false);

  const channel = urlModalType ? URL_MODAL_CHANNEL[urlModalType] : "web";
  const fieldStatus = getUrlFieldStatus(url, isFieldBlurred, channel);
  const helperText =
    fieldStatus === "default"
      ? undefined
      : URL_FIELD_MESSAGE[channel][fieldStatus];
  const isUrlValid = fieldStatus === "success";
  const isConfirmDisabled = !isUrlValid;

  const resetUrlModal = () => {
    setUrlModalType(null);
    setUrl("");
    setIsFieldBlurred(false);
  };

  const handleUrlModalOpen = (type: UrlModalType) => {
    resetUrlModal();
    setUrlModalType(type);
  };

  const handleUrlModalOpenChange = (open: boolean) => {
    if (!open) {
      resetUrlModal();
    }
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
  };

  const handleUrlBlur = () => {
    setIsFieldBlurred(true);
  };

  return {
    urlModalType,
    url,
    fieldStatus,
    helperText,
    isUrlValid,
    isConfirmDisabled,
    resetUrlModal,
    handleUrlModalOpen,
    handleUrlModalOpenChange,
    handleUrlChange,
    handleUrlBlur,
  };
};

export default useUrlModal;
