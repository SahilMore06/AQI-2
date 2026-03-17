/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:          '#070D1A',
        surface:     '#0F1729',
        dim:         '#1A2535',
        border:      '#1E3A5F',
        'border-h':  '#2E5A8F',
        text:        '#F0F4FF',
        muted:       '#8B9AB4',
        primary:     '#4D94FF',
        'primary-d': '#0066FF',
        accent:      '#00FFCC',
        'accent-d':  '#00D4AA',
        good:        '#00E676',
        moderate:    '#FFE57F',
        unhealthy:   '#FF9E40',
        vunhealthy:  '#FF5252',
        hazardous:   '#CE93D8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        glass: '12px',
        dark:  '20px',
        nav:   '24px',
      },
    },
  },
  plugins: [],
}