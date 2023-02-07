# Knowledge Hub extension by SAP
<img align="left" style="padding-right:10px" src="./docs/resources/knowledge-hub-logo.svg"/> 
Knowledge Hub is an open source Visual Studio Code extension maintained by SAP that aggregates developer resources (tutorials, blogs, and more) in the user's IDE. 
<br clear="left"/>
<br/>

## Description

This project is intended bring together both the internal and external SAP development communities to build and improve on an extension that provides streamlined access to a wide variety of development resources. Our goal is help our users understand what is possible with their SAP projects and then help them implement it.

## Requirements

Ensure that the minimum system requirements for installing Visual Studio Code is met. For more information, see [Requirements for Visual Studio Code](https://code.visualstudio.com/docs/supporting/requirements).

## Development Setup

### Install `pnpm` globally

To install `pnpm` globally using `npm`, run the following:
```shell
npm install -g pnpm
```

More information on pnpm installation options can be found [here](https://pnpm.io/installation).
### Install dependencies
To install `dependencies` and `devDependencies`, run following command at root of the repository:

```shell
pnpm install
```
### Build packages

To transpile the packages, run the following command at the root of the repository or in the individual package:

```shell
pnpm build
```

### Format sources using `prettier`

To format sources, run the following command at the root of the repository or in the individual package:

```shell
pnpm format
```

### Run linting of sources using `eslint`

To run linting of sources, run the following command at the root of the repository or in the individual package:

```shell
pnpm lint
```

To fix linting errors that can be fixed automatically, run the following command at the root of the repository or in the individual package:

```shell
pnpm lint:fix
```

### Run unit tests in packages

To run unit tests using `jest`, run the following command at the root of the repository or in the individual package:

```shell
pnpm test
```
**Note**: if the test run fails due to dependency issues, run `pnpm install && pnpm build` in the root of the repository again to make sure all projects are up-to-date.

### Debug packages
When analyzing a problem, it is helpful to be able to debug the modules. How to debug them depends on the IDE you are using. In this section, it is described how you could debug with VSCode. 

Each of the packages has an extensive set of unit tests covering as many as possible different scenarios, therefore, as a starting point for debugging, it is a good idea to use the tests. The easiest (but not the only) way to debug a specific test in VSCode is to open a `JavaScript Debug Terminal` and then go to the package that needs to be debugged. Using the debug terminal, execute all tests with `pnpm test` or a specific one, e.g. execute `pnpm test -- test/basic.test.ts` in the `fiori-freestyle-writer` directory (`./packages/fiori-freestyle-writer`). When running either of the commands in the debug terminal, breakpoints set in VSCode will be active.

Additionally for the `*-writer` modules it is sometimes helpful to manually inspect the generated output of the unit tests on the filesystem. This can be achieved by setting the variable `UX_DEBUG` before running the tests e.g. in `fiori-freestyle-writer` run `UX_DEBUG=true pnpm test` and after the tests finish, the generated files can be found at `./test/test-output`.

### Create changesets for feature or bug fix branches

A [changeset](https://github.com/atlassian/changesets) workflow has been setup to version and publish packages to npmjs.com. To create changesets in a feature or bug fix branch, run one of the following commands:

```shell
pnpm cset
```

```shell
pnpm changeset
```

This command brings up an [inquirer.js](https://github.com/SBoudrias/Inquirer.js/) style command line interface with prompts to capture changed packages, bump versions (patch, minor or major) and a message to be included in the changelog files. The changeset configuration files in the `.changeset` folder at the root need to be committed and pushed to the branch. These files will be used in the GitHub Actions workflow to bump versions and publish the packages.

The general recommendation is to run this changeset command after a feature or bug fix is completed and before creating a pull request. 

A GitHub bot [changeset-bot](https://github.com/apps/changeset-bot) has been enabled that adds a comment to pull requests with changeset information from the branch and includes a warning when no changesets are found.

## Contributing

Contribution and feedback are encouraged and always welcome. For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](CONTRIBUTING.md).

## Code of Conduct

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone. By participating in this project, you agree to abide by its [Code of Conduct](CODE_OF_CONDUCT.md) at all times.

## Licensing

Copyright (2022) SAP SE or an SAP affiliate company and `knowledge-hub-extension` contributors. Please see our [LICENSE](LICENSE) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available [via the REUSE tool](https://api.reuse.software/info/github.com/SAP/knowledge-hub-extension).

## Download & Installation

The Knowledge Hub extension by SAP will be available for download via the VS Code Marketplace. It will also be available for download for SAP Business Application Studio.

## Known Issues

https://github.com/SAP/knowledge-hub-extension/issues?q=is%3Aopen+is%3Aissue+label%3Abug

## How to obtain support

This project is open to feature requests/suggestions, bug reports etc. via [GitHub issues](https://github.com/SAP/knowledge-hub-extension/issues). 

