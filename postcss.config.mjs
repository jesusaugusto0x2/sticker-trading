const config = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: ['./app/globals.css'],
    },
    'postcss-custom-media': {},
    '@tailwindcss/postcss': {},
  },
};

export default config;
