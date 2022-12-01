module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-penguin`
  extends: ['penguin'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
