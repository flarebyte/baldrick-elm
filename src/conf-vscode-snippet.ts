import { VsCodeSnippet, VsCodeSnippetObj } from './model';

const scope = 'elm,elm';

const snippets: VsCodeSnippet[] = [
  {
    scope,
    prefix: 'type alias',
    body: ['type alias Model =', '{ name : String', '}'],
    description: 'Create a type alias',
  },
];

export const vsCodeSnippets: VsCodeSnippetObj = Object.fromEntries(
  snippets.map((snippet) => [snippet.prefix, snippet])
);
