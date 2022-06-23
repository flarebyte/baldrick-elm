import { getMakefileCommands } from './markdown-maintenance.js';
import { CoreProject } from './model.js';

const make = (proj: CoreProject): string => {
  const commands = getMakefileCommands(proj);
  return commands
    .map((cmd) => `${cmd.name}:${cmd.parentMakeTask || ''}`)
    .join('\n\n');
};

export const makefile = (proj: CoreProject) => make(proj);
