# alwinsden-unified-ui

Cross-platform UI packages for the web applications and the Expo React Native
application. The platform packages intentionally share component contracts,
but their implementations remain separate.

## Packages

- `@alwinsden-unified-ui/core` — platform-neutral types and design tokens.
- `@alwinsden-unified-ui/web-ui` — React DOM components.
- `@alwinsden-unified-ui/react-native-ui` — React Native components.

## Commands

Run from the repository root:

- `pnpm --filter @alwinsden-unified-ui/core typecheck`
- `pnpm --filter @alwinsden-unified-ui/core build`
- `pnpm --filter @alwinsden-unified-ui/web-ui typecheck`
- `pnpm --filter @alwinsden-unified-ui/web-ui build`
- `pnpm --filter @alwinsden-unified-ui/react-native-ui typecheck`
- `pnpm --filter @alwinsden-unified-ui/react-native-ui build`

## Rules

- Keep shared code free of DOM and React Native imports.
- Keep web and React Native implementations in their own packages.
- Keep React and React Native as peer dependencies so consuming apps provide
  the runtime.
- Use React Native Paper components for all React Native UI implementations.
- Keep React Native Paper as a peer dependency of the React Native UI package;
  consuming apps provide the Paper provider and theme.
- Build output is generated in each package's ignored `dist/` directory.
- Preserve matching public props between platform implementations where a
  component represents the same UI concept.
