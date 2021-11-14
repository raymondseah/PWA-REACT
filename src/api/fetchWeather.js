import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "9fcfefa9d935cd2682ff9732d8eb7766";

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: "metric",
      appid: API_KEY,
    },
  });

  return data;
};
