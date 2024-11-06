import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?query=${search}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for a book"
      />
      <button onClick={handleSearch} disabled={!search.trim()}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
