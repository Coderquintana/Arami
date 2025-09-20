import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
      primary: { DEFAULT: '#2563EB' },
      secondary: { DEFAULT: '#0EA5E9' },
      accent: { DEFAULT: '#22C55E' },
      warn: { DEFAULT: '#F59E0B' },
      danger: { DEFAULT: '#EF4444' }
    }
  }},
  plugins: []
}
export default config
