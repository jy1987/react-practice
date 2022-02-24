import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  a {
    transition: color 0.25s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
//upbit secret key :zE1TaNTvxCXbLn8SYPWxOUglLpilLTT5ecjN4zke
// upbit access key : zeF6AEJOnPszEuiFY7JrA6m1gbpAuMYfcRRxxFyl

interface CoinInterface {
  market: string;
  korean_name: string;
  english_name: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await fetch("https://api.upbit.com/v1/market/all?isDetails=false")
        .then((response) => response.json())
        .then((json) => setCoins(json.slice(0, 200)));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <Coin key={coin.market}>
              <Link to={`/${coin.market}`}>
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
