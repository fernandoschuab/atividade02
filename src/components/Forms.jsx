import { useState } from "react";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
import "./Forms.css";

export default function Forms() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search/${encodeURIComponent(searchInput)}`);
      setSearchInput("");
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-input"
      />
      <button
        type="submit"
        disabled={!searchInput.trim()}
        className="search-button"
      >
        <FaSearch />
      </button>
    </form>
  );
}
