import tsParser from '@typescript-eslint/parser';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import jsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default [
    {
        ignores: [
            'build/**/*',
            'node_modules/**/*',
            'dist/**/*',
            '*.log',
            '.vscode/',
            '.idea/'
        ]
    },
    {
        files: ['**/*.{ts,tsx}'],
        ...reactRecommended,
        ...jsxRuntime,
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            '@typescript-eslint': tsParser,
            '@stylistic': stylistic,
            import: importPlugin
        },
        rules: {
            '@stylistic/indent': ['error', 2],
            '@stylistic/func-call-spacing': 'error',
            '@stylistic/operator-linebreak': [ 'error', 'after' ],
            '@stylistic/jsx-curly-spacing': [ 'error', {
                when: 'never',
                children: true
            } ],
            '@stylistic/brace-style': [ 'error', '1tbs', { allowSingleLine: true } ],
            '@stylistic/space-in-parens': [ 'warn', 'always' ],
            '@stylistic/array-bracket-spacing': [ 'warn', 'always', {
                objectsInArrays: true,
                arraysInArrays: true
            } ],
            '@stylistic/object-curly-newline': [ 'error', {
                ObjectExpression: { multiline: true },
                ObjectPattern: { multiline: true },
                ImportDeclaration: { multiline: true },
                ExportDeclaration: { multiline: true }
            } ],
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always'
                }
            ],
        }
    }
];