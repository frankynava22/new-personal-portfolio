import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

interface Skill {
  id: number;
  name: string;
  category: 'language' | 'framework' | 'tool' | 'software';
  icon: string; // This would be the path to your icon or a FontAwesome class
  proficiency: number; // 1-5 scale
}

const SkillsSection = styled.section`
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
    content: "03.";
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

const SkillsCategoriesContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const CategoryButton = styled.button<{ active: boolean }>`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const SkillCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform ${({ theme }) => theme.transitions.standard};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SkillIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
`;

const SkillName = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProficiencyBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => `${theme.colors.accent}30`};
  border-radius: 2px;
  margin-top: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
`;

const ProficiencyLevel = styled.div<{ level: number }>`
  height: 100%;
  width: ${props => `${props.level * 20}%`}; // 5 levels = 20% each
  background-color: ${({ theme }) => theme.colors.accent};
`;

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState<'all' | 'language' | 'framework' | 'tool' | 'software'>('all');
  const sectionRef = useRef<HTMLElement>(null);
  
  // Sample data - replace with your actual skills
  const skills: Skill[] = [
    // Languages
    { id: 1, name: 'JavaScript', category: 'language', icon: '📄', proficiency: 5 },
    { id: 2, name: 'TypeScript', category: 'language', icon: '📘', proficiency: 4 },
    { id: 3, name: 'HTML', category: 'language', icon: '🌐', proficiency: 5 },
    { id: 4, name: 'CSS', category: 'language', icon: '🎨', proficiency: 5 },
    { id: 5, name: 'Python', category: 'language', icon: '🐍', proficiency: 3 },
    
    // Frameworks
    { id: 6, name: 'React', category: 'framework', icon: '⚛️', proficiency: 5 },
    { id: 7, name: 'Node.js', category: 'framework', icon: '🟢', proficiency: 4 },
    { id: 8, name: 'Express', category: 'framework', icon: '🚂', proficiency: 4 },
    { id: 9, name: 'Styled Components', category: 'framework', icon: '💅', proficiency: 5 },
    { id: 10, name: 'Redux', category: 'framework', icon: '🔄', proficiency: 4 },
    
    // Tools
    { id: 11, name: 'Git', category: 'tool', icon: '🔄', proficiency: 5 },
    { id: 12, name: 'Webpack', category: 'tool', icon: '📦', proficiency: 3 },
    { id: 13, name: 'Vite', category: 'tool', icon: '⚡', proficiency: 4 },
    { id: 14, name: 'Jest', category: 'tool', icon: '🧪', proficiency: 3 },
    
    // Software
    { id: 15, name: 'VS Code', category: 'software', icon: '📝', proficiency: 5 },
    { id: 16, name: 'Figma', category: 'software', icon: '🖌️', proficiency: 4 },
    { id: 17, name: 'Adobe XD', category: 'software', icon: '📱', proficiency: 3 },
    { id: 18, name: 'MongoDB', category: 'software', icon: '🍃', proficiency: 4 },
  ];
  
  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);
  
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
    <SkillsSection id="skills" ref={sectionRef} className="fade-in">
      <SectionTitle>What I Know</SectionTitle>
      
      <SkillsCategoriesContainer>
        <CategoryButton 
          active={activeCategory === 'all'} 
          onClick={() => setActiveCategory('all')}
        >
          All
        </CategoryButton>
        <CategoryButton 
          active={activeCategory === 'language'} 
          onClick={() => setActiveCategory('language')}
        >
          Languages
        </CategoryButton>
        <CategoryButton 
          active={activeCategory === 'framework'} 
          onClick={() => setActiveCategory('framework')}
        >
          Frameworks
        </CategoryButton>
        <CategoryButton 
          active={activeCategory === 'tool'} 
          onClick={() => setActiveCategory('tool')}
        >
          Tools
        </CategoryButton>
        <CategoryButton 
          active={activeCategory === 'software'} 
          onClick={() => setActiveCategory('software')}
        >
          Software
        </CategoryButton>
      </SkillsCategoriesContainer>
      
      <SkillsGrid>
        {filteredSkills.map(skill => (
          <SkillCard key={skill.id}>
            <SkillIcon>{skill.icon}</SkillIcon>
            <SkillName>{skill.name}</SkillName>
            <ProficiencyBar>
              <ProficiencyLevel level={skill.proficiency} />
            </ProficiencyBar>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
};

export default Skills;