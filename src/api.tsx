export function fetchCoins() {
  return fetch("https://api.upbit.com/v1/market/all?isDetails=false").then(
    (response) => response.json()
  );
}
