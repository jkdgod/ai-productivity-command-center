# AI Productivity Command Center

A public-safe, local-first command center that turns goals, tasks, and notes into clear daily execution plans. Supports OpenAI (ChatGPT), Anthropic (Claude), Google (Gemini), and deterministic local mode.

## Platforms

- Command line: Python CLI for automation and fast planning.
- Desktop: architecture roadmap for a local-first Tauri + React dashboard.
- Mobile: architecture roadmap for an Expo / React Native companion app.
- Web: architecture roadmap for an optional browser dashboard.

## Safe public use

This public repository includes synthetic examples only. Never commit credentials, passwords, employer-confidential data, controlled information, personal data, or private calendars. Use `.env` for API keys and begin with local mode for offline planning.

## Quick start

```bash
git clone https://github.com/jkdgod/ai-productivity-command-center.git
cd ai-productivity-command-center
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python -m app plan-day --input data/sample_tasks.json --provider local
```

## Providers

```bash
# Optional integrations. Install only the SDK you want.
pip install openai      # Set OPENAI_API_KEY in .env
pip install anthropic   # Set ANTHROPIC_API_KEY in .env
pip install google-genai # Set GEMINI_API_KEY in .env

python -m app plan-day --input data/sample_tasks.json --provider openai
python -m app plan-day --input data/sample_tasks.json --provider anthropic
python -m app plan-day --input data/sample_tasks.json --provider gemini
```

## Commands

| Command | Purpose |
|---|---|
| `plan-day` | Rank tasks and create time blocks |
| `analyze-notes` | Extract actions, follow-ups, and risks from notes |
| `weekly-review` | Create a short weekly reflection and focus list |

Add `--output plan.json` to save JSON output.

## Shared response contract

```json
{
  "top_priorities": [],
  "time_blocks": [],
  "quick_wins": [],
  "risks_and_blockers": [],
  "delegation_or_deferral": [],
  "next_actions": []
}
```

## Architecture

```text
Input from CLI, desktop, mobile, or web
              |
              v
      Shared validated task schema
              |
              v
    Local priority and planning engine
              |
              +--> Local, offline deterministic plan
              +--> OpenAI / ChatGPT adapter
              +--> Anthropic / Claude adapter
              +--> Google / Gemini adapter
              |
              v
     Reviewable structured execution plan
```

## Roadmap

- [x] Local CLI planner, samples, tests, and security guidance
- [x] Optional provider adapter foundation
- [ ] Shared SQLite workspace and CSV import/export
- [ ] Desktop app: Tauri + React with protected local storage
- [ ] Mobile app: Expo / React Native for fast capture and Today view
- [ ] Web dashboard and provider comparison view
- [ ] Optional opt-in calendar sync and reminders

## Contributing

Everyone is welcome to use and improve the project. Keep examples synthetic, preserve local-first behavior, do not submit secrets, and include tests for behavior changes.

## License

MIT. See [LICENSE](LICENSE).
