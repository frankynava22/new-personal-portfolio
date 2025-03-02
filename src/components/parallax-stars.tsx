import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StarsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
`;

interface StarProps {
  size: number;
  x: number;
  y: number;
  speed: number;
  opacity: number;
}

const Star = styled.div<StarProps>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  opacity: ${props => props.opacity};
  transform: translateY(0);
  transition: transform ${props => props.speed}s linear;
  box-shadow: 0 0 ${props => props.size * 2}px ${props => props.size / 2}px rgba(255, 255, 255, 0.5);
`;

interface StarData extends StarProps {
  id: number;
}

const ParallaxStars: React.FC = () => {
  const [stars, setStars] = useState<StarData[]>([]);
  const [offsetY, setOffsetY] = useState(0);

  // Generate random stars
  useEffect(() => {
    const generateStars = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const starsCount = Math.floor((windowWidth * windowHeight) / 10000);
      
      const newStars: StarData[] = [];
      
      for (let i = 0; i < starsCount; i++) {
        newStars.push({
          id: i,
          size: Math.random() * 3 + 1,
          x: Math.floor(Math.random() * windowWidth),
          y: Math.floor(Math.random() * windowHeight),
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.7 + 0.3,
        });
      }
      
      setStars(newStars);
    };

    generateStars();

    window.addEventListener('resize', generateStars);
    
    return () => {
      window.removeEventListener('resize', generateStars);
    };
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StarsContainer>
      {stars.map((star) => (
        <Star
          key={star.id}
          size={star.size}
          x={star.x}
          y={star.y}
          speed={star.speed}
          opacity={star.opacity}
          style={{ transform: `translateY(${offsetY * star.speed * 0.5}px)` }}
        />
      ))}
    </StarsContainer>
  );
};

export default ParallaxStars;