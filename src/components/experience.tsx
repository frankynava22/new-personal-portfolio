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
    max-width: 200px;
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
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`;

const ExperienceTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`;

const Organization = styled.h4`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem;
  }
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
  flex-wrap: wrap;
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
  
  // Your actual experience data
  const experiences: ExperienceItem[] = [
    // Education
    {
      id: 1,
      category: 'education',
      title: 'Bachelor of Science in Computer Science',
      organization: 'The University of Texas Rio Grande Valley',
      location: 'Edinburg, TX',
      startDate: '2020',
      endDate: 'Fall 2023',
      description: [
        'GPA: 3.56',
        'Expected Graduation: Fall 2023'
      ]
    },
    {
      id: 2,
      category: 'education',
      title: 'Associates Degree in Interdisciplinary Studies',
      organization: 'South Texas College',
      location: 'McAllen, TX',
      startDate: 'August 2016',
      endDate: 'June 2020',
      description: [
        'GPA: 4.0'
      ]
    },
    
    // Work Experience
    {
      id: 3,
      category: 'work',
      title: 'Data Analytics Intern',
      organization: 'UT Health (Dallas Country Health and Human Services)',
      location: 'Remote',
      startDate: 'September 2023',
      endDate: 'Present',
      description: [
        'Utilizing various software to efficiently gather and preprocess community data, ensuring accuracy and reliability for downstream analytics.',
        'Leveraging Power BI to design and implement interactive dashboards, offering stakeholders an intuitive view of key public health metrics.',
        'Organizing raw community data into impactful visualizations, aiding UT Health in data-driven decision-making as well as its stakeholders.',
        'Streamlining the data processing pipeline, facilitating efficient analytics, and ensuring the data is sufficient and relevant for certain tasks.'
      ]
    },
    {
      id: 4,
      category: 'work',
      title: 'Research Assistant',
      organization: 'Multiple Autonomous Robot Systems (Swarm Robotics) - UTRGV',
      location: 'Edinburg, Texas',
      startDate: 'April 2023',
      endDate: 'Present',
      description: [
        'Actively engaged in collaborative research that focuses on the practical application of Python programming in autonomous robot behavior.',
        'Implementing simulations in virtual environments to anticipate robotic behaviors, with the aim of enhancing predictability in the real world.',
        'Transitioning from virtual simulations to real world design applications using ROS and controller code from the simulations.',
        'Utilizing techniques such as foraging algorithms, path planning and obstacle avoidance to optimize robotic response.'
      ]
    },
    {
      id: 5,
      category: 'work',
      title: 'Web Master Intern',
      organization: 'Edinburg Consolidated School District',
      location: 'Edinburg, Texas',
      startDate: 'September 2022',
      endDate: 'Present',
      description: [
        'Managing over 30 school websites using a content management system and serving as a go-to resource for technology troubleshooting.',
        'Utilizing Structured Query Language (SQL) to effectively navigate the district website\'s database and extract relevant information.',
        'Collaborating with cross-functional teams to design and implement innovative solutions for improved efficiency and user experience.',
        'Managing and analyzing diverse datasets and employing advanced data processing techniques to drive informed decision making.'
      ]
    },
    {
      id: 6,
      category: 'work',
      title: 'Software Developer',
      organization: 'Bechtel',
      location: 'Reston, Virginia',
      startDate: 'June 2022',
      endDate: 'August 2022',
      description: [
        'Classified',
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
  
  useEffect(() => {
    // Reset active tab when category changes
    setActiveTab(0);
  }, [activeCategory]);
  
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
              {exp.organization.split(' - ')[0].split(' (')[0]}
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