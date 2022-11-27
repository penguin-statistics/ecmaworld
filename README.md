# Penguin Statistics - ECMAWorld

A monorepo for everything related with ECMAScript (JavaScript) at Penguin Statistics! _What an ECMAWorld we live in._

## Apps and Packages

### Apps

- `apps/widget`: The widget app for Penguin Statistics.
- `apps/frontend`: The v4 frontend app for Penguin Statistics.

### Packages

- `packages/coredata`: A data layer for using Penguin Statistics dataset with minimum integration effort.
- `packages/uikit`: A set of reusable UI components across different projects, such as the widget and main site.
- `packages/preferences`: A user preference access layer for all projects to access user data reliably and easily.
- `packages/meta`: Metadata, commonly used constants, conversions and utils for all projects.
- `packages/design`: Palette, typography, design assets and other shared visual resources for all projects.
- `packages/telemetry`: Third-party integrations and telemetry/tracing tools abstraction layer.
- `packages/widget`: A ready to integrate, Penguin Statistics Widget implementation in React (without actual ReactDOM rendering: left for `apps/widget`).
- `packages/widget-loader`: A lightweight loader for the Penguin Statistics Widget, ready to be embedded in any website.

### Source-related Tools

- `packages/eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `packages/tsconfig`: `tsconfig.json`s used throughout the monorepo

## Development

### Develop

To develop all apps and packages, run the following command:

```bash
npm run dev
```

### Build

To build all apps and packages, run the following command:

```bash
npm run build
```

## Useful Links

Learn more about Turborepo, the monorepo tool used in this project: [Documentation](https://turbo.build/repo/docs) / [CLI Usage](https://turbo.build/docs/reference/command-line-reference)

## License

[MIT](LICENSE)

## Security

If you found a vulnerability in such repository, please send an email to the project owner, Alviss_Reimu (`alvissreimu at gmail`). We would like to kindly ask you to not disclose about the detail of the vulnerability to the public before we have released a fix. Thanks for making Penguin Statistics a better site ;)
