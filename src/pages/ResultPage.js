import React from "react";
import ResultComponent from "../components/ResultComponent.js";
import "./ResultPage.css";

const ResultPage = ({ query }) => {
  return (
    <div className="result-page">
      <ResultComponent query={query} />
    </div>
  );
};

export default ResultPage;
