module.exports = {
  extends: ['penguin', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
  plugins: ['jsx-a11y'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
