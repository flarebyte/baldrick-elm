import { makefile } from '../src/makefile.js';
import { libCoreProject } from './fixture-core-project.js';

describe('makefile', () => {
  it('should provide a standard makefile', () => {
    const actual = makefile(libCoreProject);
    expect(actual).toMatchInlineSnapshot(`
      "# Build the library
      build:test beautify doc

      # Generate the documentation
      doc:
      	elm make --docs=documentation.json

      # Preview the documentation
      preview-doc:
      	elm-doc-preview

      # Update github repository
      github:
      	gh repo edit --delete-branch-on-merge --enable-squash-merge

      # Static code analysis
      analyze:
      	elm-analyse -s -o

      # Markdown check
      md:
      	markdown check
      	markdown check -s .github/

      # Markdown fix
      md:fix:
      	markdown fix
      	markdown fix -s .github/

      # Install global dependencies
      install-global:
      	yarn global add elm-format@0.8.4
      	yarn global add elm-review
      	yarn global add elm-upgrade
      	yarn global add elm-doc-preview
      	yarn global add elm-analyse

      # Ready for publishing
      ready:analyze test

      # Reset distribution and report folders
      reset:
      	rm -rf elm-stuff
      	rm -rf tests/elm-stuff

      # Unit testing
      test:
      	elm-test

      # Help for commands
      help:
      	cat commands.txt

      # Normalize the code structure
      norm:
      	npx baldrick-elm generate -f lib -ga 'mycompany' -ch 'Great Company' -cy 2020 -l MIT && yarn md:fix"
    `);
  });
});
