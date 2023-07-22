module.exports = {
  extends: ['penguin', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
  plugins: ['jsx-a11y'],
  rules: {
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['.', 'node_modules'],
      },
    },
  },
}
