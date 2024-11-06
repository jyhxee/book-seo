import React from "react";
import { useLocation } from "react-router-dom";
import ResultPage from "./ResultPage";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || ""; // query가 null일 경우 빈 문자열로 설정

  return (
    <div>
      {/* 지울까 고민 중 */}
      {query && <h1>Search Results for: {query}</h1>}
      <ResultPage query={query} />
    </div>
  );
};

export default SearchPage;
