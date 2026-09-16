import React, { useEffect, useMemo, useState } from 'react'
import { createPlan, createTask, exportCsv, exportJson, importTasks, loadWorkspace, saveWorkspace, type Task, type Workspace } from '@apcc/core'
import { createRoot } from 'react-dom/client'
import './styles.css'

const seed: Task[] = [
  createTask({ title: 'Finish project proposal', category: 'Education', impact: 5, urgency: 5, alignment: 5, effortHours: 2 }),
  createTask({ title: 'Tailor resume for target role', category: 'Career', impact: 5, urgency: 4, alignment: 5, effortHours: 1.5 }),
  createTask({ title: 'Schedule grocery pickup', category: 'Family', impact: 3, urgency: 4, alignment: 4, effortHours: 0.25 }),
]
const emptyWorkspace: Workspace = { version: 1, tasks: seed, updatedAt: new Date().toISOString() }

function download(name: string, contents: string, type: string) {
  const anchor = document.createElement('a')
  anchor.href = URL.createObjectURL(new Blob([contents], { type }))
  anchor.download = name
  anchor.click()
  URL.revokeObjectURL(anchor.href)
}

function App() {
  const [workspace, setWorkspace] = useState<Workspace>(() => loadWorkspace() ?? emptyWorkspace)
  const [title, setTitle] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [showCompleted, setShowCompleted] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const [notice, setNotice] = useState('Local workspace active. Your tasks stay in this browser.')

  useEffect(() => saveWorkspace(workspace), [workspace])
  const visible = useMemo(() => workspace.tasks.filter((task) => {
    const matchesText = task.title.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category === 'All' || task.category === category
    return matchesText && matchesCategory && (showCompleted || !task.completedAt)
  }), [workspace, query, category, showCompleted])
  const plan = useMemo(() => createPlan(visible.filter((task) => !task.completedAt)), [visible])
  const categories = ['All', ...Array.from(new Set(workspace.tasks.map((task) => task.category))).sort()]

  function updateTasks(change: (tasks: Task[]) => Task[]) {
    setWorkspace((current) => ({ ...current, tasks: change(current.tasks), updatedAt: new Date().toISOString() }))
  }
  function addTask(event: React.FormEvent) {
    event.preventDefault(); const clean = title.trim(); if (!clean) return
    updateTasks((tasks) => [...tasks, createTask({ title: clean, category: 'Inbox' })]); setTitle(''); setNotice('Task added locally.')
  }
  function saveEdit(event: React.FormEvent) {
    event.preventDefault(); if (!editing || !editing.title.trim()) return
    updateTasks((tasks) => tasks.map((task) => task.id === editing.id ? { ...editing, title: editing.title.trim(), updatedAt: new Date().toISOString() } : task)); setEditing(null); setNotice('Task updated locally.')
  }
  function importFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return
    const reader = new FileReader(); reader.onload = () => {
      try { const tasks = importTasks(String(reader.result), file.name.endsWith('.csv') ? 'csv' : 'json'); setWorkspace({ version: 1, tasks, updatedAt: new Date().toISOString() }); setNotice(`Imported ${tasks.length} tasks locally.`) }
      catch (error) { setNotice(error instanceof Error ? error.message : 'Unable to import this file.') }
    }; reader.readAsText(file); event.target.value = ''
  }

  return <main className="shell"><header><p className="eyebrow">LOCAL-FIRST · PRIVATE BY DEFAULT · OPEN SOURCE</p><h1>AI Productivity Command Center</h1><p className="subtitle">A persistent local workspace for your tasks, plans, and priorities.</p></header>
    <p className="notice" role="status">{notice}</p>
    <section className="toolbar panel"><form className="capture" onSubmit={addTask}><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Capture a task..." aria-label="New task"/><button>Add task</button></form><div className="actions"><button onClick={() => download('apcc-backup.json', exportJson(workspace.tasks), 'application/json')}>Backup JSON</button><button onClick={() => download('apcc-tasks.csv', exportCsv(workspace.tasks), 'text/csv')}>Export CSV</button><label className="button">Import<input hidden type="file" accept=".json,.csv" onChange={importFile}/></label></div></section>
    <section className="filters panel"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks..." aria-label="Search tasks"/><select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category filter">{categories.map((item) => <option key={item}>{item}</option>)}</select><label><input type="checkbox" checked={showCompleted} onChange={(e) => setShowCompleted(e.target.checked)}/> Show completed</label></section>
    <section className="grid"><article className="panel hero"><h2>Today’s focus</h2>{plan.topPriorities.length ? plan.topPriorities.map((item, index) => <div className="priority" key={item.task.id}><span className="rank">{index + 1}</span><div><strong>{item.task.title}</strong><p>{item.reason}</p></div><span className="score">{item.score}</span></div>) : <p className="hint">Add an active task to build today’s plan.</p>}</article>
      <article className="panel"><h2>Time blocks</h2><div className="blocks">{plan.timeBlocks.map((block) => <div className="block" key={block.task.id}><strong>{block.durationMinutes} min</strong><span>{block.task.title}</span></div>)}</div></article></section>
    <section className="panel"><h2>Workspace tasks</h2><ul className="tasks">{visible.map((task) => <li key={task.id} className={task.completedAt ? 'completed' : ''}><div><strong>{task.title}</strong><span>{task.category} · {task.effortHours}h · U{task.urgency} I{task.impact}{task.dueDate ? ` · due ${task.dueDate}` : ''}{task.recurrence !== 'none' ? ` · ${task.recurrence}` : ''}</span></div><div className="task-actions"><button onClick={() => setEditing(task)}>Edit</button><button onClick={() => updateTasks((tasks) => tasks.map((item) => item.id === task.id ? { ...item, completedAt: item.completedAt ? undefined : new Date().toISOString(), updatedAt: new Date().toISOString() } : item))}>{task.completedAt ? 'Restore' : 'Done'}</button><button className="danger" onClick={() => updateTasks((tasks) => tasks.filter((item) => item.id !== task.id))}>Delete</button></div></li>)}</ul></section>
    {editing && <div className="modal" role="dialog" aria-modal="true"><form className="panel editor" onSubmit={saveEdit}><h2>Edit task</h2><input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}/><div className="editor-grid"><label>Category<input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}/></label><label>Due date<input type="date" value={editing.dueDate ?? ''} onChange={(e) => setEditing({ ...editing, dueDate: e.target.value || undefined })}/></label><label>Impact (1-5)<input type="number" min="1" max="5" value={editing.impact} onChange={(e) => setEditing({ ...editing, impact: Number(e.target.value) })}/></label><label>Urgency (1-5)<input type="number" min="1" max="5" value={editing.urgency} onChange={(e) => setEditing({ ...editing, urgency: Number(e.target.value) })}/></label><label>Alignment (1-5)<input type="number" min="1" max="5" value={editing.alignment} onChange={(e) => setEditing({ ...editing, alignment: Number(e.target.value) })}/></label><label>Effort hours<input type="number" min="0.25" step="0.25" value={editing.effortHours} onChange={(e) => setEditing({ ...editing, effortHours: Number(e.target.value) })}/></label><label>Recurrence<select value={editing.recurrence} onChange={(e) => setEditing({ ...editing, recurrence: e.target.value as Task['recurrence'] })}><option value="none">None</option><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option></select></label></div><div className="actions"><button type="submit">Save</button><button type="button" onClick={() => setEditing(null)}>Cancel</button></div></form></div>}
    <footer>Local browser storage is active. Export a backup regularly. AI providers and sync remain opt-in future features.</footer></main>
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
