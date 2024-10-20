import axios from 'axios';

const ALTERNATIVE_ME_BASE_URL = new URL('https://api.alternative.me');
const FNG_ENDPOINT_URL = new URL("/fng/", ALTERNATIVE_ME_BASE_URL);

export const getFng = () => getFngThroughAxios();

const getFngThroughAxios = () => {
  return axios
    .get(FNG_ENDPOINT_URL.href)
    .then((r) => r.data)
    .catch((e) => console.error(e));
};
