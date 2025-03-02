import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  transition: all ${({ theme }) => theme.transitions.standard};
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const FooterSocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SocialLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background-color: ${({ theme }) => `${theme.colors.accent}20`};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  transition: all ${({ theme }) => theme.transitions.standard};
  
  svg {
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.accent};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    
    svg {
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

const BackToTop = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.standard};
  
  svg {
    width: 16px;
    height: 16px;
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.accent}20`};
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.8rem;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Add a handleLinkClick function to handle smooth scrolling
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const year = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          Thanks for stopping by!
        </FooterText>
        
        <FooterLinks>
          <FooterLink 
            href="#about" 
            onClick={(e) => handleLinkClick(e, 'about')}
          >
            About
          </FooterLink>
          <FooterLink 
            href="#experience" 
            onClick={(e) => handleLinkClick(e, 'experience')}
          >
            Experience
          </FooterLink>
          <FooterLink 
            href="#skills" 
            onClick={(e) => handleLinkClick(e, 'skills')}
          >
            Skills
          </FooterLink>
          <FooterLink 
            href="#projects" 
            onClick={(e) => handleLinkClick(e, 'projects')}
          >
            Projects
          </FooterLink>
          <FooterLink 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, 'contact')}
          >
            Contact
          </FooterLink>
        </FooterLinks>
        
        <FooterSocialLinks>
          <SocialLink href="https://www.linkedin.com/in/frankynava" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </SocialLink>
          
          <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </SocialLink>
          
          <SocialLink href="mailto:frankynava2201@gmail.com" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </SocialLink>
        </FooterSocialLinks>
        
        <BackToTop onClick={scrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Back to Top
        </BackToTop>
        
        <Copyright>
          © {year} Franky Nava. All Rights Reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;