import { findHeader, findQuote, stringBetween } from '../src/utils.js';
describe('Utility', () => {
  it('Extract string in between', () => {
    expect(stringBetween('![', ']')('')).toEqual('');
    expect(
      stringBetween(
        '![',
        ']'
      )('![npm](https://img.shields.io/npm/v/scratchbook)')
    ).toEqual('npm');
    expect(
      stringBetween(
        '(',
        ')'
      )('![npm](https://img.shields.io/npm/v/scratchbook)')
    ).toEqual('https://img.shields.io/npm/v/scratchbook');
    expect(
      stringBetween('(', ')')('![npm]https://img.shields.io/npm/v/scratchbook)')
    ).toEqual('');
    expect(
      stringBetween('(', ')')('![npm](https://img.shields.io/npm/v/scratchbook')
    ).toEqual('');
  });

  it('Find headers', () => {
    expect(
      findHeader('## ')(['not header', '## header', 'after-header'])
    ).toEqual('header');
    expect(
      findHeader('## ')(['not header', 'still-no-header', 'after-header'])
    ).toEqual('');
  });
  it('Find quote', () => {
    expect(findQuote(['not quote', '> quote', 'after-quote'])).toEqual('quote');
    expect(
      findQuote(['not quote', '> quote 1', '> quote 2', 'after-quote'])
    ).toEqual('quote 1 quote 2');
    expect(findQuote(['not quote', 'still-no-quote', 'after-quote'])).toEqual(
      ''
    );
  });
});
