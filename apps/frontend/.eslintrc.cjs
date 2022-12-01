module.exports = {
  root: true,
  extends: ['penguin-react'],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    'react/jsx-key': 'off',
    'react/self-closing-comp': 'error',
  },
}
