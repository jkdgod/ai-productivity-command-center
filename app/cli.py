from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

from app.models import Task
from app.planner import local_plan
from app.providers import ProviderError, get_provider


def load_tasks(path: str) -> list[Task]:
    payload = json.loads(Path(path).read_text(encoding="utf-8"))
    values = payload.get("tasks", payload) if isinstance(payload, dict) else payload
    if not isinstance(values, list):
        raise ValueError("Input must be a JSON list or object containing tasks.")
    return [Task.from_dict(item) for item in values]


def emit(payload: dict[str, Any], output: str | None) -> None:
    rendered = json.dumps(payload, indent=2, ensure_ascii=False)
    if output:
        Path(output).write_text(rendered + "\n", encoding="utf-8")
    print(rendered)


def analyze_notes(notes: str) -> dict[str, Any]:
    lines = [line.strip("-• \t") for line in notes.splitlines() if line.strip()]
    actions = [line for line in lines if any(word in line.lower() for word in ("need", "will", "follow", "send", "finish", "schedule"))]
    risks = [line for line in lines if any(word in line.lower() for word in ("risk", "blocked", "waiting", "issue", "concern"))]
    return {"provider": "local", "tasks": actions, "decisions": [], "risks": risks, "blockers": risks, "follow_ups": actions}


def main() -> None:
    parser = argparse.ArgumentParser(description="AI Productivity Command Center")
    subs = parser.add_subparsers(dest="command", required=True)
    for command, help_text in (("plan-day", "Create a daily plan"), ("analyze-notes", "Extract notes actions"), ("weekly-review", "Create weekly review")):
        sub = subs.add_parser(command, help=help_text)
        sub.add_argument("--input", required=True)
        sub.add_argument("--output")
        if command != "weekly-review":
            sub.add_argument("--provider", default="local", choices=["local", "openai", "anthropic", "gemini"])
    args = parser.parse_args()
    try:
        if args.command == "plan-day":
            emit(get_provider(args.provider).plan_day(load_tasks(args.input)), args.output)
        elif args.command == "analyze-notes":
            if args.provider != "local":
                raise ProviderError("Note analysis is local-only in v0.1.")
            emit(analyze_notes(Path(args.input).read_text(encoding="utf-8")), args.output)
        else:
            plan = local_plan(load_tasks(args.input))
            emit({"provider": "local", "accomplishments": ["Review completed work before planning next week."], "blockers": plan["risks_and_blockers"], "lessons": ["Protect high-impact focus time first."], "next_week_priorities": [item["title"] for item in plan["top_priorities"]]}, args.output)
    except (ValueError, ProviderError, OSError, json.JSONDecodeError) as exc:
        parser.error(str(exc))


if __name__ == "__main__":
    main()
