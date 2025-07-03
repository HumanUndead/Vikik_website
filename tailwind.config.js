module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // darkMode: false,
  theme: {
  	screens: {
  		sm: '480px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1500px',
  		'3xl': '1780px'
  	},
  	extend: {
  		colors: {
  			body: '#5A5A5A',
  			heading: '#212121',
  			input: 'hsl(var(--input))',
  			black: '#000',
  			white: '#fff',
  			linen: '#FBF1E9',
  			linenSecondary: '#ECE7E3',
  			olive: '#3D9970',
  			maroon: '#B03060',
  			brown: '#C7844B',
  			placeholder: '#707070',
  			borderBottom: '#f7f7f7',
  			facebook: '#4267B2',
  			facebookHover: '#395fad',
  			google: '#4285F4',
  			googleHover: '#307bf9',
  			gray: {
  				'50': '#FBFBFB',
  				'100': '#F1F1F1',
  				'150': '#F4F4F4',
  				'200': '#F9F9F9',
  				'300': '#E6E6E6',
  				'350': '#E9ECEF',
  				'400': '#999999',
  				'500': '#D8D8D8',
  				'600': '#3A3A3A',
  				'700': '#292929',
  				'800': '#707070',
  				'900': '#343D48'
  			},
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
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			'10px': '.625rem'
  		},
  		spacing: {
  			'430px': '430px',
  			'450px': '450px',
  			'500px': '500px',
  			'64vh': '64vh'
  		},
  		minHeight: {
  			'50px': '50px'
  		},
  		scale: {
  			'80': '0.8',
  			'85': '0.85',
  			'300': '3',
  			'400': '4'
  		},
  		animation: {
  			shine: 'shine 1s',
  			shineRTL: 'shineRTL 1s ease-out',
  			fadeIn: 'fadeIn 1s ease-in-out',
  			slideInLeft: 'slideInLeft 1s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			shine: {
  				'100%': {
  					left: '125%'
  				}
  			},
  			shineRTL: {
  				'0%': {
  					transform: 'translateX(100%)',
  					opacity: 0
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: 1
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: 0
  				},
  				'100%': {
  					opacity: 1
  				}
  			},
  			slideInLeft: {
  				'0%': {
  					transform: 'translateX(-100%)',
  					opacity: 0
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: 1
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
  		backgroundImage: {
  			'app-pattern': 'url(/assets/images/app-pattern.png)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	boxShadow: {
  		cart: '0 3px 6px rgba(0,0,0,0.12)',
  		product: '0 6px 12px rgba(0,0,0,.08)',
  		listProduct: '0 2px 4px rgba(0,0,0,.08)',
  		navigation: '0 3px 6px rgba(0, 0, 0, 0.16)',
  		navigationReverse: '0 -3px 6px rgba(0, 0, 0, 0.16)',
  		header: '0 2px 3px rgba(0, 0, 0, 0.08)',
  		vendorCard: '1px 1px 4px rgba(0, 0, 0, 0.12)',
  		vendorCardHover: '0 6px 18px rgba(0, 0, 0, 0.12)',
  		subMenu: '1px 2px 3px rgba(0, 0, 0, 0.08)',
  		bottomNavigation: '0 -2px 3px rgba(0, 0, 0, 0.06)',
  		cookies: '0 -2px 3px rgba(0, 0, 0, 0.04)',
  		avatar: '0px 15px 30px rgba(0, 0, 0, 0.16)'
  	},
  	fontFamily: {
  		body: [
  			'Open Sans',
  			'sans-serif'
  		],
  		satisfy: [
  			'Satisfy',
  			'cursive'
  		],
  		segoe: [
  			'Segoe UI',
  			'sans-serif'
  		]
  	}
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    // require("tailwindcss-animate"),
  ],
};
