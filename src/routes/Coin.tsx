import styled from "styled-components";
import { Outlet, useLocation, useParams, useRoutes } from "react-router";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo } from "../api";
import { Helmet } from "react-helmet-async";
import { useRecoilValue, useRecoilState, RecoilRoot } from "recoil";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: grid;
  grid-template-columns: repeat(1, 3.5em 1fr 3.5em);
  align-items: center;
`;

const CoinList = styled.ul``;

const Info = styled.li`
  margin-bottom: 10px;
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

const Title = styled.div`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  background-color: #222f3e;
  padding: 5px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.bgColor};
  a {
    display: block;
  }
`;

const Back = styled.div``;

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

interface ICoinProps {}

function Coin({}: ICoinProps) {
  const { coinId } = useParams();
  const { state, pathname } = useLocation() as RouterState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch(`/${coinId}/chart`);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoInterface[]>(
    ["info", `${coinId}`],
    () => fetchCoinInfo(`${coinId}`)
  );
  //console.log(infoLoading, infoData);
  /*const [info, setInfo] = useState<InfoInterface[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(chartMatch);
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
  }, [coinId]); */

  return (
    <Container>
      <Helmet>
        <title>
          {state
            ? state.name
            : infoLoading
            ? "Loading..."
            : infoData?.[0].market}
        </title>
      </Helmet>
      <Header>
        <Back>
          <Link to={"/"}>&larr;Home</Link>
        </Back>

        <Title>
          {state
            ? state.name
            : infoLoading
            ? "Loading..."
            : infoData?.[0].market}
        </Title>
      </Header>
      {infoLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {infoData?.map((data, id) => (
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

              <Tabs>
                <Tab isActive={priceMatch !== null}>
                  <Link to={`/${coinId}/price`}>Price</Link>
                </Tab>
                <Tab isActive={chartMatch !== null}>
                  <Link to={`/${coinId}/chart`}>Chart</Link>
                </Tab>
              </Tabs>

              <Routes>
                <Route path="price" element={<Price />}></Route>
                <Route
                  path="chart"
                  element={<Chart coinId={coinId as string} />}
                ></Route>
              </Routes>
            </Info>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coin;
