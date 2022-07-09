import { markdownToString, parseMarkdown } from './markdown.js';
import { CoreProject, MdSection } from './model.js';

const keepSections = (section: MdSection): boolean =>
  ['Overview', 'Purpose'].includes(section.title);

const codeStructure: MdSection = {
  title: 'Code structure',
  body: [
    ' - __src__: Elm source code',
    ' - __tests__: Unit and fuzz tests for Elm code',
    ' - __script__: Folder for bash, python or ts-node scripts',
    ' - __script/data__: Folder for data (YAML, JSON, ...) that should be manually edited',
    ' - __script/schema__: Folder for JSON Schemas that are used to validate data and often available in vscode',
    ' - __script/template__: Folder for handlebars templates used by the code generators',
    ' - __generated__: Folder for generated code or data (YAML, JSON, ...)',
    ' - __elm-stuff__: Temporary folder for building distribution code',
    ' - __report__: Temporary folder for reporting; usually for continuous integration',
    ' - __.github__: Folder for github pipeline',
    ' - __.vscode__: Folder for visual code snippets',
  ].join('\n\n'),
};

const docAndLinks: MdSection = {
  title: 'Useful links',
  body: [
    ' - Introduction to [Elm](https://guide.elm-lang.org/)',
    ' - [Awesome Elm](https://github.com/sporto/awesome-elm)',
    ' - [Elm patterns](https://sporto.github.io/elm-patterns/index.html)',
    ' - [Elm cheat sheet](https://github.com/izdi/elm-cheat-sheet)',
    ' - [Search Elm package](https://package.elm-lang.org/)',
    ' - [Search Elm catalog](https://korban.net/elm/catalog/)',
    ' - [Search Elm by signature](https://klaftertief.github.io/elm-search/)',
    ' - [HTML to Elm](https://html-to-elm.com/)',
  ].join('\n\n'),
};

export const toTechnicalDesignMd = (
  _core: CoreProject,
  existingMd: string
): string => {
  const existing = parseMarkdown(existingMd);

  const sections = [
    ...existing.sections.filter(keepSections),
    codeStructure,
    docAndLinks,
  ];
  const updated = {
    ...existing,
    title: 'Technical Design',
    badges: [],
    description:
      'Guide for the implementation, including detailed design, priorities, coding conventions, and testing',
    sections,
  };
  const rawReadme = markdownToString(updated);
  return rawReadme.replace(/[\n\r]{3,}/gm, '\n\n');
};
