import React from "react";
import { useSelector } from "react-redux";
import { Contract } from "../../enums";
import { RootState } from "../../store/store";
import { Container } from "./BookHeader";

const MobileBookHeader = () => {
  const currentSub = useSelector(
    (state: RootState) => state.orderBook.currentToken
  );
  const token = currentSub && currentSub === Contract.XBT ? "BTC" : "ETH";
  return (
    <Container isMobile={true}>
      <h3>
        Order Book <span>({token})</span>
      </h3>
    </Container>
  );
};

export default MobileBookHeader;
