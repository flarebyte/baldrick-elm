import { commitMessage } from '../src/commit-message.js';

describe('commit-message', () => {
  it('should provide a commit message', () => {
    const actual = commitMessage();
    expect(actual).toMatchInlineSnapshot(`
      "Normalize the code structure with baldrick-elm version 0.7.0
      See https://github.com/flarebyte/baldrick-elm/releases"
    `);
  });
});
