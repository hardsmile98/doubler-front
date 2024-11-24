/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      white: '#FFFFFF',
      black: '#000000',
      primary: {
        light: '#12C57E',
        dark: '#12C57E',
      },
      label: {
        secondary: {
          light: '#828282',
          dark: '#C2C2C2',
        },
      },
      notification: {
        success: {
          bg: '#f0fdf4',
          icon: '#4ade80',
          label: '#166534',
        },
        info: {
          bg: '#eff6ff',
          icon: '#60a5fa',
          label: '#1d4ed8',
        },
        error: {
          bg: '#fef2f2',
          icon: '#f87171',
          label: '#991b1b',
        },
        warning: {
          bg: '#fefce8',
          icon: '#facc15',
          label: '#854d0e',
        },
      },
      bg: {
        primary: {
          light: '#FCFCFC',
          dark: '#1C1B29',
        },
        secondary: {
          light: '#F1F1F1',
          dark: '#1E2432',
        },
      },
      success: {
        light: '#12C57E',
        dark: '#12C57E',
      },
      error: {
        light: '#ff3333',
        dark: '#ff3333',
      },
      separator: {
        light: '#E1E1E1',
        dark: '#3A435A',
      },
    },
  },
  plugins: [],
};
