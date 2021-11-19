export const SubscribeMessage = {
  XBT: JSON.stringify({
    event: "subscribe",
    feed: "book_ui_1",
    product_ids: ["PI_XBTUSD"],
  }),
  ETH: JSON.stringify({
    event: "subscribe",
    feed: "book_ui_1",
    product_ids: ["PI_ETHUSD"],
  }),
};

export const UnsubscribeMessage = {
  XBT: JSON.stringify({
    event: "unsubscribe",
    feed: "book_ui_1",
    product_ids: ["PI_XBTUSD"],
  }),
  ETH: JSON.stringify({
    event: "unsubscribe",
    feed: "book_ui_1",
    product_ids: ["PI_ETHUSD"],
  }),
};

export const WS_URL = "wss://www.cryptofacilities.com/ws/v1";

export const MOBILE = 769;
