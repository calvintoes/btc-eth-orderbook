import React, { FC } from "react";
import styled from "styled-components";
import {
  BookColumn,
  BookHeader,
  MobileBookHeader,
  MobileSpreadRow,
} from "../molecule";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Type } from "../../enums";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE } from "../../constants";

const Container = styled.main<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${(prop) => prop.isMobile && "column-reverse"};
  padding: ${(prop) => (prop.isMobile ? "1rem 0" : "1rem")};
  padding-top: 0;
  width: ${(prop) => (prop.isMobile ? "90vw" : "75vw")};
  justify-content: center;
  gap: ${(prop) => (prop.isMobile ? undefined : "4.05rem")}; ;
`;

const OrderBook: FC = () => {
  // {price, size, total}[]
  const { width } = useWindowSize();
  const isMobile = width !== null && width <= MOBILE;

  const currentBids = useSelector(
    (state: RootState) => state.orderBook.currentBids
  );
  const currentAsks = useSelector(
    (state: RootState) => state.orderBook.currentAsks
  );
  const topBidPrice = currentBids[0]?.price;
  const topAskPrice = currentAsks[0]?.price;
  const currentHighestPrice = Math.max(topAskPrice, topAskPrice);
  const spread = Math.abs(topBidPrice - topAskPrice);
  const percentage = ((spread / currentHighestPrice) * 100).toFixed(2);

  return (
    <div
      style={{
        backgroundColor: "#040427",
        borderRadius: 10,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {isMobile ? (
        <MobileBookHeader />
      ) : (
        <BookHeader data={{ spread: spread, percentage: percentage }} />
      )}

      <Container isMobile={isMobile}>
        <BookColumn type={Type.BID} />
        {isMobile && (
          <MobileSpreadRow data={{ spread: spread, percentage: percentage }} />
        )}
        <BookColumn type={Type.ASK} />
      </Container>
    </div>
  );
};

export default OrderBook;
