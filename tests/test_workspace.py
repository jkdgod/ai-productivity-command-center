import json
from pathlib import Path

from app.models import Task
from app.workspace import export_csv, import_csv, load_workspace, save_workspace

def test_workspace_round_trip(tmp_path: Path):
    path = tmp_path / 'workspace.json'
    save_workspace(str(path), [Task(title='Plan')])
    assert load_workspace(str(path))[0].title == 'Plan'
    assert json.loads(path.read_text())['version'] == 1

def test_csv_round_trip(tmp_path: Path):
    path = tmp_path / 'tasks.csv'
    export_csv(str(path), [Task(title='Export me')])
    assert import_csv(str(path))[0].title == 'Export me'
