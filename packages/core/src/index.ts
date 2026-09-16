export type Task = {
  id: string
  title: string
  category: string
  impact: number
  urgency: number
  alignment: number
  effortHours: number
}

export type Priority = { task: Task; score: number; reason: string }

export type TimeBlock = { task: Task; durationMinutes: number }

export function priorityScore(task: Task): number {
  const effortBonus = Math.max(0, 6 - Math.min(task.effortHours, 6)) * 2.5
  return Math.round(((task.urgency * 8) + (task.impact * 7) + (task.alignment * 4) + effortBonus) * 10) / 10
}

export function priorityReason(task: Task): string {
  const factors: string[] = []
  if (task.urgency >= 4) factors.push('high urgency')
  if (task.impact >= 4) factors.push('high impact')
  if (task.alignment >= 4) factors.push('strong alignment')
  if (task.effortHours <= 1) factors.push('a short completion window')
  return `Prioritized for ${factors.join(', ') || 'balanced importance and effort'}.`
}

export function createPlan(tasks: Task[]) {
  const ranked = [...tasks].sort((a, b) => priorityScore(b) - priorityScore(a))
  const topPriorities: Priority[] = ranked.slice(0, 5).map((task) => ({ task, score: priorityScore(task), reason: priorityReason(task) }))
  const timeBlocks: TimeBlock[] = topPriorities.map(({ task }) => ({ task, durationMinutes: Math.min(120, Math.max(25, Math.round((task.effortHours * 60) / 5) * 5)) }))
  return { topPriorities, timeBlocks }
}
