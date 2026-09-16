export type Provider = 'local' | 'openai' | 'anthropic' | 'gemini'

export const providerLabels: Record<Provider, string> = {
  local: 'Local planner',
  openai: 'ChatGPT / OpenAI',
  anthropic: 'Claude / Anthropic',
  gemini: 'Gemini / Google',
}

export type AiPlan = {
  provider: Provider
  summary: string
  topPriorities: { title: string; rationale: string }[]
  quickWins: string[]
  risks: string[]
  nextActions: string[]
}

export function buildProviderPrompt(tasks: unknown[]) {
  return JSON.stringify({
    instruction: 'Create a practical daily productivity plan. Return JSON only. Do not invent deadlines, commitments, or facts. Do not request or expose credentials, personal data, confidential information, controlled information, or employer data.',
    response_shape: { summary: 'string', topPriorities: [{ title: 'string', rationale: 'string' }], quickWins: ['string'], risks: ['string'], nextActions: ['string'] },
    tasks,
  }, null, 2)
}

export function localAiPlan(tasks: { title: string; category: string; dueDate?: string }[]): AiPlan {
  const topPriorities = tasks.slice(0, 5).map((task) => ({
    title: task.title,
    rationale: `Prioritized locally from urgency, impact, alignment, effort${task.dueDate ? ', and due date' : ''}.`,
  }))
  return {
    provider: 'local',
    summary: `Local planner reviewed ${tasks.length} active task${tasks.length === 1 ? '' : 's'} without sending data to an AI service.`,
    topPriorities,
    quickWins: tasks.filter((task) => task.category === 'Inbox').slice(0, 3).map((task) => task.title),
    risks: [],
    nextActions: topPriorities.length ? [`Start with: ${topPriorities[0].title}`, 'Review the plan at mid-day and adjust only when priorities change.'] : ['Capture a task to create a plan.'],
  }
}

export async function requestExternalPlan(): Promise<never> {
  throw new Error('External AI calls are not made from this browser-only app. Use the CLI with a user-owned local API key, or connect a secure backend before enabling OpenAI, Claude, or Gemini.')
}
