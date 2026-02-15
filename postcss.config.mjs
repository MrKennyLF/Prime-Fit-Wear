/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // <--- ESTO ES LO NUEVO
    autoprefixer: {},
  },
};

export default config;