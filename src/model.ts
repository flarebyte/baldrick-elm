export const minimumNodeVersion = 14;

export interface Repository {
  type: string;
  url: string;
}

export interface Scripts {
  [key: string]: string;
}

type ProjectType = 'lib';

export type SupportedFeature = ProjectType | 'no:test';

export interface GenerateActionOpts {
  feature: SupportedFeature[];
  name?: string;
  bin?: string;
  license: string;
  githubAccount: string;
  copyrightHolder?: string;
  copyrightStartYear: number;
  codacyId?: string;
  currentDir?: string;
}

export interface GenerateRawOpts {
  feature: string[];
  name?: string;
  bin?: string;
  license: string;
  githubAccount: string;
  copyrightHolder?: string;
  copyrightStartYear: string;
  codacyId?: string;
  currentDir?: string;
}

export interface CmdOptionsGenerator {
  feature: CmdOption;
  name: CmdOption;
  bin: CmdOption;
  license: CmdOption;
  githubAccount: CmdOption;
  copyrightHolder: CmdOption;
  copyrightStartYear: CmdOption;
  codacyId: CmdOption;
  currentDir: CmdOption;
}

export interface CoreProject extends GenerateActionOpts {
  name: string;
  bin: string;
  copyrightHolder: string;
  copyrightEndYear: number;
}

type BadgePosition = 'top' | 'bottom';

export interface Badge {
  text: string;
  imageUrl: string;
  position: BadgePosition;
  refUrl?: string;
}

export interface MdSection {
  title: string;
  body: string;
}

export interface MdDocument {
  title: string;
  description: string;
  badges: Badge[];
  mainSection: string;
  sections: MdSection[];
}

export type InstallationType = 'npm.dev' | 'npm.bin' | 'brew';

export interface MdPackage {
  name: string;
  description: string;
  homepage: string;
  repository: Repository;
  installationType: InstallationType;
}

export interface MdCommand {
  name: string;
  title: string;
  /**
   * What this tool is providing
   */
  description: string;
  /**
   * Why we should use this tool
   */
  motivation: string;
  /**
   * When we should use this tool
   */
  context: string;
  partOf: MdPackage;
  /**
   * Main command to run this tool
   */
  run: string;
  /**
   * Ways to run this tools with additional parameters
   */
  examples: string[];

  /**
   * Makefile script
   */
  makeLines: string[];

  /**
   * The parent task if any for the make file
   */
  parentMakeTask?: string;

  /**
   * The zsh alias that should be run if any
   * [name, command]
   */
  zshAlias?: [string, string];
}

export type MakefileCommand = Pick<
  MdCommand,
  'name' | 'title' | 'parentMakeTask' | 'makeLines'
>;
export interface VsCodeSnippet {
  scope: string;
  prefix: string;
  body: string | string[];
  description: string;
}

export interface VsCodeSnippetObj {
  [key: string]: VsCodeSnippet;
}

export interface CmdOption {
  shortFlag: string;
  longFlag: string;
  description: string;
  defaultValue?: string | string[];
  choices: string[];
  mandatory: boolean;
  variadic: boolean;
}
type TermFormatterKind = 'intro' | 'info';
export type TermFormatterFormat = 'default' | 'human';

export interface TermFormatterParams {
  title: string;
  detail: string | object;
  kind: TermFormatterKind;
  format: TermFormatterFormat;
}

export interface ErrTermFormatterParams {
  title: string;
  detail: unknown;
}

export type TermFormatter = (params: TermFormatterParams) => void;

export type ErrTermFormatter = (params: ErrTermFormatterParams) => void;

export interface RunnerContext {
  currentPath: string;
  currentYear: number;
  termFormatter: TermFormatter;
  errTermFormatter: ErrTermFormatter;
}

export type GenerateAction = (
  ctx: RunnerContext,
  options: GenerateActionOpts
) => Promise<void>;
