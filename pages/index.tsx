import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OrderBook } from "../components/organism";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { Contract } from "../enums";
import { updateCurrentToken } from "../store/OrderBookSlice";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Button = styled.button`
  background-color: #ad4ff6;
  border: none;
  border-radius: 4px;
  padding: 12px 22px;
  font-weight: 600;
  color: #fff;
  margin: 1rem 0;
  cursor: pointer;
`;

const BlurBlock = styled.div`
  position: absolute;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.65);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .blurred-box {
    background-color: #fefefe;
    padding: 4rem 6rem;
    text-align: center;
    margin: 0 auto;
    color: #333;
    border-radius: 6px;
  }
`;

export default function Home() {
  const dispatch = useDispatch();
  const [cryptoType, setCryptoType] = useState<Enums.Contract>(Contract.XBT);
  const [windowFocus, setWindowFocu] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener("focus", () => {
      dispatch(actions.connectWebsocket());
      dispatch(actions.subscribeWebsocketFeed(cryptoType));
      dispatch(actions.updateWindowFocus(true));
      setWindowFocu(true);
    });
    window.addEventListener("blur", () => {
      dispatch(actions.disconnectWebsocket());
      dispatch(actions.updateWindowFocus(false));
      setWindowFocu(false);
      console.log("disconnected");
    });

    return () => {
      window.removeEventListener("focus", () => {
        dispatch(actions.connectWebsocket());
        dispatch(actions.subscribeWebsocketFeed(cryptoType));
      });
      window.removeEventListener("blur", () => {
        dispatch(actions.disconnectWebsocket());
      });
    };
  }, []);

  // useEffect(() => {
  //   dispatch(actions.connectWebsocket());
  //   dispatch(actions.subscribeWebsocketFeed(cryptoType));
  // }, []);

  const toggleFeed = () => {
    console.log("clickd");

    if (cryptoType === Contract.XBT) {
      dispatch(actions.subscribeWebsocketFeed(Contract.ETH));
      dispatch(updateCurrentToken(Contract.ETH));

      setCryptoType(Contract.ETH);
    } else {
      dispatch(actions.subscribeWebsocketFeed(Contract.XBT));
      dispatch(updateCurrentToken(Contract.XBT));
      setCryptoType(Contract.XBT);
    }
  };

  return (
    <>
      {!windowFocus && (
        <BlurBlock>
          <div className="blurred-box">
            <h2>Window is inactive</h2>
            <p>Click into window to resume</p>
          </div>
        </BlurBlock>
      )}
      <Layout>
        <OrderBook />
        <Button onClick={() => toggleFeed()}>Toggle Feed</Button>
      </Layout>
    </>
  );
}
