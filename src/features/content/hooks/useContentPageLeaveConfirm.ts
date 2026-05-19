import { type RefCallback, useState } from "react";

import { useNavigate } from "react-router";

import { PATHS } from "@/app/router/paths";

type UseContentPageLeaveConfirmParams = {
  initialOpen?: boolean;
};

const useContentPageLeaveConfirm = ({
  initialOpen = false,
}: UseContentPageLeaveConfirmParams = {}) => {
  const navigate = useNavigate();
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(initialOpen);
  const [pageContainer, setPageContainer] = useState<HTMLDivElement | null>(
    null,
  );

  const pageContainerRef: RefCallback<HTMLDivElement> = (node) => {
    setPageContainer(node);
  };

  const handleBackClick = () => {
    setIsLeaveModalOpen(true);
  };

  const handleLeaveConfirm = () => {
    navigate(PATHS.home, { replace: true });
    setIsLeaveModalOpen(false);
  };

  return {
    pageContainerRef,
    leaveConfirmModal: {
      isOpen: isLeaveModalOpen && Boolean(pageContainer),
      container: pageContainer,
      handleOpenChange: setIsLeaveModalOpen,
      handleConfirm: handleLeaveConfirm,
    },
    handleBackClick,
  };
};

export default useContentPageLeaveConfirm;
