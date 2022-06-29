import { markdownTable } from 'markdown-table';
import {
  analyzeCmd,
  testCmd,
  buildCmd,
  readyCmd,
  docCmd,
  devCommands,
  normCmd,
} from './dev-tasks.js';
import { commandToMd } from './markdown.js';
import { CoreProject, MakefileCommand } from './model.js';

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
  const cmds = [...devCommands(project), normCmd(project)];
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
  [...devCommands(project), normCmd(project)]
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
export const getZshAliases = (project: CoreProject): string => {
  const commands = devCommands(project)
    .map((cmd) => cmd.zshAlias)
    .filter(removeNulls)
    .map(([name, command]) => `alias ${name}='${command}'`);

  return commands.join('\n');
};

export const getCommandHelp = (project: CoreProject): string => {
  const commands = [...devCommands(project), normCmd(project)];

  const runMaxLength = Math.max(...commands.map((cmd) => cmd.run.length));

  const helps = commands
    .map((cmd) => cmd.run.padEnd(runMaxLength + 2, ' ') + cmd.description)
    .sort();
  return ['Commands:', ...helps].join('\n');
};
