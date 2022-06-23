import { getMakefileCommands } from './markdown-maintenance.js';
import { CoreProject, MakefileCommand } from './model.js';

const toMakeCommand = (command: MakefileCommand): string => {
  const body: string[] = command.makeLines.map((line) => `	${line}`);
  const lines: string[] = [
    `# ${command.title}`,
    `${command.name}:${command.parentMakeTask || ''}`,
    ...body,
  ];
  return lines.join('\n');
};

const make = (proj: CoreProject): string => {
  const commands = getMakefileCommands(proj);
  return commands.map(toMakeCommand).join('\n\n');
};

export const makefile = (proj: CoreProject) => make(proj);
