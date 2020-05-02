const semver = require("semver");
const reactNativeVersionString = require("react-native/package.json").version;
const reactNativeMinorVersion = semver(reactNativeVersionString).minor;

const { fileMatch } = require("./matcher");
const { decorateStory } = require("./story-parser");

const packageName = "react-native-storysource-transformer";

let pck;

try {
  pck = require("../package.json");
} catch (error) {
  console.warn(error);
  console.warn(
    `[${packageName}] We couldn't find config in your package.json - using default config`
  );
}

const config = (pck && pck.config && pck.config[packageName]) || {};

const { filePatterns, storyMatcher } = config;

let upstreamTransformer = null;

if (reactNativeMinorVersion >= 59) {
  upstreamTransformer = require("metro-react-native-babel-transformer");
} else if (reactNativeMinorVersion >= 56) {
  upstreamTransformer = require("metro/src/reactNativeTransformer");
}

module.exports.transform = (options) => {
  if (!fileMatch(options.filename, filePatterns)) {
    return upstreamTransformer.transform(options);
  }
  return upstreamTransformer.transform({
    ...options,
    src: decorateStory(options.src, storyMatcher),
  });
};
