export default function WeatherCard({ data, units }) {
  if (!data) return null;
  const { name, sys, main, weather, wind } = data;
  const icon = weather?.[0]?.icon;
  const description = weather?.[0]?.description;

  return (
    <div className="card">
      <div className="card-header">
        <h2>{name}, {sys?.country}</h2>
        <span className="description">{description}</span>
      </div>

      <div className="row">
        <div className="temp">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description || "weather"}
          />
          <div className="value">
            <span className="big">
              {Math.round(main?.temp)}
            </span>
            <span className="unit">{units === "metric" ? "°C" : "°F"}</span>
          </div>
        </div>

        <div className="meta">
          <div><strong>Feels like:</strong> {Math.round(main?.feels_like)} {units === "metric" ? "°C" : "°F"}</div>
          <div><strong>Humidity:</strong> {main?.humidity}%</div>
          <div><strong>Pressure:</strong> {main?.pressure} hPa</div>
          <div><strong>Wind:</strong> {Math.round(wind?.speed)} {units === "metric" ? "m/s" : "mph"}</div>
        </div>
      </div>
    </div>
  );
}
