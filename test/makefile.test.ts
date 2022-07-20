import { makefile } from '../src/makefile.js';
import { libCoreProject } from './fixture-core-project.js';

describe('makefile', () => {
  it('should provide a standard makefile', () => {
    const actual = makefile(libCoreProject);
    expect(actual).toMatchInlineSnapshot(`
      ".PHONY: analyze assist beautify big-test build diff doc generate github help install install-global md md-fix norm pre-generate preview-doc pull ready reset reset-generated test whisker-norm

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
      	test -d demo/ && elm-format demo/ --yes

      # Run the bigger tests suite
      big-test: test
      	npx baldrick-whisker@latest render script/data/project.yaml script/template/big-test.hbs script/big-test.sh
      	sh script/big-test.sh

      # Build the library
      build: test beautify doc
      	npx baldrick-whisker@latest render script/data/project.yaml script/template/build.hbs script/build.sh
      	sh script/build.sh

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
      	make md-fix

      # Update github repository
      github: 
      	gh repo edit --delete-branch-on-merge --enable-squash-merge

      # Help for commands
      help: 
      	cat commands.txt

      # Install local dependencies
      install: 
      	elm make
      	pushd tests && elm make && popd

      # Install global dependencies
      install-global: 
      	yarn global add elm-format@0.8.4
      	yarn global add elm-review
      	yarn global add elm-upgrade
      	yarn global add elm-doc-preview
      	yarn global add elm-analyse
      	yarn global add elm-test

      # Markdown check
      md: 
      	npx baldrick-dev-ts@latest markdown check
      	npx baldrick-dev-ts@latest markdown check -s .github/

      # Markdown fix
      md-fix: 
      	npx baldrick-dev-ts@latest markdown fix
      	npx baldrick-dev-ts@latest markdown fix -s .github/

      # Normalize the code structure
      norm: whisker-norm
      	npx baldrick-elm@latest generate -f lib -ga 'mycompany' -ch 'Great Company' -cy 2020 -l BSD3
      	make md-fix

      # Prepare scripts for code generation
      pre-generate: 
      	npx baldrick-whisker@latest render script/data/project.yaml script/template/generate.hbs script/generate.sh
      	npx baldrick-whisker@latest render script/data/project.yaml script/template/assist.hbs script/assist.sh

      # Preview the documentation
      preview-doc: 
      	elm-doc-preview

      # Prepare for pull request
      pull: 
      	npx baldrick-whisker@latest render script/data/project.yaml script/template/pull.hbs script/pull.sh
      	sh script/pull.sh

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
      	elm-test

      # Normalize the project with baldrick-whisker
      whisker-norm: 
      	mkdir -p script
      	test -f \\"elm.json\\" || npx baldrick-whisker@latest object elm.json github:flarebyte:baldrick-reserve:data/elm/src-elm.json
      	npx baldrick-whisker@latest render elm.json github:flarebyte:baldrick-reserve:template/elm/normalize.hbs script/normalize.sh --config '{\\"githubAccount\\":\\"mycompany\\",\\"copyrightHolder\\":\\"Great Company\\"}'
      	sh script/normalize.sh
      	npx baldrick-whisker@latest render elm.json github:flarebyte:baldrick-reserve:template/code-of-conduct.hbs CODE_OF_CONDUCT.md --config '{\\"githubAccount\\":\\"mycompany\\",\\"copyrightHolder\\":\\"Great Company\\"}'"
    `);
  });
});
