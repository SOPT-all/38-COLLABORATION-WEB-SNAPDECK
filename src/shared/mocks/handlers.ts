import { contentHandlers } from "./contentHandler";
import { dashBoardHandlers } from "./dashBoardHandler";

export const handlers = [...contentHandlers, ...dashBoardHandlers];
