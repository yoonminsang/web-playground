// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  [
    globalIgnores(['dist', 'node_modules']),
    {
      files: ['**/*.{ts,tsx}'],
      plugins: {
        '@tanstack/query': pluginQuery,
      },
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
        eslintConfigPrettier, // NOTE: prettier는 마지막에 추가하여 다른 설정과의 충돌 방지
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      rules: {
        // NOTE: 전체 규칙
        // 'no-console': 'warn',
        '@tanstack/query/exhaustive-deps': 'error',
      },
    },
    // NOTE: 커스텀 규칙
    // apps/ex
    // {
    //   files: ['apps/ex/src/**/*.{ts,tsx}'],
    //   rules: {
    //     'no-console': 'warn',
    //     '@typescript-eslint/no-explicit-any': 'warn',
    //     '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    //     'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    //   },
    // },
  ],
  storybook.configs['flat/recommended']
);
