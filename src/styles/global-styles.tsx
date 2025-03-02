import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.accent} ${({ theme }) => theme.colors.primary};
  }

  body {
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.accent};
    border-radius: 10px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: 1.2;
    font-weight: 600;
  }

  h1 {
    font-size: 2.5rem;
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 3.5rem;
    }
  }

  h2 {
    font-size: 2rem;
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 2.5rem;
    }
  }

  h3 {
    font-size: 1.5rem;
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 2rem;
    }
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    transition: all ${({ theme }) => theme.transitions.standard};
    
    &:hover {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  button {
    cursor: pointer;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-family: ${({ theme }) => theme.fonts.mono};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    transition: all ${({ theme }) => theme.transitions.standard};
    
    &:hover {
      background-color: ${({ theme }) => `${theme.colors.accent}20`};
    }
  }

  section {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
    max-width: ${({ theme }) => theme.maxWidth};
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .container {
    width: 100%;
    max-width: ${({ theme }) => theme.maxWidth};
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
  
  .section-title {
    display: inline-block;
    position: relative;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 70px;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.accent};
    }
  }
  
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    
    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;