import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('eslint').ESLint} */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/electron',
    'plugin:import/typescript',
    'import',
    eslintConfigPrettier,
  ],
  parser: '@typescript-eslint/parser',
}
