from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import Any


@dataclass
class Task:
    title: str
    category: str = "general"
    due_date: str | None = None
    impact: int = 3
    urgency: int = 3
    effort_hours: float = 1.0
    alignment: int = 3
    notes: str = ""

    @classmethod
    def from_dict(cls, value: dict[str, Any]) -> "Task":
        title = str(value.get("title", "")).strip()
        if not title:
            raise ValueError("Each task needs a non-empty title.")
        task = cls(
            title=title, category=str(value.get("category", "general")),
            due_date=value.get("due_date") or None, impact=int(value.get("impact", 3)),
            urgency=int(value.get("urgency", 3)), effort_hours=float(value.get("effort_hours", 1.0)),
            alignment=int(value.get("alignment", 3)), notes=str(value.get("notes", "")),
        )
        for field_name in ("impact", "urgency", "alignment"):
            if not 1 <= getattr(task, field_name) <= 5:
                raise ValueError(f"{field_name} must be between 1 and 5.")
        if task.effort_hours <= 0:
            raise ValueError("effort_hours must be greater than zero.")
        return task

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)
