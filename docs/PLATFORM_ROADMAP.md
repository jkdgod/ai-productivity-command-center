# Cross-Platform Roadmap

## Command line

The included Python CLI is the automation-first reference client. It reads task JSON, produces reviewable JSON, and can be used in scripts or CI.

## Desktop

A future desktop client will use Tauri + React for Windows, macOS, and Linux. Planned features: local encrypted workspace, Today dashboard, task board, provider selection, export, and opt-in integrations.

## Mobile

A future mobile companion will use Expo / React Native for iOS and Android. Planned features: fast text or voice capture, Today view, offline queue, reminders, share-sheet intake, and opt-in sync.

## Web

A future web dashboard will provide an optional browser interface. It should use the same data schema and clearly distinguish local-only operation from provider-backed requests.

## Design rules

- One shared task schema and one structured plan contract.
- Local-first and opt-in cloud or AI use.
- User review before actions, reminders, or calendar changes.
- No hidden credential storage or telemetry.
- Accessibility, keyboard support, and plain-language settings.
