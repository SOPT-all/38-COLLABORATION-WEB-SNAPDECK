import { useCallback, useMemo, useState } from "react";

import type { ContentChatTurn } from "@/features/content/types/chat";
import { isAutoExpandableTurn } from "@/features/content/utils/chatTurn";

type UseContentChatTurnsParams = {
  turns?: ContentChatTurn[];
  onTurnsChange?: (turns: ContentChatTurn[]) => void;
  initialTurns?: ContentChatTurn[];
};

const useContentChatTurns = ({
  turns: turnsProp,
  onTurnsChange,
  initialTurns = [],
}: UseContentChatTurnsParams) => {
  const [internalTurns, setInternalTurns] =
    useState<ContentChatTurn[]>(initialTurns);
  const [collapsedTurnIds, setCollapsedTurnIds] = useState<Set<string>>(
    () => new Set(),
  );

  const turns = turnsProp ?? internalTurns;

  const setTurns = useCallback(
    (getNext: (prev: ContentChatTurn[]) => ContentChatTurn[]) => {
      if (turnsProp !== undefined) {
        onTurnsChange?.(getNext(turnsProp));
        return;
      }

      setInternalTurns((prev) => {
        const next = getNext(prev);
        onTurnsChange?.(next);
        return next;
      });
    },
    [onTurnsChange, turnsProp],
  );

  const appendTurn = useCallback(
    (turn: ContentChatTurn) => {
      setTurns((prev) => [...prev, turn]);
    },
    [setTurns],
  );

  const updateTurnById = useCallback(
    (turnId: string, patch: Partial<ContentChatTurn>) => {
      setTurns((prev) =>
        prev.map((turn) => (turn.id === turnId ? { ...turn, ...patch } : turn)),
      );
    },
    [setTurns],
  );

  const expandedTurnIds = useMemo(() => {
    const expanded = new Set<string>();

    for (const turn of turns) {
      if (isAutoExpandableTurn(turn) && !collapsedTurnIds.has(turn.id)) {
        expanded.add(turn.id);
      }
    }

    return expanded;
  }, [turns, collapsedTurnIds]);

  const handleTurnExpandedToggleClick = useCallback((turnId: string) => {
    setCollapsedTurnIds((prev) => {
      const next = new Set(prev);

      if (next.has(turnId)) {
        next.delete(turnId);
      } else {
        next.add(turnId);
      }

      return next;
    });
  }, []);

  return {
    turns,
    appendTurn,
    updateTurnById,
    expandedTurnIds,
    handleTurnExpandedToggleClick,
  };
};

export default useContentChatTurns;
