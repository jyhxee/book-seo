import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";

import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/search" element={<SearchPage />} />

          <Route index element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
