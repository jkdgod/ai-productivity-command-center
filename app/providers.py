from __future__ import annotations

import importlib
import json
import os
from abc import ABC, abstractmethod
from typing import Any

from dotenv import load_dotenv
from app.models import Task
from app.planner import local_plan

load_dotenv()
SYSTEM_PROMPT = 'Return valid JSON with provider, top_priorities, time_blocks, quick_wins, risks_and_blockers, delegation_or_deferral, and next_actions. Do not invent deadlines. Do not request or expose sensitive, confidential, controlled, personal, or credential information.'

def user_prompt(tasks: list[Task]) -> str:
    return 'Create a practical daily plan from this user-supplied task list: ' + json.dumps([task.to_dict() for task in tasks])

class ProviderError(RuntimeError): pass
class BaseProvider(ABC):
    @abstractmethod
    def plan_day(self, tasks: list[Task]) -> dict[str, Any]: raise NotImplementedError
class LocalProvider(BaseProvider):
    def plan_day(self, tasks: list[Task]) -> dict[str, Any]: return local_plan(tasks)
class OpenAIProvider(BaseProvider):
    def plan_day(self, tasks: list[Task]) -> dict[str, Any]:
        if not os.getenv('OPENAI_API_KEY'): raise ProviderError('OPENAI_API_KEY is missing. Add it to .env or use --provider local.')
        if importlib.util.find_spec('openai') is None: raise ProviderError('OpenAI SDK is not installed. Run: pip install openai')
        from openai import OpenAI
        response = OpenAI().chat.completions.create(model=os.getenv('OPENAI_MODEL') or 'gpt-4.1-mini', response_format={'type':'json_object'}, messages=[{'role':'system','content':SYSTEM_PROMPT},{'role':'user','content':user_prompt(tasks)}])
        return validate_plan(json.loads(response.choices[0].message.content or '{}'), 'openai')
class AnthropicProvider(BaseProvider):
    def plan_day(self, tasks: list[Task]) -> dict[str, Any]:
        if not os.getenv('ANTHROPIC_API_KEY'): raise ProviderError('ANTHROPIC_API_KEY is missing. Add it to .env or use --provider local.')
        if importlib.util.find_spec('anthropic') is None: raise ProviderError('Anthropic SDK is not installed. Run: pip install anthropic')
        import anthropic
        response = anthropic.Anthropic().messages.create(model=os.getenv('ANTHROPIC_MODEL') or 'claude-3-5-haiku-latest', max_tokens=1600, system=SYSTEM_PROMPT, messages=[{'role':'user','content':user_prompt(tasks)}])
        return validate_plan(json.loads(response.content[0].text), 'anthropic')
class GeminiProvider(BaseProvider):
    def plan_day(self, tasks: list[Task]) -> dict[str, Any]:
        if not os.getenv('GEMINI_API_KEY'): raise ProviderError('GEMINI_API_KEY is missing. Add it to .env or use --provider local.')
        if importlib.util.find_spec('google.genai') is None: raise ProviderError('Gemini SDK is not installed. Run: pip install google-genai')
        from google import genai
        response = genai.Client(api_key=os.environ['GEMINI_API_KEY']).models.generate_content(model=os.getenv('GEMINI_MODEL') or 'gemini-2.0-flash', contents=SYSTEM_PROMPT + '\n' + user_prompt(tasks), config={'response_mime_type':'application/json'})
        return validate_plan(json.loads(response.text), 'gemini')
def validate_plan(value: Any, provider: str) -> dict[str, Any]:
    if not isinstance(value, dict): raise ProviderError('Provider response was not a JSON object.')
    required = ('top_priorities','time_blocks','quick_wins','risks_and_blockers','delegation_or_deferral','next_actions')
    for key in required:
        if key not in value: value[key] = []
        if not isinstance(value[key], list): raise ProviderError(f'Provider response field {key} must be a list.')
    value['provider'] = provider
    return value
def get_provider(name: str) -> BaseProvider:
    choices={'local':LocalProvider,'openai':OpenAIProvider,'anthropic':AnthropicProvider,'gemini':GeminiProvider}
    try: return choices[name.lower()]()
    except KeyError as exc: raise ProviderError('Choose local, openai, anthropic, or gemini.') from exc
