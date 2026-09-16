from app.models import Task
from app.planner import local_plan, priority_score


def test_urgent_high_impact_task_ranks_first():
    urgent = Task(title="Urgent", urgency=5, impact=5, alignment=5, effort_hours=1)
    low = Task(title="Low", urgency=1, impact=1, alignment=1, effort_hours=1)
    assert priority_score(urgent) > priority_score(low)
    assert local_plan([low, urgent])["top_priorities"][0]["title"] == "Urgent"


def test_plan_contract_is_present():
    plan = local_plan([Task(title="A")])
    for key in ("top_priorities", "time_blocks", "quick_wins", "risks_and_blockers", "delegation_or_deferral", "next_actions"):
        assert key in plan
