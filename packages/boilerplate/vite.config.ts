/// <reference types="vitest/config" />
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
      {
        extends: true,
        test: {
          globals: true,
          name: 'unit-tests',
          include: ['**/*.{test,spec}.{js,ts,tsx}'], // 일반 테스트 파일들
          exclude: [
            '**/node_modules/**', // node_modules 제외
            '**/*.stories.{js,ts,tsx}', // 스토리 파일 제외
            '**/dist/**', // 빌드 결과물 제외
            '**/build/**', // 빌드 결과물 제외
          ],
          environment: 'jsdom', // React 컴포넌트 테스트시 필요
          setupFiles: ['./src/test/setup.ts'],
        },
      },
    ],
  },
});
