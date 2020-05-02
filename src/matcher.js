const { isMatch } = require("micromatch");

const defaultGlobs = [
  "**/*.stories.{js,ts}{x,}",
  "**/stories/index.{j,t}s{x,}",
];
const format = (str) => str.replace(/^\.\//, "");

module.exports.fileMatch = (fileName, globs = defaultGlobs) => {
  return isMatch(fileName, globs, { format, dot: true });
};
