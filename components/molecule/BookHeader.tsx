import React, { CSSProperties, FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MOBILE } from "../../constants";
import { Contract } from "../../enums";
import { useWindowSize } from "../../hooks/useWindowSize";
import { RootState } from "../../store/store";

export const Container = styled.header<{ isMobile: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${(prop) => (prop.isMobile ? "flex-start" : "center")};
  padding: 0.75rem 1rem;
  gap: 30%;
  color: #fff;
  border: 1px solid #636363;
  border-radius: 10px 10px 0 0;

  .header-title {
    position: absolute;

    left: 0;
    margin-left: 1rem;

    span {
      font-size: 12px;
      color: #636363;
    }
  }

  p {
    margin: 0;
  }

  .spread-num {
    color: #636363;
  }
`;

const TitleStyle: CSSProperties = {
  position: "absolute",
  color: "#fff",
  left: 0,
  marginLeft: "1rem",
  marginTop: 10,
};

interface Prop {
  data: {
    spread: number;
    percentage: string;
  };
}

const BookHeader: FC<Prop> = ({ data }) => {
  const { width } = useWindowSize();
  const isMobile = width !== null && width <= MOBILE;
  const currentSub = useSelector(
    (state: RootState) => state.orderBook.currentToken
  );
  const { spread, percentage } = data;
  const token = currentSub && currentSub === Contract.XBT ? "BTC" : "ETH";

  return (
    <>
      <h3 className="header-title" style={TitleStyle}>
        Order Book{" "}
        <span style={{ fontSize: 12, color: "#636363" }}>({token})</span>
      </h3>
      <Container isMobile={isMobile}>
        <p className="spread-num">
          Spread: {spread} ({percentage}%)
        </p>
      </Container>
    </>
  );
};

export default BookHeader;
