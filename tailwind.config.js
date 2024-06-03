import { pxToRem } from './src/utils/pxToRem';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4166F5',
        secondary: '#6495ED',
        tertiary: '#A2BFFE',
        negative: '#D73B3E',
        background: '#FFFFFF',
        black: '#000000',
        orange: '#FF8B00',
        'chathams-blue': '#175579',
        'gray-light': '#F4F4F4',
        'gray-light-medium': '#D8D8D8',
        'gray-medium': '#969696',
        'gray-medium--dark': '#646464',
        'gray-dark': '#323232',
        'light-gold': '#FDDC5C',
        gold: '#FFD700',
        bronze: '#CD7F32',
        'light-bronze': '#D4A96B',
        kakao: '#FEE500',
        naver: '#03C75A',
      },
      fontSize: {
        'title-large': [
          pxToRem(48),
          {
            fontWeight: 'bold',
            letterSpacing: '0px',
            lineHeight: 1.2,
          },
        ],
        'title-medium': [
          pxToRem(36),
          {
            fontWeight: 'bold',
            letterSpacing: '0px',
            lineHeight: 1.2,
          },
        ],
        'title-small': [
          pxToRem(28),
          {
            fontWeight: 'bold',
            letterSpacing: '0px',
            lineHeight: 1.2,
          },
        ],
        'text-xlarge': [
          pxToRem(24),
          {
            fontWeight: 'semibold',
            letterSpacing: '0px',
            lineHeight: 1.4,
          },
        ],
        'text-large': [
          pxToRem(20),
          {
            fontWeight: 'normal',
            letterSpacing: '0px',
            lineHeight: 1.4,
          },
        ],
        'text-medium': [
          pxToRem(16),
          {
            fontWeight: 'normal',
            letterSpacing: '0px',
            lineHeight: 1.4,
          },
        ],
        'text-small': [
          pxToRem(12),
          {
            fontWeight: 'normal',
            letterSpacing: '0px',
            lineHeight: 1.4,
          },
        ],
      },
    },
  },
  plugins: [],
};
