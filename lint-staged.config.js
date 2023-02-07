/**
 * @see https://github.com/okonet/lint-staged
 */
module.exports = {
    '*.{ts,tsx},!(*test).{ts,tsx}': ['pnpm run --silent format:fix', 'pnpm run --silent lint:fix', 'git add'],
    '*.{js,json,css}': ['pnpm run --silent format:fix', 'git add']
};
