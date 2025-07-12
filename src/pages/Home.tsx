import { Link } from "react-router-dom";
import styled from "styled-components";
import { projectsConfig } from "../utils";

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const HomeHeading = styled.h1`
  text-align: center;
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    font-size: 3.5rem;
    margin-bottom: 4rem;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProjectCard = styled(Link)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);

    &::before {
      transform: scaleX(1);
    }
  }

  &:active {
    transform: translateY(-4px);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const ProjectDescription = styled.p`
  color: #718096;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const Home = () => {
  return (
    <HomeContainer>
      <HomeHeading>Projects & Practice Playground</HomeHeading>
      <ProjectGrid>
        {projectsConfig.map((project) => (
          <ProjectCard key={project.path} to={project.path}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </HomeContainer>
  );
};
