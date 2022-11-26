module.exports = {
  extends: [
    "turbo",
    "prettier",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "no-unused-vars": "off",
    eqeqeq: "error",
  },
  plugins: ["@typescript-eslint", "prettier", "import"],
};
