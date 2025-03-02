import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface ProjectLink {
  type: 'github' | 'demo' | 'article';
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

const CodeSnippetButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ModalHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.accent}30`};
`;

const ModalTitle = styled.h3`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.white};
`;

const CodeSnippet = styled.pre`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  overflow-x: auto;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  
  code {
    display: block;
  }
`;

const Projects: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Sample data - replace with your actual projects
  const projects: Project[] = [
    {
      id: 1,
      title: 'Personal Portfolio Website',
      description: 'A responsive portfolio website built with React and Styled Components featuring a space theme, parallax effects, and smooth animations.',
      technologies: ['React', 'TypeScript', 'Styled Components', 'Vite'],
      codeSnippet: `import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StarsContainer = styled.div\`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
\`;

interface StarProps {
  size: number;
  x: number;
  y: number;
  speed: number;
  opacity: number;
}

const Star = styled.div<StarProps>\`
  position: absolute;
  width: \${props => props.size}px;
  height: \${props => props.size}px;
  background-color: white;
  border-radius: 50%;
  top: \${props => props.y}px;
  left: \${props => props.x}px;
  opacity: \${props => props.opacity};
\`;

// Rest of parallax stars component...`,
      links: [
        { type: 'github', url: 'https://github.com/username/portfolio' },
        { type: 'demo', url: 'https://portfolio.username.com' }
      ]
    },
    {
      id: 2,
      title: 'E-Commerce Dashboard',
      description: 'An admin dashboard for an e-commerce platform with sales analytics, inventory management, and order processing features.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
      codeSnippet: `// Sales chart component using Chart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const SalesChart = ({ salesData }) => {
  const data = {
    labels: salesData.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Sales',
        data: salesData.map(item => item.amount),
        fill: false,
        backgroundColor: '#64ffda',
        borderColor: '#64ffda',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // Additional chart options...
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChart;`,
      links: [
        { type: 'github', url: 'https://github.com/username/ecommerce-dashboard' },
        { type: 'demo', url: 'https://dashboard.example.com' }
      ]
    },
    {
      id: 3,
      title: 'Weather App',
      description: 'A weather application that displays current weather conditions and forecasts based on user location or search. Features include interactive maps and detailed weather data.',
      technologies: ['React', 'TypeScript', 'OpenWeatherMap API', 'Leaflet'],
      codeSnippet: `// Weather data fetching hook
import { useState, useEffect } from 'react';

export const useWeatherData = (location) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          \`https://api.openweathermap.org/data/2.5/weather?q=\${location}&appid=\${process.env.REACT_APP_WEATHER_API_KEY}&units=metric\`
        );
        
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        
        const data = await response.json();
        setWeather(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchWeather();
    }
  }, [location]);

  return { weather, loading, error };
};`,
      links: [
        { type: 'github', url: 'https://github.com/username/weather-app' },
        { type: 'demo', url: 'https://weather.example.com' }
      ]
    }
  ];
  
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };
  
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
  
  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
    <ProjectsSection id="projects" ref={sectionRef} className="fade-in">
      <SectionTitle>What I've Built</SectionTitle>
      
      <ProjectsGrid>
        {projects.map(project => (
          <ProjectCard key={project.id}>
            <ProjectImageContainer>
              <ProjectImage bgImage={project.imageUrl} />
            </ProjectImageContainer>
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechnologiesList>
                {project.technologies.map((tech, index) => (
                  <TechnologyItem key={index}>{tech}</TechnologyItem>
                ))}
              </TechnologiesList>
              <ProjectLinks>
                {project.links.map((link, index) => (
                  <ProjectLink key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.type === 'github' && '💻'}
                    {link.type === 'demo' && '🔗'}
                    {link.type === 'article' && '📄'}
                  </ProjectLink>
                ))}
              </ProjectLinks>
              {project.codeSnippet && (
                <CodeSnippetButton onClick={() => openModal(project)}>
                  <span>📋</span> View Code Snippet
                </CodeSnippetButton>
              )}
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
      
      <ModalOverlay isOpen={modalOpen} onClick={closeModal}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalCloseButton onClick={closeModal}>×</ModalCloseButton>
          <ModalHeader>
            <ModalTitle>{selectedProject?.title} - Code Snippet</ModalTitle>
          </ModalHeader>
          <CodeSnippet>
            <code>{selectedProject?.codeSnippet}</code>
          </CodeSnippet>
        </ModalContent>
      </ModalOverlay>
    </ProjectsSection>
  );
};

export default Projects;