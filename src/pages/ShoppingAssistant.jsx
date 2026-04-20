import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ShoppingAssistant.module.css'

const INITIAL_ASSISTANTS = [
  { id: 1, name: 'My first Assistant', meta: 'Created 17 days ago', lang: 'English', active: true },
]

export default function ShoppingAssistant() {
  const navigate = useNavigate()
  const [assistants, setAssistants] = useState(INITIAL_ASSISTANTS)

  function handleToggle(id) {
    setAssistants(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a))
  }

  function handleDuplicate(a) {
    setAssistants(prev => [...prev, { ...a, id: Date.now(), name: 'Copy of ' + a.name, meta: 'Just now' }])
  }

  function handleDelete(id) {
    setAssistants(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Shopping Assistant</h1>
          <p className={styles.subtitle}>
            The Shopping Assistant autonomously guides shoppers during their online purchase journey.{' '}
            <a>Learn more about Shopping Assistant →</a>
          </p>
        </div>
        <button className={styles.btnCreate} onClick={() => navigate('/shopping-assistant/builder')}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          Create
        </button>
      </div>

      <div className={styles.list}>
        {assistants.map(a => (
          <div key={a.id} className={styles.row} onClick={() => navigate('/shopping-assistant/builder')}>
            <span className={styles.name}>{a.name}</span>
            <span className={styles.meta}>{a.meta}</span>
            <span className={styles.lang}>{a.lang}</span>
            <label className={styles.toggle} onClick={e => e.stopPropagation()}>
              <input type="checkbox" checked={a.active} onChange={() => handleToggle(a.id)} />
              <span className={styles.toggleTrack} />
            </label>
            <span className={`${styles.toggleStatus} ${a.active ? styles.statusActive : ''}`}>
              {a.active ? 'Active' : 'Inactive'}
            </span>
            <div className={styles.actions} onClick={e => e.stopPropagation()}>
              <button
                className={styles.iconBtn}
                title="Edit"
                onClick={() => navigate('/shopping-assistant/builder')}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 2.5l2.5 2.5L5 13.5H2.5V11L11 2.5z"/>
                </svg>
              </button>
              <button className={styles.iconBtn} title="Duplicate" onClick={() => handleDuplicate(a)}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="5" width="8" height="9" rx="1.5"/>
                  <path d="M3 11V3a1.5 1.5 0 011.5-1.5H11"/>
                </svg>
              </button>
              <button className={`${styles.iconBtn} ${styles.iconBtnDanger}`} title="Delete" onClick={() => handleDelete(a.id)}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2.5 4.5h11M6 4.5V3a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v1.5M7 7.5v4M9 7.5v4M3.5 4.5l.9 8.1a.5.5 0 00.5.4h6.2a.5.5 0 00.5-.4l.9-8.1"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
