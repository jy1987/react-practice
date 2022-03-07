export function fetchCoins() {
  return fetch("https://api.upbit.com/v1/market/all?isDetails=false").then(
    (response) => response.json()
  );
}

export function fetchCoinInfo(coinId: string) {
  return fetch(
    `https://api.upbit.com/v1/candles/days?market=${coinId}&count=1`
  ).then((response) => response.json());
}

export function fetchCoinHistory(coinId: string) {
  return fetch(
    `https://api.upbit.com/v1/candles/days?market=${coinId}&count=14`
  ).then((response) => response.json());
}
