import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";

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

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
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

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

//upbit secret key :zE1TaNTvxCXbLn8SYPWxOUglLpilLTT5ecjN4zke
// upbit access key : zeF6AEJOnPszEuiFY7JrA6m1gbpAuMYfcRRxxFyl

interface ICoin {
  name: string;
  market: string;
  korean_name: string;
  english_name: string;
}

interface ICoinsPros {
  toggleDark: () => void;
}

function Coins({ toggleDark }: ICoinsPros) {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  //console.log(isLoading, data);
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDark}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.market}>
              <Link to={`/${coin.market}`} state={{ name: coin.korean_name }}>
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.market
                    .slice(4)
                    .toLowerCase()}`}
                />
                {coin.korean_name}({coin.market}) &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
