import { markdownTable } from 'markdown-table';
import { cmdOptionsGenerator } from './commanding-data.js';
import { commandToMd } from './markdown.js';
import { CoreProject, MakefileCommand, MdCommand, MdPackage } from './model.js';

const baldrickScaffoldingPackage: MdPackage = {
  name: 'baldrick-elm',
  installationType: 'npm.dev',
  description: 'Elm scaffolding assistant',
  homepage: 'https://github.com/flarebyte/baldrick-elm',
  repository: {
    type: 'git',
    url: 'https://github.com/flarebyte/baldrick-elm',
  },
};

const yarnPackage: MdPackage = {
  name: 'yarn',
  installationType: 'npm.dev',
  description: 'Dependency management',
  homepage: 'https://classic.yarnpkg.com/en/',
  repository: {
    type: 'git',
    url: 'https://github.com/yarnpkg',
  },
};

const makefilePackage: MdPackage = {
  name: 'makefile',
  installationType: 'brew',
  description: 'Build management',
  homepage: 'https://opensource.com/article/18/8/what-how-makefile',
  repository: {
    type: 'git',
    url: 'https://github.com/',
  },
};

const githubPackage: MdPackage = {
  name: 'gh',
  installationType: 'brew',
  description: 'GitHub CLI brings GitHub to your terminal',
  homepage: 'https://cli.github.com/',
  repository: {
    type: 'git',
    url: 'https://github.com/cli/cli',
  },
};

const actPackage: MdPackage = {
  name: 'act',
  installationType: 'brew',
  description: 'Run GitHub Actions locally',
  homepage: 'https://github.com/nektos/act',
  repository: {
    type: 'git',
    url: 'https://github.com/nektos/act',
  },
};

const zshPackage: MdPackage = {
  name: 'zsh',
  installationType: 'brew',
  description: 'Shell designed for interactive use',
  homepage: 'https://www.zsh.org/',
  repository: {
    type: 'git',
    url: 'https://github.com/ohmyzsh',
  },
};

const analyzeCmd = (): MdCommand => ({
  name: 'analyze',
  title: 'Static code analysis',
  description: 'Find problems in Elm code',
  motivation: 'Make the code more consistent and avoid bugs',
  context: 'Before compilation',
  run: 'make analyze',
  partOf: makefilePackage,
  examples: [],
  makeLines: ['elm-analyse -s -o'],
});

const testCmd = (): MdCommand => ({
  name: 'test',
  title: 'Unit testing',
  description: 'Run the unit tests',
  motivation: 'Check that the units of code behave as intended',
  context: 'After compilation, before build',
  run: 'make test',
  partOf: makefilePackage,
  examples: [],
  makeLines: ['elm-test'],
});

const resetCmd: MdCommand = {
  name: 'reset',
  title: 'Reset distribution and report folders',
  description: 'Delete the dist and report folder',
  motivation: 'Start from a clean slate',
  context: 'Before building',
  run: 'make reset',
  partOf: makefilePackage,
  examples: [],
  makeLines: ['rm -rf elm-stuff', 'rm -rf tests/elm-stuff'],
};

const installGloballyCmd: MdCommand = {
  name: 'install-global',
  title: 'Install global dependencies',
  description: 'Install some dependencies globally',
  motivation: 'Before running most commands',
  context: 'Before building',
  run: 'make install-global',
  partOf: yarnPackage,
  examples: [],
  makeLines: [
    'yarn global add elm-format@0.8.4',
    'yarn global add elm-review',
    'yarn global add elm-upgrade',
    'yarn global add elm-doc-preview',
    'yarn global add elm-analyse',
  ],
};

const buildCmd: MdCommand = {
  name: 'build',
  title: 'Build the library',
  description: 'Transpile all the Elm source code to javascript',
  motivation: 'The code has to be build before been published',
  context: 'Before building',
  run: 'make build',
  partOf: makefilePackage,
  examples: [],
  makeLines: [],
  parentMakeTask: 'test beautify doc',
};

const docCmd: MdCommand = {
  name: 'doc',
  title: 'Generate the documentation',
  description: 'Generate the markdown documentation for the Elm project',
  motivation: 'Good documentation is essential for developer experience',
  context: 'Before publishing',
  run: 'make doc',
  partOf: makefilePackage,
  examples: [],
  makeLines: ['elm make --docs=documentation.json'],
};

const previewDocCmd: MdCommand = {
  name: 'preview-doc',
  title: 'Preview the documentation',
  description: 'Generate the markdown documentation for the Elm project',
  motivation: 'Good documentation is essential for developer experience',
  context: 'Before publishing',
  run: 'make preview-doc',
  partOf: makefilePackage,
  examples: [],
  makeLines: ['elm-doc-preview'],
};

const githubCmd: MdCommand = {
  name: 'github',
  title: 'Update github repository',
  description: 'Enable useful features for the github project repository',
  motivation: 'Create consistent settings',
  context: 'After creating',
  run: 'make github',
  partOf: githubPackage,
  examples: [],
  makeLines: ['gh repo edit --delete-branch-on-merge --enable-squash-merge'],
};

const readyCmd: MdCommand = {
  name: 'ready',
  title: 'Ready for publishing',
  description:
    'Run a sequence of commands to check that the library is ready to be published',
  motivation: 'Detect quality flaws before pushing the code',
  context: 'Before pushing a branch',
  run: 'make ready',
  partOf: makefilePackage,
  examples: [],
  parentMakeTask: 'analyze test',
  makeLines: [],
};

const mdCmd = (): MdCommand => ({
  name: 'md',
  title: 'Markdown check',
  description:
    'Checks that the markdown documents follows some consistent guidelines',
  motivation: 'Make the markdown documents consistent in style',
  context: 'Before publishing',
  run: 'make md',
  partOf: makefilePackage,
  examples: [],
  makeLines: ['markdown check', 'markdown check -s .github/'],
});

const mdFixCmd = (): MdCommand => ({
  name: 'md:fix',
  title: 'Markdown fix',
  description:
    'Modify the markdown documents to ensure they follow some consistent guidelines',
  motivation: 'Make the markdown documents consistent in style',
  context: 'Before publishing',
  run: 'make md:fix',
  partOf: makefilePackage,
  examples: [],
  makeLines: ['markdown fix', 'markdown fix -s .github/'],
});

const helpCmd: MdCommand = {
  name: 'help',
  title: 'Help for commands',
  description: 'Summarize all the yarn and shell commands',
  motivation: 'Assist the developer in quickly finding commands',
  context: 'Before running a command',
  run: 'make help',
  partOf: makefilePackage,
  examples: [],
  makeLines: ['cat commands.txt'],
};

const actCmd: MdCommand = {
  name: 'act',
  title: 'Run GitHub Actions locally',
  description: 'Run GitHub Actions inside a docker container',
  motivation: 'Test GitHub Actions locally',
  context: 'When changing github actions',
  run: 'act',
  partOf: actPackage,
  examples: [],
  makeLines: [],
};
const og = cmdOptionsGenerator;
const normCmd = (project: CoreProject): MdCommand => {
  const npmMandatoryScript = [
    'npx baldrick-elm generate',
    `-${og.feature.shortFlag}`,
    project.feature.join(' '),
    `-${og.githubAccount.shortFlag}`,
    `'${project.githubAccount}'`,
    `-${og.copyrightHolder.shortFlag}`,
    `'${project.copyrightHolder}'`,
    `-${og.copyrightStartYear.shortFlag}`,
    `${project.copyrightStartYear}`,
    `-${og.license.shortFlag}`,
    project.license,
  ];

  const codacyScript = project.codacyId
    ? [`-${og.codacyId.shortFlag}`, project.codacyId]
    : [];

  const npmScript = [...npmMandatoryScript, ...codacyScript, '&& yarn md:fix'];

  return {
    name: 'norm',
    title: global
      ? 'Normalize the code structure'
      : 'Normalize the code structure using latest',
    description: global
      ? 'Normalize the code structure using baldrick (global version)'
      : 'Normalize the code structure using baldrick (npx version)',
    motivation: 'Create a consistent developer experience',
    context: 'When changing github actions',
    run: 'make norm',
    partOf: baldrickScaffoldingPackage,
    examples: [],
    makeLines: [npmScript.join(' ')],
  };
};

const gitCommitFileCmd: MdCommand = {
  name: 'gc-file',
  title: 'Git commit from file',
  description: 'Git commit a message that has been saved in the .message file',
  motivation: 'Quicker commit for pre-defined use cases',
  context: 'When commit to github',
  run: 'gcf',
  partOf: zshPackage,
  examples: [],
  zshAlias: ['gcf', 'git add . && git commit -F .message && rm .message'],
  makeLines: [],
};

const devCommands = (): MdCommand[] => [
  actCmd,
  buildCmd,
  docCmd,
  previewDocCmd,
  githubCmd,
  analyzeCmd(),
  mdCmd(),
  mdFixCmd(),
  installGloballyCmd,
  readyCmd,
  resetCmd,
  testCmd(),
  helpCmd,
  gitCommitFileCmd,
];

const maintenanceOverview = () =>
  markdownTable([
    ['Mode', 'Code analysis', 'Testing', 'Building', 'Publishing'],
    [
      'Checking',
      analyzeCmd().run,
      `${testCmd().run}`,
      buildCmd.run,
      `${readyCmd.run}`,
    ],
    ['Fixing', 'Fix the code', `Update dependencies and ${docCmd.run}`],
    ['Continuous integration', buildCmd.run],
  ]);

export const maintenanceMd = (project: CoreProject): string => {
  const cmds = [...devCommands(), normCmd(project)];
  const cmdSections: string[] = cmds.map(commandToMd);
  return [
    '# Maintenance of the code',
    '## Overall workflow',
    'The typical developer workflow goes as follow:',
    maintenanceOverview(),
    '## Commands',
    ...cmdSections,
  ].join('\n\n');
};

const removeNulls = <S>(value: S | undefined): value is S => value != undefined;

export const getMakefileCommands = (project: CoreProject): MakefileCommand[] =>
  [...devCommands(), normCmd(project)]
    .map((cmd) =>
      cmd.makeLines.length > 0 || cmd.parentMakeTask
        ? {
            name: cmd.name,
            title: cmd.title,
            makeLines: cmd.makeLines,
            parentMakeTask: cmd.parentMakeTask,
          }
        : undefined
    )
    .filter(removeNulls);
export const getZshAliases = (): string => {
  const commands = devCommands()
    .map((cmd) => cmd.zshAlias)
    .filter(removeNulls)
    .map(([name, command]) => `alias ${name}='${command}'`);

  return commands.join('\n');
};

export const getCommandHelp = (project: CoreProject): string => {
  const commands = [...devCommands(), normCmd(project)];

  const runMaxLength = Math.max(...commands.map((cmd) => cmd.run.length));

  const helps = commands
    .map((cmd) => cmd.run.padEnd(runMaxLength + 2, ' ') + cmd.description)
    .sort();
  return ['Commands:', ...helps].join('\n');
};
