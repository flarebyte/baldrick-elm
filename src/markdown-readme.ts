import { markdownToString, parseMarkdown } from './markdown.js';
import { Badge, CoreProject, MdSection } from './model.js';

const capitalize = (value: string) =>
  (value[0]?.toUpperCase() || '') + value.slice(1);

const libBadges = (core: CoreProject): Badge[] => {
  const always: Badge[] = [
    {
      text: 'Status of direct dependencies',
      imageUrl: `https://reiner-dolp.github.io/elm-badges/${core.githubAccount}/${core.name}/dependencies.svg`,
      position: 'top',
    },
    {
      text: 'License of the package',
      imageUrl: `https://reiner-dolp.github.io/elm-badges/${core.githubAccount}/${core.name}/license.svg`,
      position: 'top',
    },
    {
      text: 'Latest version of the package',
      imageUrl: `https://img.shields.io/elm-package/v/${core.githubAccount}/${core.name}`,
      position: 'top',
    },
  ];
  const codacy: Badge[] = core.codacyId
    ? [
        {
          text: 'Codacy Badge',
          imageUrl: `https://app.codacy.com/project/badge/Grade/${core.codacyId}`,
          position: 'top',
          refUrl: `https://www.codacy.com/gh/${core.githubAccount}/${core.name}/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=${core.githubAccount}/${core.name}&amp;utm_campaign=Badge_Grade`,
        },
      ]
    : [];
  return [...always, ...codacy];
};

const keepSections = (section: MdSection): boolean =>
  ['Usage', 'Advanced use', 'Acknowledgements', 'Model'].includes(
    section.title
  );

const docAndLinks = (core: CoreProject): MdSection => ({
  title: 'Documentation and links',
  body: [
    '* [Code Maintenance](MAINTENANCE.md)',
    '* [Code Of Conduct](CODE_OF_CONDUCT.md)',
    '* [Contributing](CONTRIBUTING.md)',
    '* [Glossary](GLOSSARY.md)',
    '* [Vocabulary used in the code base](CODE_VOCABULARY.md)',
    '* [Architectural Decision Records](DECISIONS.md)',
    '* [Internationalization](INTERNATIONALIZATION.md)',
    '* [Accessibility](ACCESSIBILITY.md)',
    '* [Code generation](CODE_GENERATION.md)',
    `* [Contributors](https://github.com/${core.githubAccount}/${core.name}/graphs/contributors)`,
    `* [Dependencies](https://github.com/${core.githubAccount}/${core.name}/network/dependencies)`,
  ].join('\n'),
});

const installSection = (core: CoreProject): MdSection => {
  const body = [
    '```bash',
    `elm install ${core.githubAccount}/${core.name}`,
    '```',
  ];

  return {
    title: 'Installation',
    body: [...body].join('\n'),
  };
};

export const toReadmeMd = (core: CoreProject, existingMd: string): string => {
  const existing = parseMarkdown(existingMd);
  const title = capitalize(core.name);
  const badges = libBadges(core);
  const sections = [
    ...existing.sections.filter(keepSections),
    docAndLinks(core),
    installSection(core),
  ];
  const updated = {
    ...existing,
    title,
    badges,
    sections,
  };
  const rawReadme = markdownToString(updated);
  return rawReadme.replace(/[\n\r]{3,}/gm, '\n\n');
};
