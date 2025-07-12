import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import {
  Accordion,
  DataTable,
  Pagination,
  ProgressBar,
  SlideShow,
  StarRating,
} from "./projects";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pagination" element={<Pagination />} />
        <Route path="/progress-bar" element={<ProgressBar />} />
        <Route path="/carousel" element={<SlideShow />} />
        <Route path="/accordion" element={<Accordion />} />
        <Route path="/star-rating" element={<StarRating />} />
        <Route path="/data-table" element={<DataTable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
