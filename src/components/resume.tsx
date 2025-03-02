import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ResumeSection = styled.section`
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
    content: "06.";
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

const ResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: stretch;
  }
`;

const ResumeActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.accent}30`};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 250px;
    padding-right: ${({ theme }) => theme.spacing.xl};
    padding-bottom: 0;
    border-bottom: none;
    border-right: 1px solid ${({ theme }) => `${theme.colors.accent}30`};
  }
`;

const ResumeIcon = styled.div`
  width: 120px;
  height: 120px;
  background-color: ${({ theme }) => `${theme.colors.accent}20`};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  svg {
    width: 60px;
    height: 60px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ResumeButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

const DownloadResumeButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.standard};
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.accent}d0`};
    color: ${({ theme }) => theme.colors.black};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const UploadResumeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.standard};
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.accent}20`};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const ResumePreview = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.spacing.xl};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: 0;
    padding-left: ${({ theme }) => theme.spacing.xl};
  }
`;

const FileUploadInput = styled.input`
  display: none;
`;

const PreviewTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: left;
  }
`;

const PDFContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  overflow: hidden;
`;

const PDFEmbed = styled.embed`
  width: 100%;
  height: 100%;
  border: none;
`;

const PDFPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  
  svg {
    width: 80px;
    height: 80px;
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 1.1rem;
    max-width: 350px;
  }
`;

const Resume: React.FC = () => {
  const [resumePdf, setResumePdf] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const fileUrl = URL.createObjectURL(file);
      setResumePdf(fileUrl);
      
      // Store in localStorage for persistence
      localStorage.setItem('resumePdfUrl', fileUrl);
    }
  };
  
  useEffect(() => {
    // Check if we have a stored resume PDF URL
    const storedResumeUrl = localStorage.getItem('resumePdfUrl');
    if (storedResumeUrl) {
      setResumePdf(storedResumeUrl);
    }
    
    // Cleanup function
    return () => {
      if (resumePdf) {
        URL.revokeObjectURL(resumePdf);
      }
    };
  }, []);
  
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
    <ResumeSection id="resume" ref={sectionRef} className="fade-in">
      <SectionTitle>My Resume</SectionTitle>
      
      <ResumeContainer>
        <ResumeActions>
          <ResumeIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </ResumeIcon>
          
          <ResumeButtonsContainer>
            <UploadResumeButton onClick={handleUploadClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Resume
            </UploadResumeButton>
            
            <FileUploadInput 
              type="file" 
              ref={fileInputRef} 
              accept="application/pdf" 
              onChange={handleFileChange}
            />
            
            {resumePdf && (
              <DownloadResumeButton href={resumePdf} download="franky-nava-resume.pdf">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </DownloadResumeButton>
            )}
          </ResumeButtonsContainer>
        </ResumeActions>
        
        <ResumePreview>
          <PreviewTitle>Resume Preview</PreviewTitle>
          
          <PDFContainer>
            {resumePdf ? (
              <PDFEmbed src={resumePdf} type="application/pdf" />
            ) : (
              <PDFPlaceholder>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>Upload your resume to view and share it here. Only PDF files are supported.</p>
              </PDFPlaceholder>
            )}
          </PDFContainer>
        </ResumePreview>
      </ResumeContainer>
    </ResumeSection>
  );
};

export default Resume;