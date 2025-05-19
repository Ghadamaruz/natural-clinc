import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#d9e4ff',
          200: '#bcceff',
          300: '#8eadff',
          400: '#5c85ff',
          500: '#4876ff', // Primary color
          600: '#3a5fd9',
          700: '#2d4bb3',
          800: '#243c8c',
          900: '#1e3372',
        },
        secondary: {
          50: '#fff8f0',
          100: '#ffe9d9',
          200: '#ffd4bc',
          300: '#ffb48e',
          400: '#ff8e5f',
          500: '#ff7e5f', // Secondary color
          600: '#d96a50',
          700: '#b35541',
          800: '#8c4333',
          900: '#72372a',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#28c76f', // Success color
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#ffb800', // Warning color
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ff5454', // Danger color
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        info: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#00b8d9', // Info color
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px 0 rgba(0, 0, 0, 0.08)',
        'hard': '0 8px 30px 0 rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'primary-gradient': 'linear-gradient(to right, rgb(var(--primary-gradient-start)), rgb(var(--primary-gradient-end)))',
        'secondary-gradient': 'linear-gradient(to right, rgb(var(--secondary-gradient-start)), rgb(var(--secondary-gradient-end)))',
        'success-gradient': 'linear-gradient(to right, rgb(var(--success-gradient-start)), rgb(var(--success-gradient-end)))',
        'warning-gradient': 'linear-gradient(to right, rgb(var(--warning-gradient-start)), rgb(var(--warning-gradient-end)))',
        'danger-gradient': 'linear-gradient(to right, rgb(var(--danger-gradient-start)), rgb(var(--danger-gradient-end)))',
        'info-gradient': 'linear-gradient(to right, rgb(var(--info-gradient-start)), rgb(var(--info-gradient-end)))',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideInUp': 'slideInUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config
