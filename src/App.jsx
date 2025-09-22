import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/searchBar.jsx";
import WeatherCard from "./components/weatherCard.jsx";
import useDebounce from "./hooks/useDebounce.js";
import { fetchCurrentWeather } from "./services/weatherApi.js";
import "./styles.css";

export default function App() {
  const [query, setQuery] = useState("Pretoria");
  const [units, setUnits] = useState("metric"); 
  const [theme, setTheme] = useState("dark"); 

  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    async function run() {
      if (!debouncedQuery) return;
      setStatus("loading");
      setError("");
      try {
        const res = await fetchCurrentWeather({ q: debouncedQuery, units });
        setData(res);
        setStatus("success");
      } catch (e) {
        setError(e?.response?.data?.message || e.message || "Something went wrong");
        setData(null);
        setStatus("error");
      }
    }
    run();
  }, [debouncedQuery, units]);

  const isLoading = status === "loading";

  const unitLabel = useMemo(
    () => (units === "metric" ? "°C" : "°F"),
    [units]
  );

  function handleSearch(city) {
    setQuery(city);
  }

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <h1>WeatherNow</h1>

        <div className="controls">
          <label className="toggle">
            <span>Units: {unitLabel}</span>
            <select
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              aria-label="Select units"
            >
              <option value="metric">Metric (°C)</option>
              <option value="imperial">Imperial (°F)</option>
            </select>
          </label>

          <label className="toggle">
            <span>Theme</span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              aria-label="Select theme"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </label>
        </div>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} disabled={isLoading} />

        {isLoading && <div className="state">Loading…</div>}
        {status === "error" && <div className="state error">Error: {error}</div>}
        {status === "success" && <WeatherCard data={data} units={units} />}
      </main>

      <footer>
        <small>Built with React · OpenWeather API</small>
      </footer>
    </div>
  );
}
