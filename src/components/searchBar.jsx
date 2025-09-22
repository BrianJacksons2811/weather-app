import { useState } from "react";

export default function SearchBar({ onSearch, disabled }) {
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        aria-label="Search city"
        placeholder="Search city (e.g., Pretoria)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={disabled}
      />
      <button disabled={disabled || !city.trim()} type="submit">Search</button>
    </form>
  );
}
