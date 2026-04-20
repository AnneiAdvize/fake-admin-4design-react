import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import styles from './Engagement.module.css'

const INITIAL_STRATEGIES = [
  { id: 1, name: 'Classic for VIP', page: 'Home', widget: 'Classic', conditions: ['Display after 6 seconds', 'Visitor is a VIP customer'], lastEdited: '6 days ago', status: 'Online' },
  { id: 2, name: 'Messaging for all', page: 'Home', widget: 'Messaging', conditions: [], lastEdited: '6 days ago', status: 'Offline' },
  { id: 3, name: 'All smartphones', page: 'Product details', widget: 'Conversation starters', conditions: ['Display after 6 seconds'], lastEdited: '10 days ago', status: 'Online' },
  { id: 4, name: 'All visitors', page: 'Purchase funnel', widget: 'Messaging', conditions: [], lastEdited: '3 months ago', status: 'Online' },
  { id: 5, name: 'Help for contact', page: 'Other pages', widget: 'Messaging', conditions: ['Display after 10 seconds', 'The current page contains /contact'], lastEdited: '5 days ago', status: 'Online' },
  { id: 6, name: 'Help for VIP', page: 'All pages', widget: 'Classic', conditions: ['The current page contains #product', "The current page doesn't contain #product/best-sellers"], lastEdited: '12 days ago', status: 'Online' },
]

export default function Engagement() {
  const navigate = useNavigate()
  const [strategies, setStrategies] = useState(INITIAL_STRATEGIES)
  const [search, setSearch] = useState('')
  const [openKebab, setOpenKebab] = useState(null)
  const [openConditions, setOpenConditions] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = strategies.filter(s =>
    !search || s.name.toLowerCase().includes(search.toLowerCase())
  )

  function handleSwitch(id) {
    setStrategies(prev => prev.map(s =>
      s.id === id ? { ...s, status: s.status === 'Online' ? 'Offline' : 'Online' } : s
    ))
    setOpenKebab(null)
  }

  function handleDuplicate(s) {
    setStrategies(prev => [...prev, { ...s, id: Date.now(), name: 'Copy of ' + s.name, lastEdited: 'Just now', status: 'Offline' }])
    setOpenKebab(null)
  }

  function confirmDelete() {
    setStrategies(prev => prev.filter(s => s.id !== deleteTarget))
    setDeleteTarget(null)
  }

  function handleRowClick(e, id) {
    if (e.target.closest(`.${styles.kebabWrap}`) || e.target.closest(`.${styles.conditionChip}`)) return
    navigate('/engagement/builder')
  }

  return (
    <div onClick={() => { setOpenKebab(null); setOpenConditions(null) }}>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Engagement strategies</h1>
          <p className={styles.subtitle}>
            Set widgets adapted to each page type to guide visitors and boost conversions.{' '}
            <a>Learn how to create conversion-driven engagement strategy →</a>
          </p>
        </div>
        <button className={styles.btnCreate} onClick={() => navigate('/engagement/builder')}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          Create
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <span className={styles.cardTitle}>Engagement strategies list</span>
          <span className={styles.countBadge}>{filtered.length}</span>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="6" cy="6" r="4"/><path d="M9.5 9.5L12 12" strokeLinecap="round"/>
            </svg>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Page</th>
              <th className={styles.th}>Widget</th>
              <th className={styles.th}>Condition</th>
              <th className={styles.th}>Last edited</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className={styles.row} onClick={e => handleRowClick(e, s.id)}>
                <td className={`${styles.td} ${styles.tdName}`}>{s.name}</td>
                <td className={`${styles.td} ${styles.tdSec}`}>{s.page}</td>
                <td className={styles.td}>{s.widget}</td>
                <td className={styles.td}>
                  <ConditionCell
                    conditions={s.conditions}
                    isOpen={openConditions === s.id}
                    onToggle={e => { e.stopPropagation(); setOpenConditions(openConditions === s.id ? null : s.id) }}
                    styles={styles}
                  />
                </td>
                <td className={`${styles.td} ${styles.tdSec}`}>{s.lastEdited}</td>
                <td className={styles.td}>
                  <Badge variant={s.status === 'Online' ? 'success' : 'neutral'} label={s.status} />
                </td>
                <td className={styles.td}>
                  <div className={styles.kebabWrap} onClick={e => e.stopPropagation()}>
                    <button
                      className={`${styles.kebabBtn} ${openKebab === s.id ? styles.kebabActive : ''}`}
                      onClick={e => { e.stopPropagation(); setOpenKebab(openKebab === s.id ? null : s.id) }}
                      aria-label="More actions"
                    >⋮</button>
                    {openKebab === s.id && (
                      <div className={styles.kebabMenu}>
                        <button className={styles.kebabItem} onClick={() => navigate('/engagement/builder')}>Edit</button>
                        <button className={styles.kebabItem} onClick={() => handleSwitch(s.id)}>
                          {s.status === 'Online' ? 'Switch offline' : 'Switch online'}
                        </button>
                        <button className={styles.kebabItem} onClick={() => handleDuplicate(s)}>Duplicate</button>
                        <button className={`${styles.kebabItem} ${styles.kebabDanger}`} onClick={() => { setDeleteTarget(s.id); setOpenKebab(null) }}>Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className={styles.noResults}>No engagement strategies match your search.</div>
        )}
      </div>

      {deleteTarget !== null && (
        <div className={styles.overlay} onClick={() => setDeleteTarget(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTitle}>Delete engagement strategy</div>
            <div className={styles.modalDesc}>
              Are you sure you want to delete &ldquo;{strategies.find(s => s.id === deleteTarget)?.name}&rdquo;? This action cannot be undone.
            </div>
            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className={styles.btnDelete} onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ConditionCell({ conditions, isOpen, onToggle, styles }) {
  if (conditions.length === 0) return <span className={styles.tdSec}>—</span>
  if (conditions.length === 1) return <span className={styles.tdSec}>{conditions[0]}</span>
  return (
    <span style={{ position: 'relative' }}>
      <button className={styles.conditionChip} onClick={onToggle}>
        {conditions.length} conditions
        <svg width="8" height="5" viewBox="0 0 10 6" fill="none" aria-hidden="true">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {isOpen && (
        <div className={styles.conditionsPopover} onClick={e => e.stopPropagation()}>
          <div className={styles.conditionsTitle}>My widget will display if</div>
          <ul className={styles.conditionsList}>
            {conditions.map((c, i) => (
              <li key={i}>{c}{i < conditions.length - 1 && <> <strong>and</strong></>}</li>
            ))}
          </ul>
        </div>
      )}
    </span>
  )
}
