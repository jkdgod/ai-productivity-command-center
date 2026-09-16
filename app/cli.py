from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

from app.models import Task
from app.planner import local_plan
from app.providers import ProviderError, get_provider
from app.workspace import export_csv, import_csv, load_workspace, save_workspace

def load_tasks(path: str) -> list[Task]:
    return load_workspace(path)

def emit(payload: dict[str, Any], output: str | None) -> None:
    rendered = json.dumps(payload, indent=2, ensure_ascii=False)
    if output: Path(output).write_text(rendered + '\n', encoding='utf-8')
    print(rendered)

def main() -> None:
    parser = argparse.ArgumentParser(description='AI Productivity Command Center')
    subs = parser.add_subparsers(dest='command', required=True)
    plan = subs.add_parser('plan-day'); plan.add_argument('--input', required=True); plan.add_argument('--output'); plan.add_argument('--provider', default='local', choices=['local','openai','anthropic','gemini'])
    exported = subs.add_parser('export-csv'); exported.add_argument('--input', required=True); exported.add_argument('--output', required=True)
    imported = subs.add_parser('import-csv'); imported.add_argument('--input', required=True); imported.add_argument('--output', required=True)
    backup = subs.add_parser('backup'); backup.add_argument('--input', required=True); backup.add_argument('--output', required=True)
    args = parser.parse_args()
    try:
        if args.command == 'plan-day': emit(get_provider(args.provider).plan_day(load_tasks(args.input)), args.output)
        elif args.command == 'export-csv': export_csv(args.output, load_workspace(args.input)); print(f'Exported CSV: {args.output}')
        elif args.command == 'import-csv': save_workspace(args.output, import_csv(args.input)); print(f'Created workspace: {args.output}')
        else: save_workspace(args.output, load_workspace(args.input)); print(f'Backup created: {args.output}')
    except (ValueError, ProviderError, OSError, json.JSONDecodeError) as exc: parser.error(str(exc))

if __name__ == '__main__': main()
