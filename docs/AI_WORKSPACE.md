# AI Workspace v0.3

## Local by default

The browser app's Local planner creates priority guidance without sending tasks to a network service. It is the default option.

## External AI options

The project supports OpenAI/ChatGPT, Anthropic/Claude, and Google/Gemini through the CLI with user-owned credentials stored locally in `.env`. The browser starter deliberately does not hold or transmit API keys. A production browser or mobile integration requires a secure, user-controlled backend or another safe credential architecture.

## Consent model

Before an external provider call, the user must: 

1. Choose a provider.
2. Preview the data and structured prompt that would leave the device.
3. Explicitly acknowledge that task data would be sent externally.
4. Review the returned plan before acting.

## Verification

AI output is a draft, not an authority. Confirm deadlines, facts, commitments, financial decisions, legal conclusions, medical advice, safety-critical decisions, and any operationally sensitive recommendation before acting.

## CLI use

```bash
pip install openai anthropic google-genai
# Put only desired provider keys in .env; do not commit it.
python -m app plan-day --input data/sample_tasks.json --provider openai
python -m app plan-day --input data/sample_tasks.json --provider anthropic
python -m app plan-day --input data/sample_tasks.json --provider gemini
```
