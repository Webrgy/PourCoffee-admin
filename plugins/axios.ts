import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "https://pourcoffee.up.railway.app/api/admin";

  let api = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {},
    },
  });
return {
    provide: {
      axios: api,
    },
  };
});