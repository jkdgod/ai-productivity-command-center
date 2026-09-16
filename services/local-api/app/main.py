from __future__ import annotations

import os
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title='APCC Local API', version='0.1.0')
origins = [value.strip() for value in os.getenv('ALLOWED_ORIGINS', 'http://localhost:5173').split(',') if value.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=False, allow_methods=['POST', 'GET'], allow_headers=['Content-Type'])

class Task(BaseModel):
    title: str = Field(min_length=1, max_length=300)
    category: str = Field(default='Inbox', max_length=80)
    impact: int = Field(default=3, ge=1, le=5)
    urgency: int = Field(default=3, ge=1, le=5)
    alignment: int = Field(default=3, ge=1, le=5)
    effort_hours: float = Field(default=1, gt=0, le=100)
    due_date: str | None = None

class PlanRequest(BaseModel):
    provider: Literal['local', 'openai', 'anthropic', 'gemini'] = 'local'
    consent: bool = False
    tasks: list[Task] = Field(max_length=100)

def score(task: Task) -> float:
    return round(task.urgency * 8 + task.impact * 7 + task.alignment * 4 + max(0, 6 - min(task.effort_hours, 6)) * 2.5, 1)

@app.get('/health')
def health():
    return {'status': 'ok', 'mode': 'local-template'}

@app.post('/v1/plan')
def plan(request: PlanRequest):
    if request.provider != 'local':
        if not request.consent:
            raise HTTPException(status_code=400, detail='Explicit consent is required before task data is sent to an external provider.')
        raise HTTPException(status_code=501, detail='External provider routing is intentionally disabled in this local template. Configure a provider adapter and your own local secret environment to enable it.')
    ranked = sorted(request.tasks, key=score, reverse=True)[:5]
    return {
        'provider': 'local',
        'top_priorities': [{'title': task.title, 'priority_score': score(task)} for task in ranked],
        'time_blocks': [{'task': task.title, 'duration_minutes': min(120, max(25, round(task.effort_hours * 60 / 5) * 5))} for task in ranked],
        'quick_wins': [task.title for task in ranked if task.effort_hours <= .5],
        'risks_and_blockers': [],
        'delegation_or_deferral': [],
        'next_actions': [f'Start with: {ranked[0].title}'] if ranked else ['Add a task to create a plan.'],
    }
