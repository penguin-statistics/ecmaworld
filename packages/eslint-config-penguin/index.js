module.exports = {
  extends: [
    'turbo',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    'no-unused-vars': 'off',
    eqeqeq: 'error',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', 'turbo'],
}
