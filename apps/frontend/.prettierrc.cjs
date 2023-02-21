module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  arrowParens: 'always',
  importOrder: [
    '^@.*/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^(src)',
    '^[./].*(?<![.]css)$',
    '^[./].*(?<=[.]css)$',
  ],
  importOrderParserPlugins: [
    'typescript',
    'jsx',
    'classProperties',
    'decorators-legacy',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
