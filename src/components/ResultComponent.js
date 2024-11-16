import React, { useEffect, useState } from "react";
import "./ResultComponent.css";

const ResultComponent = ({ query }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://bookseo.junheeee-park.workers.dev?query=${query}`
        );
        const data = await response.json();
        setResults(data.item);
      } catch (error) {
        console.error(
          "알라딘 API에서 데이터를 불러오는 데 실패했습니다:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="results-container">
      <h2>"{query}"에 대한 검색 결과</h2>
      {results.length > 0 ? (
        <ul className="book-list">
          {results.map((book) => (
            <li key={book.itemId} className="book-item">
              <img src={book.cover} alt={book.title} className="book-cover" />
              <div className="book-details">
                <strong>{book.title}</strong>
                <p className="book-author-publisher">
                  {book.author} <span className="divider">|</span>{" "}
                  {book.publisher}
                </p>{" "}
                <div className="book-price">
                  <table className="price-table">
                    <thead>
                      <tr>
                        <th>새 책</th>
                        <th>e-book</th>
                        <th>알라딘 우주점</th>
                        <th>중고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* 새 책 가격 표시 */}
                        <td class="price">
                          {book.priceStandard
                            ? book.priceStandard.toLocaleString() + "원"
                            : "정보 없음"}
                        </td>
                        {/* e-book 가격 표시 */}
                        <td class="price">
                          {book.priceEbook
                            ? book.priceEbook.toLocaleString() + "원"
                            : "정보 없음"}
                        </td>
                        {/* 우주점 가격 표시 */}
                        <td class="price">
                          {book.priceSales
                            ? book.priceSales.toLocaleString() + "원"
                            : "정보 없음"}
                        </td>
                        {/* 중고 가격 표시 */}
                        <td class="price">
                          {book.priceUsed
                            ? book.priceUsed.toLocaleString() + "원"
                            : "정보 없음"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>"{query}"에 대한 검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default ResultComponent;

//TODO:  책제목 옆 표 위 빈공간에 중고책로 팔러가기 // 다른 중고책도 보러가기 넣고 나중에 중고관련 사이트도 만들어보면 좋을듯
//TODO: 새 책 , e-book .... 이나 가격 누르면 하이퍼링크
