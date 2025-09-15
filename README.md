# Baldrick-elm

![npm](https://img.shields.io/npm/v/baldrick-elm) ![Build
status](https://github.com/flarebyte/baldrick-elm/actions/workflows/main.yml/badge.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/baldrick-elm)

![npm type definitions](https://img.shields.io/npm/types/baldrick-elm)
![node-current](https://img.shields.io/node/v/baldrick-elm)
![NPM](https://img.shields.io/npm/l/baldrick-elm)


⚠️ Deprecated: baldrick-elm is no longer maintained.

Please use the in-house replacement instead:

- baldrick-broth (orchestrator): https://github.com/flarebyte/baldrick-broth
- Templates source: https://github.com/flarebyte/baldrick-reserve

Why this change

- Decouple template changes from CLI releases: templates live in baldrick-reserve so you do not need a new baldrick release for every template tweak.
- Easier local iteration: keep project-specific behavior local during development, then promote stable templates to baldrick-reserve when ready.

Legacy description

> Baldrick-elm is an Elm scaffolding assistant used to generate and normalize project files.

## Documentation and links

-   [Code Maintenance](MAINTENANCE.md)
-   [Code Of Conduct](CODE_OF_CONDUCT.md)
-   [Api for baldrick-elm](API.md)
-   [Contributing](CONTRIBUTING.md)
-   [Glossary](GLOSSARY.md)
-   [Diagram for the code base](INTERNAL.md)
-   [Vocabulary used in the code base](CODE_VOCABULARY.md)
-   [Architectural Decision Records](DECISIONS.md)
-   [Deprecation Review](DEPRECATION_REVIEW.md)
-   [Contributors](https://github.com/flarebyte/baldrick-elm/graphs/contributors)
-   [Dependencies](https://github.com/flarebyte/baldrick-elm/network/dependencies)

## Legacy Usage

To generate basic structure files:

```bash
baldrick-elm generate -f lib -ga 'mygithub' -ch 'MyCompany' -cy 2018 -l BSD3
```

Afterwards, you will need to run:

```bash
make norm
```

## Legacy Installation

This package is [ESM
only](https://blog.sindresorhus.com/get-ready-for-esm-aa53530b3f77).

```bash
yarn global add baldrick-elm
baldrick-elm --help
```

Or alternatively run it:

```bash
npx baldrick-elm --help
```

If you want to run the latest version from GitHub (for legacy maintenance only):

```bash
git clone git@github.com:flarebyte/baldrick-elm.git
yarn global add `pwd`
```
