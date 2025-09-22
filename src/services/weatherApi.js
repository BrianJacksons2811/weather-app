import axios from "axios";

const API_BASE = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function fetchCurrentWeather({ q, units = "metric" }) {
  if (!q) throw new Error("City is required");
  const url = `${API_BASE}/weather`;
  const { data } = await axios.get(url, {
    params: { q, units, appid: API_KEY },
  });
  return data;
}
