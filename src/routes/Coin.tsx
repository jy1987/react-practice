import styled from "styled-components";
import { useLocation, useParams, useRoutes } from "react-router";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Price from "./Price";
import Chart from "./Chart";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Info = styled.li`
  margin-bottom: 10px;

  a {
    transition: color 0.25s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Overview = styled.div`
  margin-top: 10px;
  background-color: #222f3e;
  color: #c8d6e5;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    margin-right: 5px;
  }
`;

const OverviewItem = styled.div``;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouterState {
  state: { name: string };
  pathname: string;
}

interface InfoInterface {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  prev_closing_price: number;
  change_price: number;
  change_rate: number;
}

function Coin() {
  const { coinId } = useParams();
  const [info, setInfo] = useState<InfoInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const { state, pathname } = useLocation() as RouterState;
  useEffect(() => {
    (async () => {
      const getData = await (
        await fetch(
          `https://api.upbit.com/v1/candles/days?market=${coinId}&count=14`
        )
      ).json();
      console.log(getData);
      setInfo(getData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>
          {state ? state.name : loading ? "Loading..." : info[0].market}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {info.map((data, id) => (
            <Info key={id}>
              <Overview>
                <OverviewItem>{`[No.${id}]`}</OverviewItem>

                <OverviewItem>
                  <span>Date:</span>
                  {data.candle_date_time_kst.slice(0, 10)}
                </OverviewItem>
                <OverviewItem>
                  <span>Price:</span>
                  {data.trade_price}
                </OverviewItem>
              </Overview>
              <Overview>
                <OverviewItem>
                  <span>Volume:</span>
                  {Math.round(data.candle_acc_trade_volume)}
                </OverviewItem>
              </Overview>
              <Link to={`/${coinId}/price`}>Price</Link>
              <Link to={`/${coinId}/chart`}>Chart</Link>
              <Routes>
                <Route path="price" element={<Price />}></Route>
                <Route path="chart" element={<Chart />}></Route>
              </Routes>
            </Info>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coin;
