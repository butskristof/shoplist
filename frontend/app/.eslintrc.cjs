module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:all',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'mantine',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'eslint-config-prettier', // disables conflicting Prettier rules in ESLint
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      'node': {
        'paths': [
          'src',
        ],
        'extensions': [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },
  },
  plugins: ['react-refresh', 'import'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          // prevent using relative paths for components imports, prefer absolute with '@/'
          '../*',
          // prevent importing all of lodash, prefer using lodash/function
          '^lodash$',
        ],
      },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/newline-after-import': ['error', { count: 1 }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'no-alert': 'off',
    'no-console': [
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      {
        allow: ['error'],
      },
    ],
  },
};
