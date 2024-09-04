import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    deps: {
      interopDefault: true,
    },
    coverage: {
      include: ['api/src/application/services'],
      provider: 'v8',
    },
  },
});
