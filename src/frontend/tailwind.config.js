import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                'romantic-primary': 'oklch(var(--romantic-primary) / <alpha-value>)',
                'romantic-secondary': 'oklch(var(--romantic-secondary) / <alpha-value>)',
                'romantic-accent': 'oklch(var(--romantic-accent) / <alpha-value>)',
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
                xl: 'calc(var(--radius) + 4px)',
                '2xl': 'calc(var(--radius) + 8px)',
                '3xl': 'calc(var(--radius) + 12px)'
            },
            boxShadow: {
                'romantic': '0 0 30px oklch(0.65 0.28 340 / 0.4)',
                'romantic-lg': '0 0 50px oklch(0.65 0.28 340 / 0.6)',
                'pink-glow': '0 0 40px oklch(0.70 0.30 335 / 0.5)'
            },
            keyframes: {
                heartbeat: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '10%': { transform: 'scale(1.1)' },
                    '20%': { transform: 'scale(1)' },
                    '30%': { transform: 'scale(1.15)' },
                    '40%': { transform: 'scale(1)' }
                },
                floatUp: {
                    '0%': { 
                        transform: 'translateY(100vh) rotate(0deg)',
                        opacity: '0'
                    },
                    '10%': { opacity: '0.4' },
                    '90%': { opacity: '0.4' },
                    '100%': { 
                        transform: 'translateY(-100px) rotate(360deg)',
                        opacity: '0'
                    }
                },
                sparkle: {
                    '0%, 100%': { 
                        opacity: '0',
                        transform: 'scale(0)'
                    },
                    '50%': { 
                        opacity: '1',
                        transform: 'scale(1)'
                    }
                }
            },
            animation: {
                heartbeat: 'heartbeat 1.5s ease-in-out infinite',
                floatUp: 'floatUp 5s ease-in infinite',
                sparkle: 'sparkle 2s ease-in-out infinite'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
