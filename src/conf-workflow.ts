import { CoreProject } from './model.js';

export const defaultGithubWorkflow = (proj: CoreProject) => ({
  name: 'CI',
  on: ['push'],
  jobs: {
    build: {
      name: 'Build, lint, and test ${{ matrix.os }}',
      'runs-on': '${{ matrix.os }}',
      strategy: {
        matrix: {
          os: ['ubuntu-latest', 'macOS-latest'],
        },
      },
      steps: [
        {
          name: 'Checkout repo',
          uses: 'actions/checkout@v2',
        },
        {
          name: 'Use Elm',
          uses: 'jorelali/setup-elm@v3',
          with: {
            'elm-version': '0.19.1',
          },
        },
        {
          name: 'Installation',
          run: 'elm install -y',
        },
        {
          name: 'Installation for tests',
          run: 'pushd tests && elm install -y && popd',
        },
        {
          name: 'Test',
          run: proj.feature.includes('no:test')
            ? 'elm-test || echo "Some unit tests failed"'
            : 'elm-test',
        },
      ],
    },
  },
});
