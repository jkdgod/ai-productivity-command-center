# Cross-Platform Build Guide

## What is runnable today

- Python CLI: local task ranking, note analysis, and weekly review.
- React web demo: interactive local-only task capture and priority display.
- Expo mobile starter: interactive Today screen for iOS, Android, or web preview.
- Tauri desktop configuration: native launcher configuration for the React dashboard.

## Web

```bash
cd apps/web
npm install
npm run dev
```

The web starter intentionally keeps tasks in memory. The next persistence milestone should use local browser storage or a user-controlled local database, with clear export and deletion controls.

## Mobile

```bash
cd apps/mobile
npm install
npx expo start
```

Use the Expo terminal instructions to open Android, iOS, or a browser preview. Production releases require platform-specific signing, store accounts, privacy disclosures, and testing.

## Desktop

The desktop directory includes a Tauri configuration that targets the web app. Install Rust and Tauri prerequisites for the intended platform, install the JavaScript dependencies, then run the Tauri development command from `apps/desktop`. Native signing and release distribution must be completed separately for each operating system.

## Provider integration rules

- Local mode must remain useful without network access or a paid provider.
- API keys belong in a user's local environment or platform credential storage.
- Do not ship provider keys in a browser or mobile client. Use a user-owned key flow or a secure user-controlled backend.
- Make every provider call opt-in and show users what information leaves the device.
- Require user confirmation before creating calendar items, notifications, messages, purchases, or other external side effects.
