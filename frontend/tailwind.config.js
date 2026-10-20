/** @type {import('tailwindcss').Config} */
module.exports = {
    // `overline` is a Tailwind utility; without this an app's own eyebrow-label class draws a line above the text.
    blocklist: ["overline"],
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        display: ['"Figtree"', 'sans-serif'],
        sans: ['"Figtree"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      colors: {
        ink: '#16213A',
        slate: '#5A6B8C',
        bubble: '#FFC2D6',
        lilac: '#DCC9F7',
        peach2: '#FFD5A8',
        mint: '#BEEBC5',
        rose: '#FFB7B0',
        aqua: '#A9E4F2',
        lemon: '#FFE59B',
        fox: '#FF6A2E',
        paper: '#F7F6F3',
        sheet: '#FFFFFF',
        coal: '#111110',
        ash: '#6B6A66',
        line: '#E3E1DB',
        navy: '#0B1320',
        brand: '#FF5A1F',
        mute: '#6B7280',
        blush: '#FFF7F0',
        ok: '#12B76A',
        void: '#0A0A0B',
        panel: '#111113',
        raised: '#17171A',
        volt: '#3DDC97',
        canvas: '#F4F3F0',
        ink: '#1C1917',
        soft: 'rgba(28,25,23,0.62)',
        peach: '#F8C9AE',
        tint: '#FDF6F1',
        cream: '#FFFBF2',
        cocoa: '#2A2421',
        leaf: '#4FB286',
        honey: '#E8B04A',
        ember: '#D9534F',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};