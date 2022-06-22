import { version } from './version.js';

export const commitMessage = (): string =>
  [
    `Normalize the code structure with baldrick-elm version ${version}`,
    'See https://github.com/flarebyte/baldrick-elm/releases',
  ].join('\n');
