import jetpack from 'fs-jetpack';
import YAML from 'yaml';
import { codeOfConductMd } from './markdown-code-of-conduct.js';
import { contributingMd } from './markdown-contributing.js';
import { toReadmeMd } from './markdown-readme.js';
import { CoreProject, GenerateActionOpts, RunnerContext } from './model.js';
import {
  getCommandHelp,
  getZshAliases,
  maintenanceMd,
} from './markdown-maintenance.js';
import { gitIgnoreConfig } from './conf-git-ignore.js';
import { defaultGithubWorkflow } from './conf-workflow.js';
import { pullRequestMd } from './markdown-pull-request.js';
import { featureRequest } from './yaml-feature-request.js';
import { bugReport } from './yaml-bug-report.js';
import { editorConfig } from './conf-editor-config.js';
import { vsCodeSnippets } from './conf-vscode-snippet.js';
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

export const toYamlString = (value: object): string => {
  return YAML.stringify(value);
};

const createWorkspace = (core: CoreProject): FSJetpack =>
  core.currentDir ? jetpack.cwd(core.currentDir) : jetpack.cwd('.');

const readReadme = async (workspace: FSJetpack): Promise<string> => {
  try {
    return (await workspace.read('./README.md', 'utf8')) || '';
  } catch {
    return '';
  }
};

const writeReadme = async (workspace: FSJetpack, core: CoreProject) => {
  const existingReadme = await readReadme(workspace);
  const newReadme = toReadmeMd(core, existingReadme);
  await workspace.write('./README.md', newReadme);
};

const readTechnicalDesign = async (workspace: FSJetpack): Promise<string> => {
  try {
    return (await workspace.read('./TECHNICAL_DESIGN.md', 'utf8')) || '';
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
  await workspace.write('./TECHNICAL_DESIGN.md', newTechnicalDesign);
};

const writeCodeOfConducts = async (workspace: FSJetpack, proj: CoreProject) => {
  await workspace.write('./CODE_OF_CONDUCT.md', codeOfConductMd(proj));
};

const writeContributing = async (workspace: FSJetpack) => {
  await workspace.write('./CONTRIBUTING.md', contributingMd);
};

const writeMaintenance = async (workspace: FSJetpack, proj: CoreProject) => {
  await workspace.write('./MAINTENANCE.md', maintenanceMd(proj));
};

const writeGitIgnore = async (workspace: FSJetpack) => {
  await workspace.write('.gitignore', gitIgnoreConfig);
};

const writeEditorConfig = async (workspace: FSJetpack) => {
  await workspace.write('.editorconfig', editorConfig);
};

const writeLicense = async (workspace: FSJetpack, proj: CoreProject) => {
  await workspace.write('./LICENSE', licenseMd(proj));
};

const writeMakefile = async (workspace: FSJetpack, proj: CoreProject) => {
  await workspace.write('./Makefile', makefile(proj));
};
const createGithubWorkflowDir = async (workspace: FSJetpack) => {
  await mkdir('.github/workflows', { recursive: true });
  await mkdir('.github/ISSUE_TEMPLATE', { recursive: true });
};

const writeWorkflowConfig = async (workspace: FSJetpack, core: CoreProject) => {
  await workspace.write(
    '.github/workflows/main.yml',
    toYamlString(defaultGithubWorkflow(core)),
    'utf8'
  );
};

const writePullRequestMd = async (workspace: FSJetpack) => {
  await workspace.write('.github/pull_request_template.md', pullRequestMd);
};

const writeFeatureRequestYaml = async (workspace: FSJetpack) => {
  await workspace.write(
    '.github/ISSUE_TEMPLATE/feature_request.yaml',
    toYamlString(featureRequest)
  );
};

const writeBugReportYaml = async (workspace: FSJetpack) => {
  await workspace.write(
    '.github/ISSUE_TEMPLATE/bug_report.yaml',
    toYamlString(bugReport),
    'utf8'
  );
};

const createVisualCodeDir = async (workspace: FSJetpack) => {
  await mkdir('.vscode', { recursive: true });
};

const writeVsCodeSnippets = async (workspace: FSJetpack) => {
  await workspace.write(
    '.vscode/baldrick.code-snippets',
    toJsonString(vsCodeSnippets),
    'utf8'
  );
};

const createSourceDir = async (workspace: FSJetpack) => {
  await mkdir('src', { recursive: true });
  await mkdir('test', { recursive: true });
};

const appendCommitMessage = async (workspace: FSJetpack) => {
  await workspace.append('.message', commitMessage());
};

const writeZshAlias = async (workspace: FSJetpack) => {
  await workspace.write('.aliases.zsh', getZshAliases());
};

const writeCommandHelp = async (workspace: FSJetpack, core: CoreProject) => {
  await workspace.write('commands.txt', getCommandHelp(core));
};

const writeGlossary = async (workspace: FSJetpack) => {
  await workspace.write('GLOSSARY.md', glossaryMd());
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
    await writeCodeOfConducts(workspace, coreProject);
    await writeContributing(workspace);
    await writeMaintenance(workspace, coreProject);
    await writeTechnicalDesign(workspace, coreProject);
    await writeGitIgnore(workspace);
    await writeEditorConfig(workspace);
    await writeLicense(workspace, coreProject);
    await writeMakefile(workspace, coreProject);
    await createGithubWorkflowDir(workspace);
    await writeWorkflowConfig(workspace, coreProject);
    await writePullRequestMd(workspace);
    await writeFeatureRequestYaml(workspace);
    await writeBugReportYaml(workspace);
    await createVisualCodeDir(workspace);
    await writeVsCodeSnippets(workspace);
    await writeZshAlias(workspace);
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
