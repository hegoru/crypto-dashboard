const COINGLASS_BASE_URL = new URL("https://open-api-v3.coinglass.com");
const key = '';

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