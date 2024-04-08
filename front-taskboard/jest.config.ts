export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  //   // process `*.tsx` files with `ts-jest`
  // },

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  env: {
                    // Replicate as .env.local
                    VITE_API_URL: 'http://localhost:3000',
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },

  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
  },
};
