import type { Config } from 'tailwindcss'
import lineClamp from '@tailwindcss/line-clamp'
const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
      primary: { DEFAULT: '#2563EB' },
      secondary: { DEFAULT: '#0EA5E9' },
      accent: { DEFAULT: '#22C55E' },
      highlight: { DEFAULT: '#A855F7' },
      warn: { DEFAULT: '#F59E0B' },
      danger: { DEFAULT: '#EF4444' }
    }
  }},
  plugins: [lineClamp]
}
export default config
