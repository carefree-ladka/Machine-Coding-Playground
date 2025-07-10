import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import { Pagination, ProgressBar, SlideShow } from "./projects";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Child Routes */}
        {/* <Route path="/infinite-scroller" element={<InfiniteScroller />} /> */}
        <Route path="/pagination" element={<Pagination />} />
        <Route path="/progress-bar" element={<ProgressBar />} />
        <Route path="/carousel" element={<SlideShow />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
