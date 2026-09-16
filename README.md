# AI Productivity Command Center

A public, local-first productivity suite for command line, web, desktop, and mobile. It turns goals, tasks, and notes into reviewable daily execution plans while keeping ChatGPT, Claude, and Gemini integrations optional and user-controlled.

## Use it anywhere

| Experience | Status | Location |
|---|---|---|
| Python command line | Runnable | `app/` |
| React web dashboard | Runnable starter | `apps/web/` |
| Expo phone app | Runnable starter | `apps/mobile/` |
| Tauri desktop app | Native build scaffold | `apps/desktop/` |

## Quick start: CLI

```bash
pip install -r requirements.txt
python -m app plan-day --input data/sample_tasks.json --provider local
```

## Quick start: web

```bash
cd apps/web
npm install
npm run dev
```

## Quick start: mobile

```bash
cd apps/mobile
npm install
npx expo start
```

See [the cross-platform build guide](docs/CROSS_PLATFORM_BUILD.md) for desktop setup and responsible provider integration.

## Privacy-first design

- Local mode works without an API key and makes no AI network calls.
- ChatGPT, Claude, and Gemini are optional integrations using user-owned credentials.
- The public repository contains synthetic data only.
- Never commit keys, passwords, personal data, employer-confidential material, controlled information, or private calendar content.
- Users must review and approve AI output before it changes a calendar, sends a message, or performs another external action.

## License

MIT. Anyone may use, study, modify, and distribute this project under the license terms.
