# ai-keyboard (Expo app)

Expo SDK 57 / react-native app (expo-router). Repo-wide rules: see ../../AGENTS.md (loaded in every session).

## Commands (run from repo root)

- `pnpm dev:aikb:ios` / `pnpm dev:aikb:android` — build & launch the app on iOS/Android (wrap `expo run:*`; generates gitignored `ios/`/`android/` dirs via prebuild)
- `pnpm --filter ai-keyboard exec tsc --noEmit` — typecheck

## Installing Expo deps

- Install Expo deps with `pnpm --filter ai-keyboard add <pkg>@<ver>` using the version pinned in `node_modules/expo/bundledNativeModules.json` (e.g. `node -e "console.log(require('./node_modules/expo/bundledNativeModules.json')['expo-image-picker'])"`). Don't hand-pick versions and don't use `expo install` here — it falls back to npm and breaks on the `catalog:` protocol.

## Constraints & gotchas

- Never install into `packages/ai-keyboard` with npm. Expo/RN deps are hoisted to the root `node_modules`; a nested npm-created `node_modules` there shadows Metro/CocoaPods resolution and is never pruned by pnpm (no `.modules.yaml`). If a native build fails on files under `packages/ai-keyboard/node_modules/...`, that tree is stale — delete it, then `pnpm install` and re-run `pnpm dev:aikb:ios`.
- Adding a native module (expo-image-picker, expo-document-picker, etc.) needs its plugin added in `app.json` and a prebuild re-run; `pnpm dev:aikb:*` handles the regeneration automatically (incl. pod install).
- Routes are file-based (`src/app/`); platform splits use `.web.tsx`/`.web.ts` variants. The app is currently a single-screen chat UI (`src/app/index.tsx`) styled with react-native-paper (icons via `@expo/vector-icons`); AI replies are placeholder until a backend is wired up.
- Keyboard handling uses `react-native-keyboard-controller` (`KeyboardProvider` in `_layout.tsx`, its `KeyboardAvoidingView` in the chat screen) because Expo SDK 57 edge-to-edge disables Android's `adjustResize`. Don't use RN's built-in `KeyboardAvoidingView` — it's a no-op on Android here. The package has **no Expo config plugin** — it autolinks; don't add it to `plugins` in `app.json` (prebuild crashes with `Unexpected token 'typeof'` if you do).
- Camera doesn't work on the iOS Simulator (no hardware) — test it on a device.
