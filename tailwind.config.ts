import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        '300': '300px',
      },
      height: {
        '600': '600px',
        '480': '480px',
      },
      maxWidth: {
        '1366': '1366px',
        '1/3': '33vw',
      },
      colors: {
        'surface': '#141218',
        'surface1': '#25232A',
        'surface2': '#2B2831',
        'on-surface': '#E6E1E5',
        'surface-container-high': '#2B2930',
        'secondary-container': '#4A4458',
        'on-secondary-container': '#E8DEF8',
        'secondary-container-hover': '#928f9B',
      },
      boxShadow: {
        'outer': '0px 4px 17px 1px rgba(0, 0, 0, .25)',
        'outer2': '0px 1px 3px 1px rgba(0, 0, 0, .15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
