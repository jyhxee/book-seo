import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const query = event.target.value.trim();
      if (query) {
        navigate(`/search?query=${query}`);
      }
    }
  };

  const handleButtonSearch = () => {
    if (search.trim()) {
      navigate(`/search?query=${search.trim()}`);
    }
  };

  const handleHomeClick = () => {
    setSearch("");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button onClick={handleHomeClick}>홈</button>{" "}
      </div>
      <div className="nav-center">
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button onClick={handleButtonSearch} disabled={!search.trim()}>
          Search
        </button>{" "}
        {/* 검색어가 없으면 비활성화 */}
      </div>
      <div className="nav-bottom">
        <button onClick={() => navigate("/recommendations")}>추천도서</button>
        <button onClick={() => navigate("/new-books")}>신간</button>
      </div>
    </nav>
  );
};

export default Navbar;

//TODO: 홈버튼 위치가 참 맘에 안들어서 나중에 수정
