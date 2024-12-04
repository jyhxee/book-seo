import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import Navbar from "./components/common/Navbar";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />{" "}
        {/* 모든 페이지에서 동일한 네비게이션 바가 표시되도록 설정 */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />{" "}
          {/* 검색 결과 페이지 */}
          <Route index element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
