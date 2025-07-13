import { projectsConfig } from "@utils/projects.config.util";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {projectsConfig.map((item) => (
          <Route key={item.title} path={item.path} element={item.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
