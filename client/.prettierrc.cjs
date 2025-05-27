module.exports = {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'auto',
    jsxSingleQuote: false,
    proseWrap: 'always',
    quoteProps: 'as-needed',
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    importOrder: [
        '^react',
        '^next',
        '<THIRD_PARTY_MODULES>',
        '^@/(.*)$',
        '^[./]'
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true
};