import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: ${({ theme }) => theme.navHeight};
`;

const HeroContent = styled.div`
  max-width: 1000px;
`;

const Greeting = styled.h1`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`;

const Name = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 4rem;
  }

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Subtitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3rem;
  }
`;

const Description = styled.p`
  max-width: 540px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.1rem;
`;

const CTA = styled.a`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.standard};
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.accent}20`};
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

const Hero: React.FC = () => {
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
    <HeroSection id="about" ref={sectionRef} className="fade-in">
      <HeroContent>
        <Greeting>Hi there, my name is</Greeting>
        <Name>Franky <span>Nava</span></Name>
        <Subtitle>I build things for the web.</Subtitle>
        <Description>
          I'm a software developer specializing in building exceptional digital experiences. 
          Currently, I'm focused on building accessible, human-centered products.
        </Description>
        <CTA href="#contact">Get In Touch</CTA>
        
        {/* Decorative stars */}
        <Star size={4} top="25%" left="15%" delay={0.5} />
        <Star size={3} top="60%" left="80%" delay={1.2} />
        <Star size={2} top="40%" left="70%" delay={0.8} />
        <Star size={5} top="75%" left="30%" delay={1.5} />
        <Star size={3} top="20%" left="60%" delay={0.2} />
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;