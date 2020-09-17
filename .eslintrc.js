module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2020: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: { 'prettier/prettier': 'error' },
};
