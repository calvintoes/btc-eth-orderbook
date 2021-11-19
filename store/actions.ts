import { createAction } from "@reduxjs/toolkit";
import { Level } from "../types/Level";

const addPayload = <T>() => {
  return (t: T) => ({ payload: t });
};

export const connectWebsocket = createAction("CONNECT_WEBSOCKET");
export const subscribeWebsocketFeed = createAction(
  "SUBSCRIBE_WEBSOCKET_FEED",
  addPayload<Enums.Contract>()
);
export const disconnectWebsocket = createAction("DISCONNECT_WEBSOCKET");
export const processWebsocketUpdates = createAction(
  "PROCESS_WEBSOCKET_UPDATES"
);
export const showErrorMessage = createAction(
  "SHOW_ERROR_MESSAGE",
  addPayload<{ showError: boolean }>()
);
export const throwWebsocketError = createAction("THROW_WEBSOCKET_ERROR");

export const updateCurrentBids = createAction(
  "UPDATE_CURRENT_BIDS",
  addPayload<Level[]>()
);
export const updateCurrentAsks = createAction(
  "UPDATE_CURRENT_ASKS",
  addPayload<Level[]>()
);
export const updateCurrentToken = createAction(
  "UPDATE_CURRENT_ACTION",
  addPayload<Enums.Contract>()
);
export const updateWindowFocus = createAction(
  "UPDATE_WINDOW_FOCUS",
  addPayload<boolean>()
);
