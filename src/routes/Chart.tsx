import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface CharProps {
  coinId: string;
}

interface IHistory {
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

function Chart({ coinId }: CharProps) {
  const { isLoading, data } = useQuery<IHistory[]>(
    ["history", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 1000 }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              name: "price",
              data: data?.map((price) => [
                new Date(price.timestamp).getTime(),
                price.opening_price,
                price.high_price,
                price.low_price,
                price.trade_price,
              ]),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              type: "candlestick",
              background: "#4b6584",
            },
            xaxis: {
              type: "datetime",
            },

            plotOptions: {
              candlestick: {
                wick: { useFillColor: true },
                colors: { downward: "#ee5253", upward: "#1dd1a1" },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
