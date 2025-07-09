import React from "react";
import { Link } from "react-router-dom";
import { projectsConfig } from "../utils";
import "./Home.css";

export const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="home-heading">Projects & Practice Playground</h1>
      <div className="project-grid">
        {projectsConfig.map((project) => (
          <Link key={project.path} to={project.path} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
