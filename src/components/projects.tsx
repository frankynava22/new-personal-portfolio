import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface ProjectLink {
  type: 'demo' | 'article';
  url: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  codeSnippet?: string;
  imageUrl?: string;
  links: ProjectLink[];
}

const ProjectsSection = styled.section`
  padding-top: ${({ theme }) => theme.spacing.xxl};
  padding-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
  display: inline-block;
  
  &::before {
    content: "04.";
    color: ${({ theme }) => theme.colors.accent};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 1.2rem;
    margin-right: ${({ theme }) => theme.spacing.sm};
    position: relative;
    bottom: 4px;
  }
  
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 70px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
`;

const ProjectCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform ${({ theme }) => theme.transitions.standard};
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const ProjectImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
`;

const ProjectImage = styled.div<{ bgImage?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${props => props.bgImage ? `url(${props.bgImage})` : 'linear-gradient(135deg, #0a192f 0%, #172a45 100%)'};
  background-size: cover;
  background-position: center;
  transition: transform ${({ theme }) => theme.transitions.standard};
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-grow: 1;
`;

const TechnologiesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.xs};
`;

const TechnologyItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.accent};
  background-color: ${({ theme }) => `${theme.colors.accent}10`};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ProjectLink = styled.a`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.2rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const DemoButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.standard};
  margin-top: ${({ theme }) => theme.spacing.md};
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.accent}20`};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

// Simple SVG icon placeholder component
const IconPlaceholder = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
  </svg>
);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Your actual projects data
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-puck Robot',
      description: 'Developed a virtual autonomous scavenging e-puck robot using Python and Webots that uses bug0-algorithm to reach a target destination. Currently improving the e-puck\'s capabilities to find "food" and create a memory-limited path that is transmitted back to base for other e-pucks.',
      technologies: ['Python', 'Webots', 'ROS'],
      links: [
        { type: 'demo', url: '#demo-epuck' }
      ]
    },
    {
      id: 2,
      title: 'EasyPeasyPal App',
      description: 'Creating an app that allows users to harness the full potential of technology to address everyday requirements regardless of their tech experience. Utilizing the Flutter framework and software engineering methodologies to develop a cross-platform mobile app for a seamless user experience.',
      technologies: ['Flutter', 'Dart', 'VS Code'],
      links: [
        { type: 'demo', url: '#demo-easypeasypal' }
      ]
    },
    {
      id: 3,
      title: 'Access Request Form',
      description: 'Developing a web application that allows employees to request access permissions to the district\'s internal management applications. Web application is built using C# .NET Framework, REST API\'s, and custom SQL queries for data retrieval and digital record keeping.',
      technologies: ['C# .NET Framework', 'HTTP Client', 'SQL', 'Content Management System'],
      links: [
        { type: 'demo', url: '#demo-access-request' }
      ]
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <ProjectsSection id="projects" ref={sectionRef} className="fade-in">
      <SectionTitle>What I've Built</SectionTitle>
      
      <ProjectsGrid>
        {projects.map(project => (
          <ProjectCard key={project.id}>
            <ProjectImageContainer>
              <ProjectImage />
            </ProjectImageContainer>
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechnologiesList>
                {project.technologies.map((tech, index) => (
                  <TechnologyItem key={index}>{tech}</TechnologyItem>
                ))}
              </TechnologiesList>
              {/* <DemoButton href={project.links[0].url} target="_blank" rel="noopener noreferrer">
                <IconPlaceholder /> View Demo
              </DemoButton> */}
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default Projects;