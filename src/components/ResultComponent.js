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
    <div className="results-container">
      <h2>Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((book) => (
            <li key={book.itemId} className="book-item">
              <img src={book.cover} alt={book.title} className="book-cover" />
              <div className="book-details">
                <strong>{book.title}</strong> by {book.author} -{" "}
                {book.publisher}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}"</p>
      )}
    </div>
  );
};

export default ResultComponent;
