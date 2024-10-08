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
        footer: '#EBEBEB',
        'chathams-blue': '#175579',
        'gray-light': '#F4F4F4',
        'gray-light-medium': '#D8D8D8',
        'gray-medium': '#969696',
        'gray-medium-dark': '#646464',
        'gray-dark': '#323232',
        'light-gold': '#FDDC5C',
        gold: '#FFD700',
        bronze: '#CD7F32',
        'light-bronze': '#D4A96B',
        kakao: '#FEE500',
        naver: '#03C75A',
        overlay: 'rgba(0, 0, 0, 0.4)',
      },
      fontSize: {
        'title-large': [
          pxToRem(44),
          {
            fontWeight: '600',
            letterSpacing: '0px',
            lineHeight: 1.2,
          },
        ],
        'title-medium': [
          pxToRem(32),
          {
            fontWeight: '600',
            letterSpacing: '0px',
            lineHeight: 1.2,
          },
        ],
        'title-small': [
          pxToRem(24),
          {
            fontWeight: '600',
            letterSpacing: '0px',
            lineHeight: 1.2,
          },
        ],
        'text-xlarge': [
          pxToRem(22),
          {
            fontWeight: '500',
            letterSpacing: '0px',
            lineHeight: 1.4,
          },
        ],
        'text-large': [
          pxToRem(18),
          {
            fontWeight: '400',
            letterSpacing: '0px',
            lineHeight: 1.4,
          },
        ],
        'text-medium': [
          pxToRem(16),
          {
            fontWeight: '400',
            letterSpacing: '0px',
            lineHeight: 1.4,
          },
        ],
        'text-small': [
          pxToRem(12),
          {
            fontWeight: '400',
            letterSpacing: '0px',
            lineHeight: 1.4,
          },
        ],
      },
    },
  },
  plugins: [],
};
