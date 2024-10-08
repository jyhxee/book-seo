import React from "react";
import { useLocation } from "react-router-dom";

import ResultPage from "./ResultPage";

const SearchPage = () => {
  const location = useLocation();

  // URLSearchParams를 사용하여 쿼리 스트링에서 값을 추출
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  return (
    <div>
      {/* 지울지 고민중 */}
      <h1>Search Results for: {query}</h1>
      <ResultPage query={query} />
    </div>
  );
};

export default SearchPage;
