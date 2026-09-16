# AI Productivity Command Center

A public, local-first productivity suite for command line, web, desktop, and mobile. It creates reviewable daily plans while keeping ChatGPT, Claude, and Gemini integrations optional and user-controlled.

## Current release: Local Workspace v0.2

- Persistent local web workspace using browser storage.
- Persistent mobile starter workspace using device storage.
- Create, edit, complete, restore, delete, search, and filter tasks.
- Task details: category, due date, effort, urgency, impact, alignment, and recurrence.
- JSON backup/restore and CSV import/export.
- CLI backup, CSV import/export, and local planning commands.
- No automatic cloud synchronization or automatic AI data sharing.

## Run it

```bash
# CLI
pip install -r requirements.txt
python -m app plan-day --input data/sample_tasks.json --provider local

# Web
cd apps/web && npm install && npm run dev

# Mobile
cd apps/mobile && npm install && npx expo start
```

Read [Local Workspace](docs/LOCAL_WORKSPACE.md) for backups, import/export, and data-safety guidance.

## Privacy-first

Local mode makes no AI network calls. Provider integrations are optional and require user-owned credentials. Never commit keys, passwords, personal data, employer-confidential material, controlled information, or private calendar content.

## License

MIT. Anyone may use, study, modify, and distribute this project under the license terms.
