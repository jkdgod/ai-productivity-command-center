import React, { useMemo, useState } from 'react'
import { createPlan, type Task } from '@apcc/core'
import { createRoot } from 'react-dom/client'
import './styles.css'

const initialTasks: Task[] = [
  { id: '1', title: 'Finish project proposal', category: 'Education', impact: 5, urgency: 5, alignment: 5, effortHours: 2 },
  { id: '2', title: 'Tailor resume for target role', category: 'Career', impact: 5, urgency: 4, alignment: 5, effortHours: 1.5 },
  { id: '3', title: 'Schedule grocery pickup', category: 'Family', impact: 3, urgency: 4, alignment: 4, effortHours: 0.25 },
]

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [title, setTitle] = useState('')
  const plan = useMemo(() => createPlan(tasks), [tasks])

  function addTask(event: React.FormEvent) {
    event.preventDefault()
    const clean = title.trim()
    if (!clean) return
    setTasks((items) => [...items, { id: crypto.randomUUID(), title: clean, category: 'Inbox', impact: 3, urgency: 3, alignment: 3, effortHours: 1 }])
    setTitle('')
  }

  function completeTask(id: string) {
    setTasks((items) => items.filter((task) => task.id !== id))
  }

  return (
    <main className="shell">
      <header>
        <p className="eyebrow">LOCAL-FIRST · OPEN SOURCE · MULTI-PROVIDER</p>
        <h1>AI Productivity Command Center</h1>
        <p className="subtitle">Plan your day locally. Connect ChatGPT, Claude, or Gemini only when you choose.</p>
      </header>
      <section className="grid">
        <article className="panel">
          <h2>Quick capture</h2>
          <form onSubmit={addTask}>
            <label htmlFor="task">What needs to get done?</label>
            <div className="capture">
              <input id="task" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add a task..." />
              <button type="submit">Add</button>
            </div>
          </form>
          <p className="hint">This demo stores tasks only in browser memory. No data is sent anywhere.</p>
        </article>
        <article className="panel hero">
          <h2>Today’s focus</h2>
          {plan.topPriorities.map((item, index) => (
            <div className="priority" key={item.task.id}>
              <span className="rank">{index + 1}</span>
              <div><strong>{item.task.title}</strong><p>{item.reason}</p></div>
              <span className="score">{item.score}</span>
            </div>
          ))}
        </article>
        <article className="panel">
          <h2>Task inbox</h2>
          <ul className="tasks">
            {tasks.map((task) => <li key={task.id}><div><strong>{task.title}</strong><span>{task.category} · {task.effortHours}h</span></div><button onClick={() => completeTask(task.id)}>Done</button></li>)}
          </ul>
        </article>
      </section>
      <section className="panel">
        <h2>Time blocks</h2>
        <div className="blocks">
          {plan.timeBlocks.map((block) => <div className="block" key={block.task.id}><strong>{block.durationMinutes} min</strong><span>{block.task.title}</span></div>)}
        </div>
      </section>
      <footer>Local planner is active. AI providers should remain opt-in, use user-owned keys, and receive only data the user chooses to share.</footer>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
