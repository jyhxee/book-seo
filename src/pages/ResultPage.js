// 테스트용 하드코딩

import React from "react";

const ResultPage = ({ query }) => {
  // 임시 데이터 (실제로는 API 호출로 데이터를 받아오는 로직이 필요함)
  const sampleResults = [
    { id: 1, title: "사란", author: "박준희" },
    { id: 2, title: "사막", author: "김이박" },
    { id: 3, title: "사수 ", author: "박박박" },
  ];

  // 검색어에 따른 필터링 (간단한 필터 로직)
  const filteredResults = sampleResults.filter((book) =>
    book.title.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <div>
      <h2>Search Results</h2>
      {filteredResults.length > 0 ? (
        <ul>
          {filteredResults.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}"</p>
      )}
    </div>
  );
};

export default ResultPage;
