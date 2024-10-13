import axios from "axios";

const BINANCE_BASE_URL_V3 = new URL("https://api.binance.com/api/v3/");
const TICKER_PRICE_ENDPOINT_URL = new URL("ticker/price", BINANCE_BASE_URL_V3);
const COINGLASS_BASE_URL = new URL("")


export const getCoinList = () => getCoinListAxios();

const getCoinListREST = () => {
  return fetch(TICKER_PRICE_ENDPOINT_URL.href)
    .then((r) => r.json())
    .catch((e) => console.error(e));
};

const getCoinListAxios = () => {
  return axios
    .get(TICKER_PRICE_ENDPOINT_URL.href)
    .then((r) => r.data)
    .catch((e) => console.error(e));
};

const getCoinListWs = () => {
  // implement to getting list through a websocket
};

export const getFearAndGreedIndex = () => getFearAndGreedIndexREST();

const getFearAndGreedIndexREST = () => {
  const options = { method: "GET", headers: { accept: "application/json" } };

  return fetch(
    "https://open-api-v3.coinglass.com/api/index/fear-greed-history",
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};
