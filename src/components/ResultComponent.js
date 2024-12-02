import React, { useState, useEffect } from "react";
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
    return [];
  }
};

const PriceLink = ({ link, label }) => {
  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="price-header-link"
    >
      {label}
    </a>
  ) : (
    <span className="price-header-link disabled">{label}</span>
  );
};

const PriceCell = ({ link, price }) => {
  return price ? (
    <a
      href={link || "#"}
      target={link ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={link ? "" : "disabled-link"}
    >
      {price.toLocaleString()}원
    </a>
  ) : (
    <span className="disabled-price">정보 없음</span>
  );
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
                          <PriceLink link={book.link} label="새 책" />
                        </th>
                        <th>
                          <PriceLink link={book.ebookLink} label="e-book" />
                        </th>
                        <th>
                          <PriceLink
                            link={book.salesLink}
                            label="알라딘 우주점"
                          />
                        </th>
                        <th>
                          <PriceLink link={book.usedLink} label="중고" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="price">
                          <PriceCell
                            link={book.link}
                            price={book.priceStandard}
                          />
                        </td>
                        <td className="price">
                          <PriceCell
                            link={book.ebookLink}
                            price={book.priceEbook}
                          />
                        </td>
                        <td className="price">
                          <PriceCell
                            link={book.salesLink}
                            price={book.priceSales}
                          />
                        </td>
                        <td className="price">
                          <PriceCell
                            link={book.usedLink}
                            price={book.priceUsed}
                          />
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
