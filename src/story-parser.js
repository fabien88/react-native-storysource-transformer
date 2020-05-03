const defaultStoryMatcher = "(storiesOf.*?\\(.*?module\\))";

const escapeBackticks = (str) => {
  return str.replace(/\`/g, "\\`").replace(/\$/g, "\\$");
};

module.exports.decorateStory = (
  originalCode,
  storyMatcher = defaultStoryMatcher
) => {
  const regex = new RegExp(storyMatcher);
  const foundAStory = originalCode.search(regex) > 0;
  if (!foundAStory) {
    return originalCode;
  }
  const importModule =
    "import {withSource} from '@storybook/source-loader/preview';";

  const injectedSource =
    ".addDecorator(withSource(`" + escapeBackticks(originalCode) + "`))";

  const code =
    importModule + originalCode.replace(regex, "$1" + injectedSource);
  return code;
};
