const { fileMatch } = require("./matcher");
describe("glob match", () => {
  test("with js, jsx, ts and tsx files", () => {
    const globs = ["**/*.stories.{j,t}s{x,}", "**/stories/index.{j,t}s{x,}"];

    expect(fileMatch("./src/components/button.js", globs)).toBe(false);
    expect(fileMatch("./src/components/button.jsx", globs)).toBe(false);
    expect(fileMatch("./src/components/button.ts", globs)).toBe(false);
    expect(fileMatch("./src/components/button.tsx", globs)).toBe(false);

    expect(fileMatch("./src/components/button.stories.js", globs)).toBe(true);
    expect(fileMatch("./src/components/button.stories.jsx", globs)).toBe(true);
    expect(fileMatch("./src/components/button.stories.ts", globs)).toBe(true);
    expect(fileMatch("./src/components/button.stories.tsx", globs)).toBe(true);

    expect(fileMatch("./storybook/stories/index.js", globs)).toBe(true);
    expect(fileMatch("./storybook/stories/index.jsx", globs)).toBe(true);
    expect(fileMatch("./storybook/stories/index.ts", globs)).toBe(true);
    expect(fileMatch("./storybook/stories/index.tsx", globs)).toBe(true);

    expect(fileMatch("storybook/stories/index.js", globs)).toBe(true);
    expect(fileMatch("src/components/button.js", globs)).toBe(false);
  });
});
