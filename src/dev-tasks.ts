import { cmdOptionsGenerator } from './commanding-data.js';
import { CoreProject, MdCommand, MdPackage } from './model.js';

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
const elmPackage: MdPackage = {
  name: 'elm',
  installationType: 'npm.dev',
  description: 'Dependency management',
  homepage: 'https://guide.elm-lang.org/install/elm.html',
  repository: {
    type: 'git',
    url: 'https://github.com/elm',
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
export const analyzeCmd = (): MdCommand => ({
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
const beautifyCmd: MdCommand = {
  name: 'beautify',
  title: 'Beautify Elm source code',
  description:
    'Formats Elm source code according to a standard set of rules based on the official Elm Style Guide',
  motivation: 'Make the code more consistent and avoid bugs',
  context: 'Before compilation',
  run: 'make beautify',
  partOf: makefilePackage,
  examples: [],
  makeLines: ['elm-format src/ --yes', 'elm-format tests/ --yes'],
};
const diffCmd: MdCommand = {
  name: 'diff',
  title: 'Detects Elm code API changes',
  description: 'See what changed in the package between versions',
  motivation:
    'Sometimes a MAJOR change is not actually very big, so this can help you plan your upgrade timelines',
  context: 'Before compilation',
  run: 'make diff',
  partOf: elmPackage,
  examples: [],
  makeLines: ['elm diff'],
};
const resetGeneratedCmd: MdCommand = {
  name: 'reset-generated',
  title: 'Reset generated folders',
  description: 'Delete the generated folder',
  motivation: 'Start generation from a clean slate',
  context: 'Before generation',
  run: 'make reset-generated',
  partOf: makefilePackage,
  examples: [],
  makeLines: ['rm -rf generated'],
};
const preGenerateCmd: MdCommand = {
  name: 'pre-generate',
  title: 'Prepare scripts for code generation',
  description: 'Generate the scripts used for code generation',
  motivation:
    'The generation scripts contain a fair amount of boilerplate code that can be easily generated',
  context: 'Before generation',
  run: 'make pre-generate',
  partOf: zshPackage,
  examples: [],
  makeLines: [
    'npx baldrick-whisker@latest render script/data/project.json script/template/generate.hbs script/generate.sh',
    'npx baldrick-whisker@latest render script/data/project.json script/template/assist.hbs script/assist.sh',
  ],
};
const generateCmd: MdCommand = {
  name: 'generate',
  title: 'Generate some Elm Code',
  description: 'Generate some of the boilerplate code for the Elm project',
  motivation: 'Standardize and boost the development process',
  context: 'When changing model',
  run: 'make generate',
  partOf: zshPackage,
  examples: [],
  makeLines: [
    'mkdir generated',
    'sh script/generate.sh',
    'make beautify',
    'make test',
  ],
  parentMakeTask: 'reset-generated pre-generate',
};
const assistCmd: MdCommand = {
  name: 'assist',
  title: 'Generate some code in the console',
  description:
    'Generate some of the boilerplate code that has to be manually added',
  motivation: 'Boost the development process with contextual snippets',
  context: 'When changing model',
  run: 'make assist',
  partOf: zshPackage,
  examples: [],
  makeLines: ['sh script/assist.sh'],
  parentMakeTask: 'pre-generate',
};
export const testCmd = (): MdCommand => ({
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
const installCmd: MdCommand = {
  name: 'install',
  title: 'Install local dependencies',
  description: 'Install some dependencies',
  motivation: 'Before running most commands',
  context: 'Before building',
  run: 'make install',
  partOf: elmPackage,
  examples: [],
  makeLines: ['elm make', 'pushd tests && elm make && popd'],
};
export const buildCmd: MdCommand = {
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
export const docCmd: MdCommand = {
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
export const readyCmd: MdCommand = {
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
  makeLines: [
    'npx baldrick-dev-ts markdown check',
    'npx baldrick-dev-ts markdown check -s .github/',
  ],
});
const mdFixCmd = (): MdCommand => ({
  name: 'md-fix',
  title: 'Markdown fix',
  description:
    'Modify the markdown documents to ensure they follow some consistent guidelines',
  motivation: 'Make the markdown documents consistent in style',
  context: 'Before publishing',
  run: 'make md-fix',
  partOf: makefilePackage,
  examples: [],
  makeLines: [
    'npx baldrick-dev-ts markdown fix',
    'npx baldrick-dev-ts markdown fix -s .github/',
  ],
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

const whiskerNormCmd = (project: CoreProject): MdCommand => {
  const { githubAccount, copyrightHolder } = project;
  const codeOfConduct = JSON.stringify({ githubAccount, copyrightHolder });
  return {
    name: 'whisker-norm',
    title: 'Normalize the project with baldrick-whisker',
    description: 'Generate some scaffolding using some handlebars templates',
    motivation: 'Externalize scaffolding outside close source code',
    context: 'Before running normalization',
    run: 'make whisker-norm',
    partOf: makefilePackage,
    examples: [],
    makeLines: [
      'mkdir -p .vscode',
      'mkdir -p .github/workflows',
      'mkdir -p .github/ISSUE_TEMPLATE',
      'mkdir -p src',
      'mkdir -p tests',
      'mkdir -p script',
      'mkdir -p script/data',
      'mkdir -p script/schema',
      'mkdir -p script/template',
      'test -f "elm.json" || npx baldrick-whisker@latest object elm.json github:flarebyte:baldrick-reserve:data/elm/src-elm.json',
      'test -f "tests/elm-package.json" || npx baldrick-whisker@latest object tests/elm-package.json github:flarebyte:baldrick-reserve:data/elm/test-elm.json',
      'test -f ".vscode/settings.json" || npx baldrick-whisker@latest object .vscode/settings.json github:flarebyte:baldrick-reserve:data/elm/vscode-settings.json',
      'test -f "script/data/project.json" || npx baldrick-whisker@latest object script/data/project.json github:flarebyte:baldrick-reserve:data/elm/project.json',
      'npx baldrick-whisker@latest object --no-ext .vscode/baldrick.code-snippets.json github:flarebyte:baldrick-reserve:data/elm/snippet.yaml',
      'npx baldrick-whisker@latest object .github/ISSUE_TEMPLATE/bug_report.yaml github:flarebyte:baldrick-reserve:data/elm/bug-report.yaml',
      'npx baldrick-whisker@latest object .github/ISSUE_TEMPLATE/feature_request.yaml github:flarebyte:baldrick-reserve:data/elm/feature-request.yaml',
      'npx baldrick-whisker@latest object .github/workflows/main.yml github:flarebyte:baldrick-reserve:data/elm/workflow-main.yml',
      'npx baldrick-whisker@latest object script/schema/project.schema.json github:flarebyte:baldrick-reserve:data/elm/project.schema.json',
      `npx baldrick-whisker@latest render elm.json github:flarebyte:baldrick-reserve:template/code-of-conduct.hbs CODE_OF_CONDUCT.md --config '${codeOfConduct}'`,
      `npx baldrick-whisker@latest render --no-ext elm.json github:flarebyte:baldrick-reserve:template/elm/gitignore.hbs .gitignore.sh`,
      `npx baldrick-whisker@latest render --no-ext elm.json github:flarebyte:baldrick-reserve:template/editorconfig.hbs .editorconfig.sh`,
      `npx baldrick-whisker@latest render elm.json github:flarebyte:baldrick-reserve:template/elm/contributing.hbs CONTRIBUTING.md`,
      `npx baldrick-whisker@latest render elm.json github:flarebyte:baldrick-reserve:template/elm/pull-request-template.hbs .github/pull_request_template.md`,
      `npx baldrick-whisker@latest render github:flarebyte:baldrick-reserve:data/glossary.yaml github:flarebyte:baldrick-reserve:template/glossary.hbs GLOSSARY.md`,
    ],
  };
};
const og = cmdOptionsGenerator;
export const normCmd = (project: CoreProject): MdCommand => {
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

  const makeScript = [...npmMandatoryScript, ...codacyScript, '&& make md-fix'];

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
    makeLines: [makeScript.join(' ')],
    parentMakeTask: 'whisker-norm',
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
export const devCommands = (project: CoreProject): MdCommand[] => [
  actCmd,
  buildCmd,
  docCmd,
  previewDocCmd,
  githubCmd,
  analyzeCmd(),
  beautifyCmd,
  diffCmd,
  mdCmd(),
  mdFixCmd(),
  installCmd,
  installGloballyCmd,
  readyCmd,
  resetCmd,
  testCmd(),
  helpCmd,
  gitCommitFileCmd,
  resetGeneratedCmd,
  preGenerateCmd,
  generateCmd,
  assistCmd,
  whiskerNormCmd(project),
];
