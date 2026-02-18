/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0f1a',
        'bg-secondary': '#111827',
        'bg-card': '#1a2332',
        'bg-card-hover': '#1f2a3d',
        'accent-primary': '#00e5a0',
        'accent-secondary': '#818cf8',
        'accent-tertiary': '#fbbf24',
        'text-primary': '#ffffff',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        'border-subtle': '#1e293b',
        'border-accent': '#00e5a0',
        'success': '#22c55e',
        'danger': '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}