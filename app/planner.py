from __future__ import annotations

from datetime import date
from typing import Any

from app.models import Task


def priority_score(task: Task) -> float:
    effort_bonus = max(0.0, 6.0 - min(task.effort_hours, 6.0)) * 2.5
    return round((task.urgency * 8) + (task.impact * 7) + (task.alignment * 4) + effort_bonus, 1)


def reason_for(task: Task) -> str:
    factors = []
    if task.urgency >= 4:
        factors.append("high urgency")
    if task.impact >= 4:
        factors.append("high impact")
    if task.alignment >= 4:
        factors.append("strong strategic alignment")
    if task.effort_hours <= 1:
        factors.append("a short completion window")
    return "Prioritized for " + (", ".join(factors) if factors else "balanced importance and effort") + "."


def local_plan(tasks: list[Task], max_priorities: int = 5) -> dict[str, Any]:
    ranked = sorted(tasks, key=priority_score, reverse=True)
    focus = ranked[:max_priorities]
    return {
        "provider": "local", "generated_on": date.today().isoformat(),
        "top_priorities": [{"title": t.title, "priority_score": priority_score(t), "reason": reason_for(t)} for t in focus],
        "time_blocks": [{"task": t.title, "duration_minutes": min(120, max(25, round(t.effort_hours * 60 / 5) * 5)), "instruction": "Work distraction-free; end by recording the next concrete handoff."} for t in focus],
        "quick_wins": [t.title for t in ranked if t.effort_hours <= 0.5 and t not in focus][:3],
        "risks_and_blockers": [f"{t.title}: clarify scope or dependencies before starting." for t in focus if t.effort_hours >= 4],
        "delegation_or_deferral": [f"Consider deferring or delegating: {t.title}." for t in ranked[max_priorities:] if t.urgency <= 2][:3],
        "next_actions": ["Start the first priority with one 25-minute focus block.", "Review the plan at mid-day and re-rank only when circumstances change."],
    }
