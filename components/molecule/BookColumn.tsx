import React, { CSSProperties, FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Type } from "../../enums";
import { RootState } from "../../store/store";
import { Row } from "../../types/Level";
import { LevelRow } from "../atom";
import { addCommas, addTotalsColumn } from "../../helpers";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MOBILE } from "../../constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;

  p {
    text-align: right;
    width: 80px;
    color: #636363;
    margin: 0.75em 0.5em;
  }
`;

interface Prop {
  type: Enums.Type;
}

interface ColumnProp extends Prop {
  rows: Row[];
  reverse: boolean;
  isMobile: boolean;
}

const LevelsColumn = ({ rows, type, reverse, isMobile }: ColumnProp) => {
  const ReverseStyle: CSSProperties = {
    flexDirection: reverse && type === Type.ASK ? "row-reverse" : "row",
  };
  const MobileStyle: CSSProperties = {
    display: isMobile && type === Type.BID ? "none" : "flex",
  };
  const BidsMobileStyle: CSSProperties = {
    flexDirection: isMobile && type === Type.BID ? "row-reverse" : undefined,
  };

  return (
    <>
      <RowHeader style={{ ...ReverseStyle, ...MobileStyle }}>
        <p>TOTAL</p>
        <p>SIZE</p>
        <p>PRICE</p>
      </RowHeader>
      {rows.map((row) => {
        const { price, size, total } = row;

        return (
          <LevelRow
            type={type}
            total={total}
            key={price}
            style={type === Type.ASK ? ReverseStyle : BidsMobileStyle}
          >
            <p>{addCommas(total)}</p>
            <p>{addCommas(size)}</p>
            <p>{addCommas(price)}</p>
          </LevelRow>
        );
      })}
    </>
  );
};

const BookColumn: FC<Prop> = ({ type }) => {
  const { width } = useWindowSize();
  const isMobile = width !== null && width <= MOBILE;
  const currentBids = useSelector(
    (state: RootState) => state.orderBook.currentBids
  );
  const currentAsks = useSelector(
    (state: RootState) => state.orderBook.currentAsks
  );

  const bidsWithTotal = addTotalsColumn(currentBids);
  const asksWithTotal = addTotalsColumn(currentAsks);

  // const rows = type === Type.ASK ? asksWithTotal : bidsWithTotal;

  let rows;
  if (isMobile) {
    rows = type === Type.ASK ? asksWithTotal.reverse() : bidsWithTotal;
  } else {
    rows = type === Type.ASK ? asksWithTotal : bidsWithTotal;
  }

  return (
    <Container>
      <LevelsColumn
        rows={rows.slice(0, 25)}
        type={type}
        reverse={type === Type.ASK}
        isMobile={isMobile}
      />
    </Container>
  );
};

export default BookColumn;
