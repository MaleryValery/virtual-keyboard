module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base', // 'eslint:recommended'
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 0,
    'import/prefer-default-export': 0,
  },
};
