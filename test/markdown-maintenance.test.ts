import {
  getCommandHelp,
  getMakefileCommands,
  getZshAliases,
  maintenanceMd,
} from '../src/markdown-maintenance.js';
import { libCoreProject } from './fixture-core-project.js';

describe('Maintenance documentation', () => {
  it('normalizes MAINTENANCE.md', () => {
    expect(maintenanceMd(libCoreProject)).toMatchSnapshot();
  });

  it('produces a list of npm scripts', () => {
    expect(getMakefileCommands(libCoreProject)).toMatchSnapshot();
  });

  it('produces a list of zsh aliases', () => {
    expect(getZshAliases(libCoreProject)).toMatchInlineSnapshot(
      `"alias gcf='git add . && git commit -F .message && rm .message'"`
    );
  });

  it('produces an help for the commands', () => {
    expect(getCommandHelp(libCoreProject)).toMatchInlineSnapshot(`
      "Commands:
      act                   Run GitHub Actions inside a docker container
      gcf                   Git commit a message that has been saved in the .message file
      make analyze          Find problems in Elm code
      make assist           Generate some of the boilerplate code that has to be manually added
      make beautify         Formats Elm source code according to a standard set of rules based on the official Elm Style Guide
      make big-test         Run browser tests
      make build            Transpile all the Elm source code to javascript
      make diff             See what changed in the package between versions
      make doc              Generate the markdown documentation for the Elm project
      make generate         Generate some of the boilerplate code for the Elm project
      make github           Enable useful features for the github project repository
      make help             Summarize all the yarn and shell commands
      make install          Install some dependencies
      make install-global   Install some dependencies globally
      make md               Checks that the markdown documents follows some consistent guidelines
      make md-fix           Modify the markdown documents to ensure they follow some consistent guidelines
      make norm             Normalize the code structure using baldrick (global version)
      make pre-generate     Generate the scripts used for code generation
      make preview-doc      Generate the markdown documentation for the Elm project
      make pull             Run some code that we should do just before a release
      make ready            Run a sequence of commands to check that the library is ready to be published
      make reset            Delete the dist and report folder
      make reset-generated  Delete the generated folder
      make test             Run the unit tests
      make whisker-norm     Generate some scaffolding using some handlebars templates"
    `);
  });
});
