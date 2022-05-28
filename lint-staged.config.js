module.exports = {
  "**/*.ts": () => "pnpm type-check",
  "**/*.(ts|js)": (filenames) =>
    `pnpm lint --cache --fix . ${filenames.join(" ")}`,
  "**/*.{js,ts,css,md}": "prettier --write",
};
