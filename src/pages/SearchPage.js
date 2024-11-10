import React from "react";
import { useLocation } from "react-router-dom";
import ResultPage from "./ResultPage";
import "./SearchPage.css";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || ""; // query가 null일 경우 빈 문자열로 설정

  return (
    <div>
      {query && <h1 className="center-text">Search Results for: {query}</h1>}
      <ResultPage query={query} />
    </div>
  );
};

export default SearchPage;
//TODO : 나중에 SearchComponent로 바꿀지도
