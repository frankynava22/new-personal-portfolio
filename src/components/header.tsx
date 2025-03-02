import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme.navHeight};
  background-color: ${({ theme, scrolled }) => 
    scrolled ? `${theme.colors.primary}e6` : 'transparent'};
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
  z-index: 100;
  transition: all ${({ theme }) => theme.transitions.standard};
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Nav = styled.nav`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 75%;
    max-width: 300px;
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
    transform: translateX(100%);
    transition: transform ${({ theme }) => theme.transitions.standard};
    
    &.open {
      transform: translateX(0);
      box-shadow: -10px 0px 30px -15px rgba(0, 0, 0, 0.7);
    }
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const NavItem = styled.li`
  margin-left: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.accent};
    transition: width ${({ theme }) => theme.transitions.standard};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    
    &::before {
      width: 100%;
    }
  }
  
  span {
    color: ${({ theme }) => theme.colors.accent};
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const ResumeButton = styled.a`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  margin-left: ${({ theme }) => theme.spacing.lg};
  transition: all ${({ theme }) => theme.transitions.standard};
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.accent}20`};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
    margin-top: ${({ theme }) => theme.spacing.lg};
    display: inline-block;
    text-align: center;
  }
`;

const HamburgerButton = styled.button<{ open: boolean }>`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 101;
    
    div {
      width: 2rem;
      height: 0.25rem;
      background: ${({ theme }) => theme.colors.accent};
      border-radius: 10px;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: 1px;
      
      &:first-child {
        transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
      }
      
      &:nth-child(2) {
        opacity: ${({ open }) => open ? '0' : '1'};
        transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
      }
      
      &:nth-child(3) {
        transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
      }
    }
  }
`;

const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: ${({ open }) => open ? 'block' : 'none'};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  return (
    <HeaderContainer scrolled={scrolled}>
      <Logo>
        Franky<span>.</span>
      </Logo>
      
      <HamburgerButton open={menuOpen} onClick={toggleMenu} aria-label="Toggle menu">
        <div />
        <div />
        <div />
      </HamburgerButton>
      
      <Nav className={menuOpen ? 'open' : ''}>
        <NavLinks>
          <NavItem>
            <NavLink href="#about" onClick={closeMenu}>
              <span>01.</span>About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#experience" onClick={closeMenu}>
              <span>02.</span>Experience
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#skills" onClick={closeMenu}>
              <span>03.</span>Skills
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#projects" onClick={closeMenu}>
              <span>04.</span>Projects
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#certificates" onClick={closeMenu}>
              <span>05.</span>Certificates
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#contact" onClick={closeMenu}>
              <span>06.</span>Contact
            </NavLink>
          </NavItem>
          <NavItem>
            <ResumeButton href="#resume" onClick={closeMenu}>
              Resume
            </ResumeButton>
          </NavItem>
        </NavLinks>
      </Nav>
      
      <Overlay open={menuOpen} onClick={closeMenu} />
    </HeaderContainer>
  );
};

export default Header;