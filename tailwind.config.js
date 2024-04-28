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
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        info: generatePrimaryColors('#1A365D'),
        danger: generatePrimaryColors('#63171B'),
        primary: generatePrimaryColors('#A34343'),
        warning: generatePrimaryColors('#652B19'),
        success: generatePrimaryColors('#1C4532'),
        secondary: generatePrimaryColors('#1A1F2E'),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [import('tailwindcss-animate'), import('@tailwindcss/forms')],
};
