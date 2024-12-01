import React, { useState, useEffect } from "react"; // React와 useState, useEffect를 임포트
import "./ResultComponent.css";

const API_URL = process.env.REACT_APP_API_URL;

const fetchResults = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`${API_URL}?query=${query}`);
    const data = await response.json();
    return data.item;
  } catch (error) {
    console.error("알라딘 API에서 데이터를 불러오는 데 실패했습니다:", error);
    console.log("API URL:", API_URL);
    console.log("Fetching from:", `${API_URL}?query=${query}`);
    return [];
  }
};

const ResultComponent = ({ query }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      setLoading(true);
      const data = await fetchResults(query);
      setResults(data);
      setLoading(false);
    };

    loadResults();
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
                </p>
                <div className="book-price">
                  <table className="price-table">
                    <thead>
                      <tr>
                        <th>
                          {book.link ? (
                            <a
                              href={book.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="price-header-link"
                            >
                              새 책
                            </a>
                          ) : (
                            <span className="price-header-link disabled">
                              새 책
                            </span>
                          )}
                        </th>
                        <th>
                          {book.ebookLink ? (
                            <a
                              href={book.ebookLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="price-header-link"
                            >
                              e-book
                            </a>
                          ) : (
                            <span className="price-header-link disabled">
                              e-book
                            </span>
                          )}
                        </th>
                        <th>
                          {book.salesLink ? (
                            <a
                              href={book.salesLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="price-header-link"
                            >
                              알라딘 우주점
                            </a>
                          ) : (
                            <span className="price-header-link disabled">
                              알라딘 우주점
                            </span>
                          )}
                        </th>
                        <th>
                          {book.usedLink ? (
                            <a
                              href={book.usedLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="price-header-link"
                            >
                              중고
                            </a>
                          ) : (
                            <span className="price-header-link disabled">
                              중고
                            </span>
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="price">
                          {book.priceStandard ? (
                            <a
                              href={book.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {book.priceStandard.toLocaleString()}원
                            </a>
                          ) : (
                            "정보 없음"
                          )}
                        </td>
                        <td className="price">
                          {book.priceEbook ? (
                            <a
                              href={book.ebookLink || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {book.priceEbook.toLocaleString()}원
                            </a>
                          ) : (
                            "정보 없음"
                          )}
                        </td>
                        <td className="price">
                          {book.priceSales ? (
                            <a
                              href={book.salesLink || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {book.priceSales.toLocaleString()}원
                            </a>
                          ) : (
                            "정보 없음"
                          )}
                        </td>
                        <td className="price">
                          {book.priceUsed ? (
                            <a
                              href={book.usedLink || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {book.priceUsed.toLocaleString()}원
                            </a>
                          ) : (
                            "정보 없음"
                          )}
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
//TODO: 우주점이 가격은 뜨면서 링크는 안되서 뭔가 불편한 상황 이거 해결
//TODO: 코드 좀 지저분함
