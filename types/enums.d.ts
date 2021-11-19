declare namespace Enums {
  export enum Type {
    BID = "BID",
    ASK = "ASK",
  }

  export enum Contract {
    XBT = "PI_XBTUSD",
    ETH = "PI_ETHUSD",
  }

  export enum OrderBookActions {
    CONNECT_WEBSOCKET = "CONNECT_WEBSOCKET",
    SUBSCRIBE_WEBSOCKET_FEED = "SUBSCRIBE_WEBSOCKET_FEED",
    DISCONNECT_WEBSOCKET = "DISCONNECT_WEBSOCKET",
  }
}
