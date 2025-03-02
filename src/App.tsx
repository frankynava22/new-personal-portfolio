import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/global-styles';
import ParallaxStars from './components/parallax-stars';
import Header from './components/header';
import Experience from './components/experience';
import Hero from './components/hero';
import Skills from './components/skills';
import Certificates from './components/certificates';
import Projects from './components/projects';
import Resume from './components/resume';
import Contact from './components/contact';
import Footer from './components/footer';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ParallaxStars />
      <Header />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default App;