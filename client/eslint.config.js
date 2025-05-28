import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import stylistic from '@stylistic/eslint-plugin'
import reactPlugin from 'eslint-plugin-react';


export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
          ecmaFeatures: {
              jsx: true
          }
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      '@stylistic': stylistic,
      react: reactPlugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
        "semi": ["error", "never"],
        "no-extra-semi": "error",
        'unused-imports/no-unused-imports': 'warn',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',

        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/react-in-jsx-scope": "off",
        "react/jsx-indent": ["error", 2],
        "react/jsx-indent-props": ["error", 2],
        "react/jsx-closing-tag-location": "error",
        "react/jsx-equals-spacing": ["error", "never"],
        "react/jsx-key": "error",
        "react/jsx-no-target-blank": "warn",
        "react/no-unescaped-entities": "warn",
        "react/no-children-prop": "error",
        "react/prop-types": "warn",
        "react/jsx-props-no-spreading": "off",
        "react/self-closing-comp": "error",
        'react/jsx-curly-spacing': ['error', {
            when: 'never',
            children: true,
            spacing: { objectLiterals: 'never' }
        }],

        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true
            }
        ],
        '@typescript-eslint/no-empty-object-type': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/array-type': [ 'error', { default: 'generic' } ],
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/comma-dangle': 'off',

        '@stylistic/comma-dangle': ['error', 'never'],
        '@stylistic/comma-spacing': ['error', { before: false, after: true }],
        '@stylistic/object-curly-spacing': ['error', 'always'],
        '@stylistic/type-generic-spacing': 'error',
        '@stylistic/type-annotation-spacing': 'error',
        '@stylistic/brace-style': [ 'error', '1tbs', { allowSingleLine: true } ],
        '@stylistic/space-in-parens': [ 'warn', 'always' ],
        '@stylistic/array-bracket-spacing': [ 'warn', 'always', {
            objectsInArrays: true,
            arraysInArrays: true
        } ],
        '@stylistic/max-len': [ 'error', {
            code: 150,
            ignoreUrls: true,
            ignoreComments: true
        } ],
        '@stylistic/jsx-curly-spacing': ['error', {
            when: 'never',
            children: true,
            spacing: {
                objectLiterals: 'never'
            }
        }],
        '@stylistic/func-call-spacing': 'error',
        '@stylistic/operator-linebreak': [ 'error', 'after' ],
        '@stylistic/object-curly-newline': [ 'error', {
            ObjectExpression: { multiline: true },
            ObjectPattern: { multiline: true },
            ImportDeclaration: { multiline: true },
            ExportDeclaration: { multiline: true }
        } ],
        '@stylistic/jsx-one-expression-per-line': 'off',

    },
      settings: {
          react: {
              version: "detect"
          }
      }
  },
)
