import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contract } from "../enums";
import { Level } from "../types/Level";

interface State {
  currentBids: Level[];
  currentAsks: Level[];
  currentToken: Enums.Contract;
  isWindowFocus: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: State = {
  currentAsks: [],
  currentBids: [],
  currentToken: Contract.XBT,
  isWindowFocus: true,
  isLoading: false,
  error: "",
};

const OrderBookSlice = createSlice({
  name: "OrderBook",
  initialState,
  reducers: {
    updateCurrentBids(state, action: PayloadAction<Level[]>) {
      return {
        ...state,
        currentBids: action.payload,
      };
    },
    updateCurrentAsks(state, action: PayloadAction<Level[]>) {
      return {
        ...state,
        currentAsks: action.payload,
      };
    },
    updateCurrentToken(state, action: PayloadAction<Enums.Contract>) {
      return {
        ...state,
        currentToken: action.payload,
      };
    },
    updateWindowFocus(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isWindowFocus: action.payload,
      };
    },
  },
});

export const { updateCurrentAsks, updateCurrentBids, updateCurrentToken } =
  OrderBookSlice.actions;
export default OrderBookSlice.reducer;
