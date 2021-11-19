import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.section`
  p {
    font-size: 18px;
    color: #636363;
    text-align: center;
  }
`;

interface Prop {
  data: {
    spread: number;
    percentage: string;
  };
}

const MobileSpreadRow: FC<Prop> = ({ data }) => {
  const { spread, percentage } = data;
  return (
    <Container>
      <p className="spread-num">
        Spread: {spread} ({percentage}%)
      </p>
    </Container>
  );
};

export default MobileSpreadRow;
