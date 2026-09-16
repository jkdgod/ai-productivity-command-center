# AI Productivity Command Center

A public, local-first productivity suite for command line, web, desktop, and mobile. It creates reviewable daily plans while keeping ChatGPT, Claude, and Gemini integrations optional and user-controlled.

## Current release: AI Workspace v0.3

- Persistent local workspaces, task management, search, filters, JSON backups, and CSV import/export.
- Consent-first AI workspace in the web app.
- Local planning runs entirely in the browser and sends no task data to an AI provider.
- ChatGPT, Claude, and Gemini are supported through the CLI with user-owned local keys.
- External-provider prompt previews, consent language, and structured-output validation are included.
- Browser and mobile apps intentionally do not embed API keys.

## Run it

```bash
# CLI local mode
pip install -r requirements.txt
python -m app plan-day --input data/sample_tasks.json --provider local

# Optional CLI provider mode: set only your own key(s) in .env
pip install openai anthropic google-genai
python -m app plan-day --input data/sample_tasks.json --provider openai

# Web
cd apps/web && npm install && npm run dev

# Mobile
cd apps/mobile && npm install && npx expo start
```

Read [AI Workspace](docs/AI_WORKSPACE.md) and [Local Workspace](docs/LOCAL_WORKSPACE.md) before configuring providers or importing data.

## Privacy-first

Local mode makes no AI network calls. External provider use requires a user-selected provider, explicit disclosure, user-owned credentials, and review of returned recommendations. Never commit keys, passwords, personal data, employer-confidential material, controlled information, or private calendar content.

## License

MIT. Anyone may use, study, modify, and distribute this project under the license terms.
