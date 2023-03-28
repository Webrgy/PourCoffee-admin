import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "https://pour-coffee.onrender.com/api/admin";

  let api = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {
      },
      Authorization: "Bearer Test"
    },
  });
return {
    provide: {
      axios: api,
    },
  };
});
