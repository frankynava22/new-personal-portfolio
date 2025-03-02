export const theme = {
    colors: {
      primary: '#0a192f', // Dark blue background
      secondary: '#172a45', // Slightly lighter blue for cards/sections
      accent: '#64ffda', // Pastel blue/teal accent color
      text: '#ccd6f6', // Light blue/gray for main text
      textLight: '#8892b0', // Lighter text for secondary information
      white: '#e6f1ff', // Almost white color for highlights
      black: '#020c1b', // Almost black for deep space effect
      overlay: 'rgba(2, 12, 27, 0.7)', // Overlay color for modals
    },
    fonts: {
      main: "'Space Grotesk', 'Roboto', sans-serif",
      mono: "'Fira Code', monospace",
    },
    breakpoints: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    transitions: {
      standard: '0.3s ease-in-out',
    },
    shadows: {
      small: '0 2px 10px rgba(0, 0, 0, 0.1)',
      medium: '0 4px 20px rgba(0, 0, 0, 0.15)',
      large: '0 10px 30px rgba(0, 0, 0, 0.2)',
    },
    borderRadius: {
      small: '4px',
      medium: '8px',
      large: '12px',
      round: '50%',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '2rem',
      xl: '3rem',
      xxl: '5rem',
    },
    maxWidth: '1200px',
    navHeight: '80px',
  };
  
  export type Theme = typeof theme;