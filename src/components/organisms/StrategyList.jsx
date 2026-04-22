import styles from './StrategyList.module.css'
import PageHeader from './PageHeader'
import Badge from '../atoms/Badge'

export default function StrategyList({
  strategies,
  filteredStrategies,
  onEdit,
  onDelete,
  onSearch,
  onAdd,
  search,
  activeFilters,
  filterLabels,
  onRemoveFilter,
  onFilterBtnClick,
  openKebab,
  setOpenKebab,
  condAnchor,
  wPreview,
  onEyeClick,
  onCondClick,
  onSwitch,
  onDuplicate,
  navigate,
  filterOpen,
  filterRect,
  filterStyle,
  wStyle,
  condStyle,
  expandedCat,
  setExpandedCat,
  filterSearch,
  setFilterSearch,
  filterOptions,
  visibleCats,
  toggleFilterValue,
  deleteTarget,
  setDeleteTarget,
  confirmDelete,
}) {
  const hasFilters = Object.values(activeFilters).some(a => a.length > 0)

  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.cardTitle}>Engagement strategies list</span>
        <span className={styles.countBadge}>{filteredStrategies.length}</span>
      </div>

      <div className={styles.filterBar} onClick={e => e.stopPropagation()}>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="6" cy="6" r="4"/><path d="M9.5 9.5L12 12" strokeLinecap="round"/>
          </svg>
          <input className={styles.searchInput} type="text" placeholder="Search by name" value={search} onChange={onSearch} />
        </div>

        {hasFilters && (
          <div className={styles.filterChips}>
            {Object.entries(activeFilters).flatMap(([type, vals]) =>
              vals.map(val => (
                <div key={`${type}-${val}`} className={styles.filterChip}>
                  <span className={styles.filterChipLabel}>{filterLabels[type]}:</span>
                  <span className={styles.filterChipValue}>{val}</span>
                  <button className={styles.filterChipRemove} onClick={() => onRemoveFilter(type, val)} title="Remove">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1 1l6 6M7 1l-6 6"/></svg>
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        <button className={styles.btnAddFilter} onClick={onFilterBtnClick}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          Add a filter
        </button>
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
          {filteredStrategies.map(s => (
            <tr key={s.id} className={styles.row} onClick={e => {
              const skip = [styles.kebabWrap, styles.widgetCell, styles.conditionChip]
              if (skip.some(cls => e.target.closest(`.${cls}`))) return
              navigate('/engagement/builder')
            }}>
              <td className={`${styles.td} ${styles.tdName}`}>{s.name}</td>
              <td className={`${styles.td} ${styles.tdSec}`}>{s.page}</td>
              <td className={styles.td}>
                <div className={styles.widgetCell}>
                  {s.widget}
                  <svg
                    className={`${styles.widgetEye} ${wPreview?.id === s.id ? styles.widgetEyeActive : ''}`}
                    onClick={e => onEyeClick(e, s)}
                    width="14" height="14" viewBox="0 0 16 16" fill="none"
                    stroke="currentColor" strokeWidth="1.5" aria-label="Preview widget"
                  >
                    <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/>
                    <circle cx="8" cy="8" r="2"/>
                  </svg>
                </div>
              </td>
              <td className={styles.td}>
                {s.conditions.length === 0 && <span className={styles.tdSec}>—</span>}
                {s.conditions.length === 1 && <span className={styles.tdSec}>{s.conditions[0]}</span>}
                {s.conditions.length > 1 && (
                  <button className={styles.conditionChip} onClick={e => onCondClick(e, s)}>
                    {s.conditions.length} conditions
                    <svg width="8" height="5" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                )}
              </td>
              <td className={`${styles.td} ${styles.tdSec}`}>{s.lastEdited}</td>
              <td className={styles.td}>
                <Badge variant={s.status === 'Online' ? 'success' : 'neutral'} label={s.status} />
              </td>
              <td className={styles.td}>
                <div className={styles.kebabWrap} onClick={e => e.stopPropagation()}>
                  <button
                    className={`${styles.kebabBtn} ${openKebab === s.id ? styles.kebabActive : ''}`}
                    onClick={() => setOpenKebab(openKebab === s.id ? null : s.id)}
                    aria-label="More actions"
                  >⋮</button>
                  {openKebab === s.id && (
                    <div className={styles.kebabMenu}>
                      <button className={styles.kebabItem} onClick={() => navigate('/engagement/builder')}>
                        <IcoEye /> Preview
                      </button>
                      <button className={styles.kebabItem} onClick={() => navigate('/engagement/builder')}>
                        <IcoEdit /> Edit
                      </button>
                      <button className={styles.kebabItem} onClick={() => onSwitch(s.id)}>
                        <IcoSwitch /> {s.status === 'Online' ? 'Switch offline' : 'Switch online'}
                      </button>
                      <button className={styles.kebabItem} onClick={() => onDuplicate(s)}>
                        <IcoDuplicate /> Duplicate
                      </button>
                      <button className={`${styles.kebabItem} ${styles.kebabDanger}`} onClick={() => { setDeleteTarget(s.id); setOpenKebab(null) }}>
                        <IcoDelete /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredStrategies.length === 0 && (
        <div className={styles.noResults}>No engagement strategies match your search or filters.</div>
      )}
    </div>
  )
}

const IcoEye = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/></svg>)
const IcoEdit = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 14l1.5-1.5L11 5l2 2-7.5 7.5L4 16zM9.5 6.5l2 2"/></svg>)
const IcoSwitch = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 8h10M10 5l3 3-3 3"/></svg>)
const IcoDuplicate = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="5" y="5" width="9" height="9" rx="1.5"/><path d="M2 11V3a1.5 1.5 0 011.5-1.5H11"/></svg>)
const IcoDelete = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 4h12M6 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4M7 7v4M9 7v4M4 4l.7 8.3a1 1 0 001 .7h4.6a1 1 0 001-.7L12 4"/></svg>)
