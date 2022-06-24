import { makefile } from '../src/makefile.js';
import { libCoreProject } from './fixture-core-project.js';

describe('makefile', () => {
  it('should provide a standard makefile', () => {
    const actual = makefile(libCoreProject);
    expect(actual).toMatchInlineSnapshot(`
      ".PHONY: analyze assist beautify build diff doc generate github help install install-global md md-fix norm pre-generate preview-doc ready reset reset-generated test

      # Static code analysis
      analyze: 
      	elm-analyse -s -o

      # Generate some code in the console
      assist: pre-generate
      	sh script/assist.sh

      # Beautify Elm source code
      beautify: 
      	elm-format src/ --yes
      	elm-format tests/ --yes

      # Build the library
      build: test beautify doc

      # Detects Elm code API changes
      diff: 
      	elm diff

      # Generate the documentation
      doc: 
      	elm make --docs=documentation.json

      # Generate some Elm Code
      generate: reset-generated pre-generate
      	mkdir generated
      	sh script/generate.sh
      	make beautify
      	make test

      # Update github repository
      github: 
      	gh repo edit --delete-branch-on-merge --enable-squash-merge

      # Help for commands
      help: 
      	cat commands.txt

      # Install local dependencies
      install: 
      	elm install -y
      	pushd tests && elm install -y && popd

      # Install global dependencies
      install-global: 
      	yarn global add elm-format@0.8.4
      	yarn global add elm-review
      	yarn global add elm-upgrade
      	yarn global add elm-doc-preview
      	yarn global add elm-analyse

      # Markdown check
      md: 
      	npx baldrick-dev-ts markdown check
      	npx baldrick-dev-ts markdown check -s .github/

      # Markdown fix
      md-fix: 
      	npx baldrick-dev-ts markdown fix
      	npx baldrick-dev-ts markdown fix -s .github/

      # Normalize the code structure
      norm: 
      	npx baldrick-elm generate -f lib -ga 'mycompany' -ch 'Great Company' -cy 2020 -l BSD3 && make md-fix

      # Prepare scripts for code generation
      pre-generate: 
      	npx baldrick-whisker@latest render script/data/project.json script/template/generate.hbs script/generate.sh
      	npx baldrick-whisker@latest render script/data/project.json script/template/assist.hbs script/assist.sh

      # Preview the documentation
      preview-doc: 
      	elm-doc-preview

      # Ready for publishing
      ready: analyze test

      # Reset distribution and report folders
      reset: 
      	rm -rf elm-stuff
      	rm -rf tests/elm-stuff

      # Reset generated folders
      reset-generated: 
      	rm -rf generated

      # Unit testing
      test: 
      	elm-test"
    `);
  });
});
