module.exports = {
  extends: [
    'turbo',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:json/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-unused-vars': 'off',
    eqeqeq: 'error',
    'import/no-unresolved': 'error',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import', 'turbo'],
  settings: {
    typescript: true,
    node: true,
  },
}
