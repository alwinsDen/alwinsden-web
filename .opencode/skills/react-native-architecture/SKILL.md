---
name: react-native-architecture
description: Use when changing packages/ai-keyboard or building React Native chat features; keep screens thin and separate presentation, stateful business logic, domain types, and platform/services across focused files.
---

# React Native Architecture

Use this skill for `packages/ai-keyboard`. Do not continue growing a single
screen file when a feature contains state, async behavior, domain decisions,
or multiple UI regions.

## Structure

Prefer feature-oriented separation:

```text
packages/ai-keyboard/src/
  app/                 # expo-router route entry points; composition only
  features/chat/
    components/        # chat-specific presentational components
    hooks/             # stateful chat behavior and event handlers
    model/             # chat types, constants, pure domain helpers
    services/          # picker/API adapters; no JSX
  components/          # reusable app-wide UI
  constants/           # theme and shared static values
  services/            # app-wide integrations
```

The exact folders may be smaller for a simple feature, but keep boundaries
clear. Do not create a file merely to move one trivial line of JSX.

## Screen Responsibilities

Route files such as `src/app/index.tsx` should primarily:

- Compose the screen from feature components.
- Connect navigation and providers.
- Pass data and callbacks into presentational components.
- Avoid picker permissions, timers, message mutation, model selection logic,
  and other business rules.

Extract a component when it represents a meaningful visual region, such as a
sidebar, composer, message list, model picker, attachment preview, or upgrade
banner.

## Business Logic

- Put chat state and actions in a hook such as `features/chat/hooks/use-chat.ts`.
- Put attachment and message types in `features/chat/model/types.ts`.
- Put model definitions and selection rules in the feature model layer.
- Put camera, library, file picker, and future API calls behind service
  functions. Services return data or errors and do not render UI.
- Keep pure transformations and validation side-effect free and easy to test.
- Keep temporary placeholder behavior behind the same service or hook boundary
  that the real backend will use later.

## React Native Rules

- Keep the app dark-mode only. Do not reintroduce color-scheme switching.
- Preserve `KeyboardProvider` and `react-native-keyboard-controller` for
  keyboard avoidance; do not replace it with React Native's built-in
  `KeyboardAvoidingView`.
- Keep platform-specific behavior in `.native`, `.ios`, `.android`, or `.web`
  files when it genuinely differs. Do not branch on `Platform.OS` throughout
  presentation components.
- Prefer existing React Native Paper primitives and the project theme over
  new styling systems.
- Use controlled props and callbacks for presentational components. A UI
  component should not know how permissions, storage, or API requests work.

## Refactoring Workflow

Before adding significant behavior:

1. Identify the visual regions and the state/actions they need.
2. Define or move domain types and constants first.
3. Extract the stateful hook and service boundaries.
4. Extract meaningful presentational components.
5. Leave the route as a small composition layer.
6. Run `pnpm --filter ai-keyboard exec tsc --noEmit`.

When refactoring existing code, preserve behavior and make small incremental
changes. Do not introduce a general state-management library or dependency
just to split one screen. Update `packages/ai-keyboard/AGENTS.md` when the
architecture or commands materially change.
