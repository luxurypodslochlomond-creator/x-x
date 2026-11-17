import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: { alias: { 'npm:vitest@1.6.1': fileURLToPath(new URL('../../../../node_modules/vitest/dist/index.js', import.meta.url)) } },
  test: {
    include: ['base44/shared/checkerInvitation.test.ts'],
    environment: 'node',
    poolOptions: { threads: { singleThread: true } },
  },
});