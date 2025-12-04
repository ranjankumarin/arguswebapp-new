/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'slide-up': 'slide-up 0.4s ease-out',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },

  theme: {
    extend: {
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-extra-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1s steps(2, start) infinite',
        'blink-slow': 'blink 2s steps(2, start) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#e11d48",
          "primary-dark": "#b91c1c",
          "bg-dark": "#1f2937",
          "secondary": "#f3f4f6",
          "secondary-dark": "#d1d5db",
          "accent": "#ef4444",
          "accent-dark": "#991b1b",
          "neutral": "#3b82f6",
          "neutral-dark": "#1e40af",
          "base-100": "#ffffff",
          "base-100-dark": "#111827",
          "info": "#2563eb",
          "info-dark": "#1e3a8a",
          "success": "#15803d",
          "success-dark": "#065f46",
          "warning": "#f59e0b",
          "warning-dark": "#b45309",
          "error": "#dc2626",
          "error-dark": "#991b1b"
        }
      },
    ],
  },
  plugins: [require('daisyui')],
};
