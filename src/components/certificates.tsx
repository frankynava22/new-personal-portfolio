import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
}

const CertificatesSection = styled.section`
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
    content: "05.";
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

const CertificatesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const CertificateCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform ${({ theme }) => theme.transitions.standard};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.accent};
  }
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CertificateIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => `${theme.colors.accent}20`};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const CertificateTitle = styled.h3`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CertificateIssuer = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
`;

const CertificateDate = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CertificateLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  margin-top: auto;
  
  svg {
    margin-left: ${({ theme }) => theme.spacing.xs};
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const Certificates: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Sample data - replace with your actual certificates
  const certificates: Certificate[] = [
    {
      id: 1,
      title: 'Ultimate ASP.NET',
      issuer: 'Udemy',
      date: 'Feb 20, 2024',
      credentialUrl: 'src/assets/asp_net.jpg',
    },
    {
      id: 2,
      title: 'React Hooks',
      issuer: 'Udemy',
      date: 'March 21, 2024',
      credentialUrl: 'src/assets/react_hooks.jpg',
    },
    {
      id: 3,
      title: 'Styled Components',
      issuer: 'Udemy',
      date: 'March 28, 2024',
      credentialUrl: 'src/assets/styled_components.jpg',
    },
    
  ];
  
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
    <CertificatesSection id="certificates" ref={sectionRef} className="fade-in">
      <SectionTitle>My Certificates</SectionTitle>
      
      <CertificatesContainer>
        {certificates.map(certificate => (
          <CertificateCard key={certificate.id}>
            <CertificateIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </CertificateIcon>
            <CertificateTitle>{certificate.title}</CertificateTitle>
            <CertificateIssuer>{certificate.issuer}</CertificateIssuer>
            <CertificateDate>{certificate.date}</CertificateDate>
            {certificate.credentialUrl && (
              <CertificateLink href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                View Certificate
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </CertificateLink>
            )}
          </CertificateCard>
        ))}
      </CertificatesContainer>
    </CertificatesSection>
  );
};

export default Certificates;