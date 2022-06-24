import { getMakefileCommands } from './markdown-maintenance.js';
import { CoreProject, MakefileCommand } from './model.js';

const sortedByName = (
  a: { name: string },
  b: { name: string }
): number => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
};

const toMakeCommand = (command: MakefileCommand): string => {
  const body: string[] = command.makeLines.map((line) => `	${line}`);
  const lines: string[] = [
    `# ${command.title}`,
    `${command.name}: ${command.parentMakeTask || ''}`,
    ...body,
  ];
  return lines.join('\n');
};

const toMakePhonyHeader = (commands: MakefileCommand[]): string => {
  return '.PHONY: ' + commands.map((cmd) => cmd.name).join(' ');
};

const make = (proj: CoreProject): string => {
  const commands = getMakefileCommands(proj).sort(sortedByName);
  const commandsTask = commands.map(toMakeCommand);
  const phonyHeader = toMakePhonyHeader(commands);
  return [phonyHeader, ...commandsTask].join('\n\n');
};

export const makefile = (proj: CoreProject) => make(proj);
