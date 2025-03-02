import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const UnderConstructionSection = styled.section`
  padding-top: ${({ theme }) => theme.spacing.xxl};
  padding-bottom: ${({ theme }) => theme.spacing.xxl};
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
  display: inline-block;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.6;
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

const ReturnButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  margin-top: ${({ theme }) => theme.spacing.lg};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 600;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.standard};
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.accent}20`};
    color: ${({ theme }) => theme.colors.accent};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const IconContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  svg {
    width: 120px;
    height: 120px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Star = styled.div<{ size: number; top: string; left: string; delay: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  top: ${props => props.top};
  left: ${props => props.left};
  opacity: 0;
  animation: twinkle 4s infinite ${props => props.delay}s;
  box-shadow: 0 0 ${props => props.size * 2}px ${props => props.size}px ${({ theme }) => theme.colors.accent}80;
  
  @keyframes twinkle {
    0%, 100% {
      opacity: 0.1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.2);
    }
  }
`;

const UnderConstruction: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
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
    <UnderConstructionSection ref={sectionRef} className="fade-in">
      <IconContainer>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
        </svg>
      </IconContainer>
      
      <SectionTitle>Under Construction</SectionTitle>
      
      <Container>
        <Message>
          This section of the website is currently <Accent>under construction</Accent> and will be 
          available soon. I'm working hard to bring you an amazing experience.
        </Message>
        
        <Message>
          Please check back later or explore other parts of the website that are already complete.
        </Message>
        
        <ReturnButton href="/">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Home
        </ReturnButton>
      </Container>
      
      {/* Decorative stars */}
      <Star size={4} top="25%" left="15%" delay={0.5} />
      <Star size={3} top="60%" left="80%" delay={1.2} />
      <Star size={2} top="40%" left="70%" delay={0.8} />
      <Star size={5} top="75%" left="30%" delay={1.5} />
      <Star size={3} top="20%" left="60%" delay={0.2} />
    </UnderConstructionSection>
  );
};

export default UnderConstruction;