import { MiddlewareAPI, Dispatch, Middleware } from "redux";
import { Contract, OrderBookActions } from "../enums";
import { SubscribeMessage, UnsubscribeMessage, WS_URL } from "../constants";
import { convertToObj, getUpdatedLevels } from "../helpers";
import { RootAction } from "../store/store";
import {
  updateCurrentAsks,
  updateCurrentBids,
  updateCurrentToken,
} from "../store/OrderBookSlice";
import * as a from "../store/actions";

const INTERVAL = 200;
let socket: WebSocket | null;
let currentProductId: Contract;
let bidsArr: [number, number][] = [];
let asksArr: [number, number][] = [];
let updateInterval: number;
let MAX_LEVEL: string;

const OrderBookMiddleWare: Middleware<Dispatch> =
  ({ dispatch, getState }: MiddlewareAPI) =>
  (next) =>
  (action: RootAction) => {
    switch (action.type) {
      case OrderBookActions.CONNECT_WEBSOCKET:
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.close();
          console.log("socket close");
        }
        // const isClient = typeof window !== "undefined" && window.document;
        socket = new WebSocket(WS_URL);

        socket.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data);

            if (data.feed === "book_ui_1_snapshot") {
              const initialBids = data.bids.map(convertToObj);
              const initialAsks = data.asks.map(convertToObj);
              MAX_LEVEL = data.numLevels;

              dispatch(
                updateCurrentAsks(initialAsks.slice(0, parseInt(MAX_LEVEL)))
              );
              dispatch(
                updateCurrentBids(initialBids.slice(0, parseInt(MAX_LEVEL)))
              );
            } else {
              if (
                data.feed === "book_ui_1" &&
                data.product_id === currentProductId &&
                (data.bids || data.asks)
              ) {
                bidsArr.push(...data.bids);
                asksArr.push(...data.asks);
              }
            }
          } catch (error) {
            console.log(error);
          }
        };
        break;
      case OrderBookActions.SUBSCRIBE_WEBSOCKET_FEED:
        const subscribe = () => {
          try {
            const productId = action.payload;

            // Unsubscribe first if connected before connecting to another token
            if (currentProductId === Contract.ETH) {
              socket?.send(UnsubscribeMessage.ETH);
            } else {
              socket?.send(UnsubscribeMessage.XBT);
            }

            if (productId === Contract.ETH) {
              socket?.send(SubscribeMessage.ETH);
            } else {
              socket?.send(SubscribeMessage.XBT);
            }

            // Clear interval of token that was unsubscribed if available
            if (updateInterval) {
              clearInterval(updateInterval);
            }

            updateInterval = setInterval(
              function () {
                dispatch(a.processWebsocketUpdates());
              } as TimerHandler,
              INTERVAL
            );

            currentProductId = productId;
            bidsArr = [];
            asksArr = [];
            dispatch(updateCurrentAsks([]));
            dispatch(updateCurrentBids([]));
          } catch (error) {
            console.log(error);
          }
        };
        if (socket !== null) {
          if (socket.readyState === WebSocket.OPEN) {
            subscribe();
          }
          if (socket.readyState === WebSocket.CONNECTING) {
            socket.onopen = subscribe;
          }
        }
        break;
      case OrderBookActions.DISCONNECT_WEBSOCKET:
        if (socket) {
          socket.close();
          socket = null;
        }

        if (updateInterval) {
          clearInterval(updateInterval);
        }
        break;
      case OrderBookActions.PROCESS_WEBSOCKET_UPDATES:
        try {
          const state = getState();

          const updatedBids = getUpdatedLevels(
            state.orderBook.currentBids,
            bidsArr
          );
          const updatedAsks = getUpdatedLevels(
            state.orderBook.currentAsks,
            asksArr
          );

          bidsArr = [];
          asksArr = [];

          dispatch(
            updateCurrentAsks(
              updatedAsks.slice(0, parseInt(MAX_LEVEL)).reverse()
            )
          );
          dispatch(
            updateCurrentBids(updatedBids.slice(0, parseInt(MAX_LEVEL)))
          );
        } catch (error) {
          console.log(error);
        }
      default:
        break;
    }
    return next(action);
  };

export default OrderBookMiddleWare;
