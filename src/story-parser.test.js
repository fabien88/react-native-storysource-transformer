const { decorateStory } = require("./story-parser");

describe("decorate nicely", () => {
  test("with very simple story", () => {
    expect(
      decorateStory(`
      storiesOf('Welcome', module);`)
    ).toBe(`import {withSource} from '@storybook/source-loader/preview';
      storiesOf('Welcome', module).addDecorator(withSource(\`
      storiesOf('Welcome', module);\`));`);
  });
  test("with very strange simple story", () => {
    expect(
      decorateStory(`
      storiesOf   (   'Welcome',    module);`)
    ).toBe(`import {withSource} from '@storybook/source-loader/preview';
      storiesOf   (   'Welcome',    module).addDecorator(withSource(\`
      storiesOf   (   'Welcome',    module);\`));`);
  });
  test("with typical story", () => {
    expect(
      decorateStory(`
        import React from 'react';

        import {storiesOf} from '@storybook/react-native';
        import {linkTo} from '@storybook/addon-links';
        import Welcome from '.';

        storiesOf('Welcome', module).add('to Storybook', () => (
          <Welcome showApp={linkTo('Button')} />
        ));`)
    ).toBe(`import {withSource} from '@storybook/source-loader/preview';
        import React from 'react';

        import {storiesOf} from '@storybook/react-native';
        import {linkTo} from '@storybook/addon-links';
        import Welcome from '.';

        storiesOf('Welcome', module).addDecorator(withSource(\`
        import React from 'react';

        import {storiesOf} from '@storybook/react-native';
        import {linkTo} from '@storybook/addon-links';
        import Welcome from '.';

        storiesOf('Welcome', module).add('to Storybook', () => (
          <Welcome showApp={linkTo('Button')} />
        ));\`)).add('to Storybook', () => (
          <Welcome showApp={linkTo('Button')} />
        ));`);
  });
});

describe("don't decorate", () => {
  test("when story is not found", () => {
    const src = `
        import React from 'react';

        import {storiesOf} from '@storybook/react-native';
        import {linkTo} from '@storybook/addon-links';
        import Welcome from '.';

        add('to Storybook', () => (
          <Welcome showApp={linkTo('Button')} />
        ));`;
    expect(decorateStory(src)).toBe(src);
  });
});
