import React, { useEffect, useState } from "react";

const ResultPage = ({ query }) => {
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
        setResults(data.item); // 결과가 `item`이라는 배열로 반환
      } catch (error) {
        console.error("Failed to fetch data from Aladin API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((book) => (
            <li key={book.itemId}>
              <strong>{book.title}</strong> by {book.author} - {book.publisher}
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
