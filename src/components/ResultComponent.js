import React, { useState, useEffect } from "react";
import "./ResultComponent.css";

const BOOK_API_URL = process.env.REACT_APP_BOOK_API_URL;
const EBOOK_API_URL = process.env.REACT_APP_EBOOK_API_URL;

const fetchResults = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`${BOOK_API_URL}?query=${query}`);
    const data = await response.json();
    return data.item || []; // 데이터가 없을 경우 빈 배열 반환
  } catch (error) {
    console.error("알라딘 API에서 데이터를 불러오는 데 실패했습니다:", error);
    return [];
  }
};

const fetchEbookResults = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`${EBOOK_API_URL}?query=${query}`);
    const data = await response.json();
    return data.item.map((ebook) => ({
      itemId: ebook.subInfo?.paperBookList?.[0]?.itemId || null,
      ebookLink: ebook.link,
      priceEbook: ebook.priceSales,
    })); // eBook 정보 변환
  } catch (error) {
    console.error("e-book API에서 데이터를 불러오는 데 실패했습니다:", error);
    return [];
  }
};

const PriceLink = ({ link, label }) =>
  link ? (
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

const PriceCell = ({ link, price }) =>
  price ? (
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

const ResultComponent = ({ query }) => {
  const [results, setResults] = useState([]);
  const [ebookResults, setEbookResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      Promise.all([fetchResults(query), fetchEbookResults(query)]).then(
        ([bookData, ebookData]) => {
          setResults(bookData);
          setEbookResults(ebookData);
          setLoading(false);
        }
      );
    }
  }, [query]);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="results-container">
      <h2>"{query}"에 대한 검색 결과</h2>
      {results.length > 0 || ebookResults.length > 0 ? (
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
                          <PriceLink
                            link={
                              ebookResults.find((e) => e.itemId === book.itemId)
                                ?.ebookLink
                            }
                            label="e-book"
                          />
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
                            link={
                              ebookResults.find((e) => e.itemId === book.itemId)
                                ?.ebookLink
                            }
                            price={
                              ebookResults.find((e) => e.itemId === book.itemId)
                                ?.priceEbook
                            }
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

//TODO: E-book 다른 방식으로 해야할듯
