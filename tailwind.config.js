const generatePrimaryColors = (baseColor) => {
  // Convert hexadecimal to RGB
  const r = parseInt(baseColor.substring(1, 3), 16);
  const g = parseInt(baseColor.substring(3, 5), 16);
  const b = parseInt(baseColor.substring(5, 7), 16);

  const colors = {};
  const steps = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50]; // Reversed steps

  steps.forEach((step, index) => {
    // Adjust brightness by interpolating between base color and white
    const factor = index / (steps.length - 1); // Adjust factor calculation
    const primaryR = Math.round(r + (255 - r) * factor);
    const primaryG = Math.round(g + (255 - g) * factor);
    const primaryB = Math.round(b + (255 - b) * factor);

    // Convert RGB to hexadecimal
    const primaryColor = `#${primaryR.toString(16)}${primaryG.toString(
      16
    )}${primaryB.toString(16)}`;

    // Store the generated color
    colors[step] = primaryColor.toUpperCase();
  });

  return colors;
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
  	fontFamily: {
  		cursive: [
  			'Klee One',
  			'cursive'
  		],
  		sans: [
  			'Poppins',
  			'sans-serif'
  		]
  	},
  	screens: {
  		xs: '320px',
  		sm: '576px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px'
  	},
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			info: '#1A365D',
  			danger: '#63171B',
  			primary: '#FE7134',
  			warning: '#652B19',
  			success: '#1C4532',
  			secondary: '#151E3F',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
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
  plugins: [import('tailwindcss-animate'), import('@tailwindcss/forms')],
};
