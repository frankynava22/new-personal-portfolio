import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface ExperienceItem {
  id: number;
  category: 'education' | 'work';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

const ExperienceSection = styled.section`
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
    content: "02.";
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

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

const TabButtons = styled.div`
  display: flex;
  overflow-x: auto;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    overflow-x: visible;
    min-width: 200px;
    margin-right: ${({ theme }) => theme.spacing.xl};
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  background-color: transparent;
  color: ${({ theme, active }) => active ? theme.colors.accent : theme.colors.text};
  border: none;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  text-align: left;
  white-space: nowrap;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: ${({ active }) => active ? '2px' : '0'};
    height: 100%;
    left: 0;
    top: 0;
    background-color: ${({ theme }) => theme.colors.accent};
    transition: width ${({ theme }) => theme.transitions.standard};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    &::before {
      width: 2px;
      height: ${({ active }) => active ? '100%' : '0'};
      transition: height ${({ theme }) => theme.transitions.standard};
    }
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const TabContent = styled.div`
  flex-grow: 1;
`;

const ExperienceTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Organization = styled.h4`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Duration = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Description = styled.ul`
  margin-left: ${({ theme }) => theme.spacing.lg};
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    position: relative;
    
    &::before {
      content: '▹';
      position: absolute;
      left: -${({ theme }) => theme.spacing.lg};
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const CategoryTabs = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const CategoryTab = styled.button<{ active: boolean }>`
  background-color: ${({ theme, active }) => active ? `${theme.colors.accent}20` : 'transparent'};
  color: ${({ theme, active }) => active ? theme.colors.accent : theme.colors.text};
  border: 1px solid ${({ theme, active }) => active ? theme.colors.accent : 'transparent'};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-family: ${({ theme }) => theme.fonts.mono};
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.accent}10`};
  }
`;

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'education' | 'work'>('all');
  const sectionRef = useRef<HTMLElement>(null);
  
  // Sample data - replace with your actual experience
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      category: 'education',
      title: 'Bachelor of Science in Computer Science',
      organization: 'University of Technology',
      location: 'San Francisco, CA',
      startDate: 'September 2018',
      endDate: 'May 2022',
      description: [
        'Graduated with a 3.8 GPA',
        'Specialized in Web Development and Software Engineering',
        'Completed capstone project on scalable web applications',
        'Active member of the Computer Science Student Association'
      ]
    },
    {
      id: 2,
      category: 'work',
      title: 'Frontend Developer',
      organization: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: 'June 2022',
      endDate: 'Present',
      description: [
        'Develop and maintain responsive web applications using React and TypeScript',
        'Collaborate with UX/UI designers to implement pixel-perfect designs',
        'Optimize application performance and improve code quality',
        'Integrate RESTful APIs and implement state management solutions'
      ]
    },
    {
      id: 3,
      category: 'work',
      title: 'Web Development Intern',
      organization: 'Digital Creatives',
      location: 'San Jose, CA',
      startDate: 'May 2021',
      endDate: 'August 2021',
      description: [
        'Assisted in developing and maintaining client websites',
        'Implemented responsive designs using HTML, CSS, and JavaScript',
        'Learned agile development methodologies and participated in daily stand-ups',
        'Contributed to codebase improvements and bug fixes'
      ]
    },
    {
      id: 4,
      category: 'education',
      title: 'Web Development Bootcamp',
      organization: 'CodeCamp',
      location: 'Online',
      startDate: 'January 2021',
      endDate: 'April 2021',
      description: [
        'Intensive 12-week program focusing on full-stack web development',
        'Built projects using React, Node.js, and MongoDB',
        'Collaborated with peers on team projects simulating real-world development',
        'Received certificate of completion with distinction'
      ]
    }
  ];
  
  const filteredExperiences = activeCategory === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === activeCategory);
  
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
    <ExperienceSection id="experience" ref={sectionRef} className="fade-in">
      <SectionTitle>Where I've Been</SectionTitle>
      
      <CategoryTabs>
        <CategoryTab 
          active={activeCategory === 'all'} 
          onClick={() => setActiveCategory('all')}
        >
          All
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'education'} 
          onClick={() => setActiveCategory('education')}
        >
          Education
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'work'} 
          onClick={() => setActiveCategory('work')}
        >
          Work
        </CategoryTab>
      </CategoryTabs>
      
      <TabsContainer>
        <TabButtons>
          {filteredExperiences.map((exp, index) => (
            <TabButton 
              key={exp.id} 
              active={activeTab === index}
              onClick={() => setActiveTab(index)}
            >
              {exp.organization}
            </TabButton>
          ))}
        </TabButtons>
        
        <TabContent>
          {filteredExperiences.length > 0 && (
            <>
              <ExperienceTitle>{filteredExperiences[activeTab].title}</ExperienceTitle>
              <Organization>{filteredExperiences[activeTab].organization} • {filteredExperiences[activeTab].location}</Organization>
              <Duration>{filteredExperiences[activeTab].startDate} - {filteredExperiences[activeTab].endDate}</Duration>
              <Description>
                {filteredExperiences[activeTab].description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </Description>
            </>
          )}
        </TabContent>
      </TabsContainer>
    </ExperienceSection>
  );
};

export default Experience;