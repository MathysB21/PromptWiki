/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			satoshi: ['Satoshi', 'sans-serif'],
  			inter: ['Inter', 'sans-serif']
  		},
  		colors: {
  			'primary-orange': '#FF5722',
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
  		animation: {
  			'infinite-scroll': 'infinite-scroll 22s linear infinite',
  			'text-appear': 'text-appear 0.15s ease',
  			'table-pinned-shadow': 'table-pinned-shadow cubic-bezier(0, 0, 1, 0)',
  			'caret-blink': 'caret-blink 1s ease-out infinite',
  			'pulse-scale': 'pulse-scale 6s ease-out infinite',
  			'gradient-move': 'gradient-move 5s linear infinite',
  			'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  			'fade-in': 'fade-in 0.2s ease-out forwards',
  			'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-right-fade': 'slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-down-fade': 'slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-left-fade': 'slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-in-from-right': 'slide-in-from-right 0.2s ease',
  			'slide-out-to-right': 'slide-out-to-right 0.2s ease',
  			'enter-from-right': 'enter-from-right 0.15s ease',
  			'enter-from-left': 'enter-from-left 0.15s ease',
  			'exit-to-right': 'exit-to-right 0.15s ease',
  			'exit-to-left': 'exit-to-left 0.15s ease',
  			'scale-in-content': 'scale-in-content 0.2s ease',
  			'scale-out-content': 'scale-out-content 0.2s ease',
  			'accordion-down': 'accordion-down 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  			'accordion-up': 'accordion-up 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  			wiggle: 'wiggle 0.75s infinite',
  			spinner: 'spinner 1.2s linear infinite',
  			blink: 'blink 1.4s infinite both',
  			pulse: 'pulse 1s linear infinite alternate'
  		},
  		keyframes: {
  			'infinite-scroll': {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(-150%)'
  				}
  			},
  			'text-appear': {
  				'0%': {
  					opacity: '0',
  					transform: 'rotateX(45deg) scale(0.95)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'rotateX(0deg) scale(1)'
  				}
  			},
  			'table-pinned-shadow': {
  				'0%': {
  					filter: 'drop-shadow(rgba(0, 0, 0, 0.1) -2px 10px 6px)'
  				},
  				'100%': {
  					filter: 'drop-shadow(rgba(0, 0, 0, 0) -2px 10px 6px)'
  				}
  			},
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '0'
  				},
  				'20%,50%': {
  					opacity: '1'
  				}
  			},
  			'pulse-scale': {
  				'0%': {
  					transform: 'scale(0.8)',
  					opacity: '0'
  				},
  				'30%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'scale(2)',
  					opacity: '0'
  				}
  			},
  			'gradient-move': {
  				'0%': {
  					backgroundPosition: '0% 50%'
  				},
  				'100%': {
  					backgroundPosition: '200% 50%'
  				}
  			},
  			'scale-in': {
  				'0%': {
  					transform: 'scale(0.95)'
  				},
  				'100%': {
  					transform: 'scale(1)'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'slide-up-fade': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(var(--offset, 2px))'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-right-fade': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(var(--offset, -2px))'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-down-fade': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(var(--offset, -2px))'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-left-fade': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(var(--offset, 2px))'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-in-from-right': {
  				'0%': {
  					transform: 'translateX(100%)'
  				},
  				'100%': {
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-out-to-right': {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			'enter-from-right': {
  				'0%': {
  					transform: 'translateX(200px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			'enter-from-left': {
  				'0%': {
  					transform: 'translateX(-200px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			'exit-to-right': {
  				'0%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translateX(200px)',
  					opacity: '0'
  				}
  			},
  			'exit-to-left': {
  				'0%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translateX(-200px)',
  					opacity: '0'
  				}
  			},
  			'scale-in-content': {
  				'0%': {
  					transform: 'rotateX(-30deg) scale(0.9)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'rotateX(0deg) scale(1)',
  					opacity: '1'
  				}
  			},
  			'scale-out-content': {
  				'0%': {
  					transform: 'rotateX(0deg) scale(1)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'rotateX(-10deg) scale(0.95)',
  					opacity: '0'
  				}
  			},
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
  			},
  			wiggle: {
  				'0%, 100%': {
  					transform: 'translateX(0%)',
  					transformOrigin: '50% 50%'
  				},
  				'15%': {
  					transform: 'translateX(-4px) rotate(-4deg)'
  				},
  				'30%': {
  					transform: 'translateX(6px) rotate(4deg)'
  				},
  				'45%': {
  					transform: 'translateX(-6px) rotate(-2.4deg)'
  				},
  				'60%': {
  					transform: 'translateX(2px) rotate(1.6deg)'
  				},
  				'75%': {
  					transform: 'translateX(-1px) rotate(-0.8deg)'
  				}
  			},
  			spinner: {
  				'0%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0'
  				}
  			},
  			blink: {
  				'0%': {
  					opacity: '0.2'
  				},
  				'20%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0.2'
  				}
  			},
  			pulse: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			}
  		},
  		dropShadow: {
  			'card-hover': ["0 8px 12px #222A350d", "0 32px 80px #2f30370f"]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}