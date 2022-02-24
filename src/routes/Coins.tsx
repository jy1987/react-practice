import styled from "styled-components";
import { Link } from "react-router-dom";

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
const coins = [
  {
    market: "KRW-BTC",
    korean_name: "비트코인",
    english_name: "Bitcoin",
  },
  {
    market: "KRW-ETH",
    korean_name: "이더리움",
    english_name: "Ethereum",
  },
  {
    market: "BTC-ETH",
    korean_name: "이더리움",
    english_name: "Ethereum",
  },
  {
    market: "BTC-LTC",
    korean_name: "라이트코인",
    english_name: "Litecoin",
  },
];

function Coins() {
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinList>
        {coins.map((coin) => (
          <Coin key={coin.market}>
            <Link to={`/${coin.market}`}>
              {coin.korean_name}({coin.market}) &rarr;
            </Link>
          </Coin>
        ))}
      </CoinList>
    </Container>
  );
}

export default Coins;
