# AI Productivity Command Center

A public, local-first productivity suite for command line, web, desktop, mobile, and an optional local API. It creates reviewable daily plans while keeping ChatGPT, Claude, Gemini, calendar access, and synchronization optional and user-controlled.

## What is available

| Component | Status | Purpose |
|---|---|---|
| Python CLI | Runnable | Local planning, workspaces, backup, and CSV tools |
| Web app | Runnable and GitHub Pages-ready | Persistent browser workspace and local planning |
| Mobile app | Runnable starter | On-device task workspace |
| Desktop app | Native build scaffold | Tauri wrapper for the web workspace |
| Local API | Runnable optional template | Local planning endpoint for controlled integrations |

## Run locally

```bash
# CLI
pip install -r requirements.txt
python -m app plan-day --input data/sample_tasks.json --provider local

# Web
cd apps/web && npm install && npm run dev

# Mobile
cd apps/mobile && npm install && npx expo start

# Optional local API
cd services/local-api
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8787
```

## Free public demo

GitHub Pages deployment is configured. A repository owner can enable it in **Settings → Pages → GitHub Actions**. Read [Deployment Guide](docs/DEPLOYMENT.md).

## Privacy and safety

- Local mode does not intentionally send tasks to an AI provider.
- Browser/mobile applications do not embed provider API keys.
- External AI, calendar, and synchronization features require user selection, clear disclosure, and explicit consent.
- Never commit credentials, passwords, personal data, employer-confidential material, controlled information, or private calendar content.

Read [Privacy](docs/PRIVACY.md), [Security](SECURITY.md), [AI Workspace](docs/AI_WORKSPACE.md), and [Calendar Integration](docs/CALENDAR_INTEGRATION.md).

## Project operations

CI, CodeQL scanning, dependency review, GitHub Pages workflow, and a release workflow are included. See [Release Checklist](docs/RELEASE_CHECKLIST.md) and [Changelog](CHANGELOG.md).

## License

MIT. Anyone may use, study, modify, and distribute this project under the license terms.
