import { ActionFromReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { OrderBookMiddleWare } from "../middleware";
import OrderBookSlice from "./OrderBookSlice";

const reducer = {
  orderBook: OrderBookSlice,
};

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer,
  middleware: [OrderBookMiddleWare],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type RootAction = ActionFromReducersMapObject<typeof reducer>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
