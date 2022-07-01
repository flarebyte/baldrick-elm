import jetpack from 'fs-jetpack';
import { toReadmeMd } from './markdown-readme.js';
import { CoreProject, GenerateActionOpts, RunnerContext } from './model.js';
import {
  getCommandHelp,
  getZshAliases,
  maintenanceMd,
} from './markdown-maintenance.js';
import { licenseMd } from './markdown-license.js';
import { toTechnicalDesignMd } from './markdown-technical-design.js';
import { commitMessage } from './commit-message.js';
import { glossaryMd } from './markdown-glossary.js';
import { computeCoreProject } from './compute-core-project.js';
import { makefile } from './makefile.js';
import { FSJetpack } from 'fs-jetpack/types.js';

export const toJsonString = (value: object): string => {
  return JSON.stringify(value, undefined, 2);
};

const createWorkspace = (core: CoreProject): FSJetpack =>
  core.currentDir ? jetpack.cwd(core.currentDir) : jetpack.cwd('.');

const readReadme = async (workspace: FSJetpack): Promise<string> => {
  try {
    return (await workspace.readAsync('./README.md', 'utf8')) || '';
  } catch {
    return '';
  }
};

const writeReadme = async (workspace: FSJetpack, core: CoreProject) => {
  const existingReadme = await readReadme(workspace);
  const newReadme = toReadmeMd(core, existingReadme);
  await workspace.writeAsync('./README.md', newReadme);
};

const readTechnicalDesign = async (workspace: FSJetpack): Promise<string> => {
  try {
    return (await workspace.readAsync('./TECHNICAL_DESIGN.md', 'utf8')) || '';
  } catch {
    return '';
  }
};

const writeTechnicalDesign = async (
  workspace: FSJetpack,
  core: CoreProject
) => {
  const existingTechnicalDesign = await readTechnicalDesign(workspace);
  const newTechnicalDesign = toTechnicalDesignMd(core, existingTechnicalDesign);
  await workspace.writeAsync('./TECHNICAL_DESIGN.md', newTechnicalDesign);
};

const writeMaintenance = async (workspace: FSJetpack, proj: CoreProject) => {
  await workspace.writeAsync('./MAINTENANCE.md', maintenanceMd(proj));
};

const writeLicense = async (workspace: FSJetpack, proj: CoreProject) => {
  await workspace.writeAsync('./LICENSE', licenseMd(proj));
};

const writeMakefile = async (workspace: FSJetpack, proj: CoreProject) => {
  await workspace.writeAsync('./Makefile', makefile(proj));
};

const createSourceDir = async (workspace: FSJetpack) => {
  await workspace.dir('src');
  await workspace.dir('test');
};

const appendCommitMessage = async (workspace: FSJetpack) => {
  await workspace.append('.message', commitMessage());
};

const writeZshAlias = async (workspace: FSJetpack, core: CoreProject) => {
  await workspace.writeAsync('.aliases.zsh', getZshAliases(core));
};

const writeCommandHelp = async (workspace: FSJetpack, core: CoreProject) => {
  await workspace.writeAsync('commands.txt', getCommandHelp(core));
};

const writeGlossary = async (workspace: FSJetpack) => {
  await workspace.writeAsync('GLOSSARY.md', glossaryMd());
};

export const updateAll = async (
  ctx: RunnerContext,
  opts: GenerateActionOpts
) => {
  try {
    const coreProject = computeCoreProject(ctx, opts);
    const workspace = createWorkspace(coreProject);
    await writeReadme(workspace, coreProject);
    await createSourceDir(workspace);
    await writeMaintenance(workspace, coreProject);
    await writeTechnicalDesign(workspace, coreProject);
    await writeLicense(workspace, coreProject);
    await writeMakefile(workspace, coreProject);
    await writeZshAlias(workspace, coreProject);
    await writeCommandHelp(workspace, coreProject);
    await writeGlossary(workspace);
    await appendCommitMessage(workspace);
  } catch (error) {
    ctx.errTermFormatter({
      title: 'Generating - update error',
      detail: error,
    });
    throw error;
  }
};
