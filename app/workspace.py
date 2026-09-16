from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import Any

from app.models import Task

def load_workspace(path: str) -> list[Task]:
    payload = json.loads(Path(path).read_text(encoding='utf-8'))
    values = payload.get('tasks', payload) if isinstance(payload, dict) else payload
    if not isinstance(values, list):
        raise ValueError('Workspace must contain a tasks list.')
    return [Task.from_dict(value) for value in values]

def save_workspace(path: str, tasks: list[Task]) -> None:
    Path(path).write_text(json.dumps({'version': 1, 'tasks': [task.to_dict() for task in tasks]}, indent=2) + '\n', encoding='utf-8')

def export_csv(path: str, tasks: list[Task]) -> None:
    fields = ['title', 'category', 'due_date', 'impact', 'urgency', 'effort_hours', 'alignment', 'notes']
    with Path(path).open('w', newline='', encoding='utf-8') as handle:
        writer = csv.DictWriter(handle, fieldnames=fields); writer.writeheader(); writer.writerows([task.to_dict() for task in tasks])

def import_csv(path: str) -> list[Task]:
    with Path(path).open(newline='', encoding='utf-8') as handle:
        return [Task.from_dict(row) for row in csv.DictReader(handle)]
