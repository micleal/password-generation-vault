/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: true,
  tabWidth: 2,
  jsxSingleQuote: true,
  semi: false,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn'],
}
