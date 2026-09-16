# Local Workspace v0.2

The web starter persists tasks in browser local storage. The mobile starter persists tasks on the device with AsyncStorage. Neither mode sends task data to a server.

## Web controls

- Capture, edit, complete, restore, and delete tasks.
- Filter by text and category.
- Set due dates, impact, urgency, alignment, effort, and recurrence.
- Download JSON backups or CSV exports.
- Import a prior JSON backup or a CSV file. Import replaces the local browser workspace, so export a backup first.

## CLI workspace

```bash
python -m app plan-day --input data/sample_tasks.json --provider local
python -m app export-csv --input data/sample_tasks.json --output tasks.csv
python -m app import-csv --input tasks.csv --output restored-workspace.json
python -m app backup --input restored-workspace.json --output backup.json
```

## Data safety

Browser storage and mobile-device storage can be cleared by the user or operating system. Keep regular JSON backups. Do not store secrets, passwords, employer-confidential information, controlled information, or sensitive personal data in a public demo or untrusted device.

Cloud synchronization and AI-provider requests are intentionally not automatic. They require separate, opt-in implementation with clear disclosure of what data leaves the device.
