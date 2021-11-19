import React, { FC } from "react";
import { useSelector } from "react-redux";
import styled, { CSSProperties } from "styled-components";
import { MOBILE } from "../../constants";
import { Type } from "../../enums";
import { useWindowSize } from "../../hooks/useWindowSize";
import { RootState } from "../../store/store";

const Row = styled.div<{ type: Enums.Type }>`
  display: flex;
  justify-content: space-between;
  flex: 1;
  position: relative;

  p {
    text-align: right;
    width: 80px;
    color: #fff;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 14px;
    margin: 0.5em 0.5em;

    &:last-child {
      color: ${(prop) => (prop.type === Type.BID ? "#348D4D" : "#B22525")};
    }
  }
`;

const DepthBar = styled.div<{ type: Enums.Type; isMobile: boolean }>`
  position: absolute;
  right: ${(props) => {
    if (props.type === Type.BID) {
      return "-2rem";
    } else if (props.isMobile) {
      return undefined;
    } else {
      return null;
    }
  }};
  left: ${(props) => {
    if (props.type === Type.ASK) {
      return "-2rem";
    } else if (props.isMobile) {
      return 0;
    } else {
      return null;
    }
  }};
  height: 100%;
  background-color: ${(props) =>
    props.type === Type.BID ? "#103d1d" : "#530909"};
`;

// Depth graph = Level's total as a percentage of the highest total regardless of side

interface Prop {
  type: Enums.Type;
  total: number;
  style?: CSSProperties;
}

const LevelRow: FC<Prop> = ({ children, type, total, style }) => {
  const { width } = useWindowSize();
  const isMobile = width !== null && width <= MOBILE;
  const currentBids = useSelector(
    (state: RootState) => state.orderBook.currentBids
  );
  const currentAsks = useSelector(
    (state: RootState) => state.orderBook.currentAsks
  );

  const highestBidTotal =
    currentBids &&
    currentBids[currentBids.length - 1] &&
    currentBids[currentBids.length - 1].size;

  const highestAsksTotal =
    currentAsks &&
    currentAsks[currentAsks.length - 1] &&
    currentAsks[currentAsks.length - 1].size;

  const currentHighestTotal = Math.max(highestAsksTotal, highestBidTotal);
  const depth = ((total / currentHighestTotal) * 100).toFixed(2);

  return (
    <div style={{ position: "relative" }}>
      <DepthBar
        type={type}
        style={{ width: `${depth}%` }}
        isMobile={isMobile}
      />
      <Row type={type} style={{ ...style }}>
        {children}
      </Row>
    </div>
  );
};

export default LevelRow;
