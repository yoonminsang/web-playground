// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default tseslint.config(
  [
    globalIgnores(['dist', 'node_modules']),
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      rules: {
        // NOTE: 전체 규칙
        // 'no-console': 'warn',
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
