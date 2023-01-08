/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: 'rgb(var(--bg-primary))', secondary: 'var(--bg-secondary)'
      },
      textColor: { primary: 'var(--text-primary)', secondary: 'var(--text-secondary)' },
      colors: {
        "highlight-green": 'var(--highlight-green)',
        "highlight-yellow": 'var(--highlight-yellow)',
        "highlight-rose": 'var(--highlight-rose)',
        'bg-primary': 'rgb(var(--bg-primary))'
      },
      fontFamily: {
        "mono": ["Space Mono", 'monospace']
      }
    },
  },
  plugins: [require("daisyui")],
}
