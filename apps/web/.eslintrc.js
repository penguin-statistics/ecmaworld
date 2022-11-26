module.exports = {
  root: true,
  extends: ['custom'],
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-key': 'off',
    'react/self-closing-comp': 'error',
  },
}
