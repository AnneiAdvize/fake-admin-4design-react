import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Engagement.module.css'
import StrategyList from '../components/organisms/StrategyList'

const INITIAL_STRATEGIES = [
  { id: 1, name: 'Classic for VIP', page: 'Home', widget: 'Classic', conditions: ['Display after 6 seconds', 'Visitor is a VIP customer'], lastEdited: '6 days ago', status: 'Online' },
  { id: 2, name: 'Messaging for all', page: 'Home', widget: 'Messaging', conditions: [], lastEdited: '6 days ago', status: 'Offline' },
  { id: 3, name: 'All smartphones', page: 'Product details', widget: 'Conversation starters', conditions: ['Display after 6 seconds'], lastEdited: '10 days ago', status: 'Online' },
  { id: 4, name: 'All visitors', page: 'Purchase funnel', widget: 'Messaging', conditions: [], lastEdited: '3 months ago', status: 'Online' },
  { id: 5, name: 'Help for contact', page: 'Other pages', widget: 'Messaging', conditions: ['Display after 10 seconds', 'The current page contains /contact'], lastEdited: '5 days ago', status: 'Online' },
  { id: 6, name: 'Help for VIP', page: 'All pages', widget: 'Classic', conditions: ['The current page contains #product', "The current page doesn't contain #product/best-sellers"], lastEdited: '12 days ago', status: 'Online' },
]

const FILTER_OPTIONS = {
  page:   ['Home', 'Product details', 'Purchase funnel', 'Other pages', 'All pages'],
  widget: ['Classic', 'Messaging', 'Conversation starters'],
  status: ['Online', 'Offline'],
}
const FILTER_LABELS = { page: 'Page type', widget: 'Widget', status: 'Status' }

export default function Engagement() {
  const navigate = useNavigate()
  const [strategies, setStrategies]       = useState(INITIAL_STRATEGIES)
  const [search, setSearch]               = useState('')
  const [activeFilters, setActiveFilters] = useState({ page: [], widget: [], status: [] })
  const [filterOpen, setFilterOpen]       = useState(false)
  const [filterRect, setFilterRect]       = useState(null)
  const [filterSearch, setFilterSearch]   = useState('')
  const [expandedCat, setExpandedCat]     = useState(null)
  const [openKebab, setOpenKebab]         = useState(null)
  const [condAnchor, setCondAnchor]       = useState(null)
  const [wPreview, setWPreview]           = useState(null)
  const [deleteTarget, setDeleteTarget]   = useState(null)

  const filtered = strategies.filter(s => {
    const q = search.toLowerCase()
    return (!q || s.name.toLowerCase().includes(q))
      && (activeFilters.page.length   === 0 || activeFilters.page.includes(s.page))
      && (activeFilters.widget.length === 0 || activeFilters.widget.includes(s.widget))
      && (activeFilters.status.length === 0 || activeFilters.status.includes(s.status))
  })

  function closeAll() { setFilterOpen(false); setOpenKebab(null); setCondAnchor(null); setWPreview(null) }

  function handleFilterBtnClick(e) {
    e.stopPropagation()
    if (filterOpen) { setFilterOpen(false); return }
    const rect = e.currentTarget.getBoundingClientRect()
    setFilterRect(rect); setFilterSearch(''); setExpandedCat(null); setFilterOpen(true)
  }

  function toggleFilterValue(type, value) {
    setActiveFilters(prev => {
      const arr = prev[type]
      return { ...prev, [type]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] }
    })
  }

  function removeFilter(type, value) {
    setActiveFilters(prev => ({ ...prev, [type]: prev[type].filter(v => v !== value) }))
  }

  const visibleCats = Object.keys(FILTER_OPTIONS).filter(cat =>
    !filterSearch || FILTER_LABELS[cat].toLowerCase().includes(filterSearch.toLowerCase())
  )

  function handleEyeClick(e, s) {
    e.stopPropagation()
    if (wPreview?.id === s.id) { setWPreview(null); return }
    const rect = e.currentTarget.getBoundingClientRect()
    setCondAnchor(null); setOpenKebab(null)
    setWPreview({ id: s.id, widget: s.widget, rect })
  }

  function handleCondClick(e, s) {
    e.stopPropagation()
    if (condAnchor?.id === s.id) { setCondAnchor(null); return }
    const rect = e.currentTarget.getBoundingClientRect()
    setWPreview(null); setOpenKebab(null)
    setCondAnchor({ id: s.id, conditions: s.conditions, rect })
  }

  function handleSwitch(id) {
    setStrategies(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Online' ? 'Offline' : 'Online' } : s))
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

  const filterStyle = filterRect ? { top: filterRect.bottom + 6, left: Math.max(8, filterRect.right - 318) } : {}
  const wStyle = wPreview?.rect ? (() => {
    const r = wPreview.rect
    let top = r.bottom + 8, left = r.left - 140
    if (left < 8) left = 8
    if (left + 300 > window.innerWidth) left = window.innerWidth - 308
    if (top + 250 > window.innerHeight) top = r.top - 258
    return { top, left }
  })() : {}
  const condStyle = condAnchor?.rect ? (() => {
    const r = condAnchor.rect
    let top = r.bottom + 8, left = r.left
    if (left + 364 > window.innerWidth) left = window.innerWidth - 372
    if (top + 150 > window.innerHeight) top = r.top - 158
    return { top, left }
  })() : {}

  return (
    <div onClick={closeAll}>
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

      <StrategyList
        filteredStrategies={filtered}
        search={search}
        onSearch={e => setSearch(e.target.value)}
        activeFilters={activeFilters}
        filterLabels={FILTER_LABELS}
        onRemoveFilter={removeFilter}
        onFilterBtnClick={handleFilterBtnClick}
        openKebab={openKebab}
        setOpenKebab={setOpenKebab}
        condAnchor={condAnchor}
        wPreview={wPreview}
        onEyeClick={handleEyeClick}
        onCondClick={handleCondClick}
        onSwitch={handleSwitch}
        onDuplicate={handleDuplicate}
        setDeleteTarget={setDeleteTarget}
        navigate={navigate}
      />

      {filterOpen && filterRect && (
        <div className={styles.filterDropdown} style={filterStyle} onClick={e => e.stopPropagation()}>
          <div className={styles.filterDropdownTitle}>Add filter</div>
          <input className={styles.filterDropdownSearch} type="text" placeholder="Search filters..." value={filterSearch} onChange={e => setFilterSearch(e.target.value)} autoFocus />
          {visibleCats.map(cat => (
            <div key={cat}>
              <div className={styles.filterCategory} onClick={() => setExpandedCat(expandedCat === cat ? null : cat)}>
                <span>{FILTER_LABELS[cat]}</span>
                <svg className={expandedCat === cat ? styles.filterCategoryArrowOpen : ''} width="5" height="10" viewBox="0 0 5 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1 1l3 4-3 4"/></svg>
              </div>
              {expandedCat === cat && (
                <div className={styles.filterValues}>
                  {FILTER_OPTIONS[cat].map(val => (
                    <label key={val} className={styles.filterValueItem}>
                      <input type="checkbox" checked={activeFilters[cat].includes(val)} onChange={() => toggleFilterValue(cat, val)} />
                      {val}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {wPreview && (
        <div className={styles.widgetPopover} style={wStyle} onClick={e => e.stopPropagation()}>
          <WidgetPreview widget={wPreview.widget} />
        </div>
      )}

      {condAnchor && (
        <div className={styles.conditionsPopover} style={condStyle} onClick={e => e.stopPropagation()}>
          <div className={styles.conditionsTitle}>My widget will display if</div>
          <ul className={styles.conditionsList}>
            {condAnchor.conditions.map((c, i) => (
              <li key={i}>{c}{i < condAnchor.conditions.length - 1 && <> <strong>and</strong></>}</li>
            ))}
          </ul>
        </div>
      )}

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

function WidgetPreview({ widget }) {
  const Avatar = () => (
    <div className={styles.previewAvatar}>
      <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="20" cy="20" r="20" fill="#c8c8c8"/>
        <ellipse cx="20" cy="15" rx="7" ry="7" fill="#d4a76a"/>
        <ellipse cx="20" cy="30" rx="12" ry="9" fill="#e8d5c0"/>
      </svg>
      {widget === 'Classic' && <div className={styles.previewAvatarDot}/>}
    </div>
  )
  if (widget === 'Classic') return (
    <div className={styles.classicPreview}>
      <div className={styles.classicHeader}>Need help?</div>
      <div className={styles.classicBody}><Avatar /><p className={styles.classicText}>An agent is available to answer you live.</p></div>
      <div className={styles.classicCta}>Ask your question</div>
    </div>
  )
  if (widget === 'Messaging') return (
    <div className={styles.messagingPreview}>
      <Avatar />
      <div className={styles.messagingBubble}>An agent is available to answer you live.</div>
    </div>
  )
  return (
    <div className={styles.csPreview}>
      <div className={styles.csHeader}>
        <div className={styles.csAvatar}><svg width="18" height="18" viewBox="0 0 20 20" fill="white"><path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 3a2 2 0 110 4 2 2 0 010-4zm0 9c-2.67 0-5-1.34-5-2.5S7.33 9 10 9s5 1.34 5 2.5S12.67 14 10 14z"/></svg></div>
        <span className={styles.csTitle}>Need help with your search?</span>
      </div>
      <div className={styles.csChips}>
        <span className={styles.csChip}>Does the gamepad work on Windows 11?</span>
        <span className={styles.csChip}>Can I use the gamepad on console?</span>
        <span className={styles.csChip}>How quickly can it be delivered?</span>
      </div>
      <span className={styles.csAsk}>Ask my question</span>
    </div>
  )
}
