module.exports = {
  // Run type-check on changes to TypeScript files
  "**/*.ts": () => "pnpm type-check",
  // Run ESLint on changes to JavaScript/TypeScript files
  "**/*.(ts|js)": (filenames) =>
    `pnpm lint --cache --fix . ${filenames.join(" ")}`,
  "**/*.{js,ts,css,md}": "prettier --write",
};
