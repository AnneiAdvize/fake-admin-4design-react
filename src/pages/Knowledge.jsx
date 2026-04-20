import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Knowledge.module.css'

const INITIAL_SECTIONS = [
  {
    id: 'catalog',
    title: 'Your Catalog',
    badge: 'Product',
    usedBy: 'Used by AISA',
    expanded: true,
    sources: [
      { id: 1, name: 'Google Feed 2025', active: true, type: 'Google Shopping', date: 'Last update: 02/03/2023', dest: '/knowledge/catalog' },
      { id: 2, name: 'feed-2024', active: false, type: 'CSV File', date: 'Last update: 02/03/2023', dest: '/knowledge/catalog' },
    ],
  },
  {
    id: 'general',
    title: 'General Knowledge',
    badge: 'Helpful contents',
    usedBy: 'Used by AISA',
    expanded: true,
    sources: [
      { id: 3, name: 'FAQ 2024', active: true, type: 'FAQ', date: 'Last update: 12/12/2023', dest: '/knowledge/faq' },
      { id: 4, name: 'Website content extract 2024', active: true, type: 'Web scraping', date: 'Last update: 11/08/2023', dest: '/knowledge/faq' },
    ],
  },
]

export default function Knowledge() {
  const navigate = useNavigate()
  const [sections, setSections] = useState(INITIAL_SECTIONS)

  function toggleExpand(sectionId) {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, expanded: !s.expanded } : s))
  }

  function toggleSource(sectionId, sourceId) {
    setSections(prev => prev.map(s =>
      s.id === sectionId
        ? { ...s, sources: s.sources.map(src => src.id === sourceId ? { ...src, active: !src.active } : src) }
        : s
    ))
  }

  return (
    <div>
      <div className={styles.pageHead}>
        <h1 className={styles.title}>Knowledge</h1>
        <button className={styles.btnAdd}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          Add
        </button>
      </div>

      {sections.map(section => (
        <div key={section.id} className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleGroup}>
              <div className={styles.titleRow}>
                <span className={styles.sectionTitle}>{section.title}</span>
                <span className={styles.ksBadge}>
                  {section.badge}
                  <span className={styles.infoIcon} title="Information about this knowledge type">i</span>
                </span>
                <span className={styles.ksBadge}>{section.usedBy}</span>
              </div>
              <button
                className={styles.expandBtn}
                aria-expanded={section.expanded}
                onClick={() => toggleExpand(section.id)}
              >
                <span className={`${styles.expandIcon} ${section.expanded ? styles.expandIconOpen : ''}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {section.sources.length} sources
              </button>
            </div>
            <div className={styles.headerRight}>
              <button className={styles.btnExplore}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="6" cy="6" r="4"/><path d="M8 8.5L11 11.5" strokeLinecap="round"/>
                </svg>
                Explore
              </button>
              <button className={styles.kebabBtn} aria-label="More options">⋮</button>
            </div>
          </div>

          {section.expanded && (
            <div className={styles.sources}>
              {section.sources.map(src => (
                <div
                  key={src.id}
                  className={styles.sourceRow}
                  onClick={() => navigate(src.dest)}
                >
                  <span className={styles.sourceName}>{src.name}</span>
                  <div className={styles.toggleWrap} onClick={e => e.stopPropagation()}>
                    <button
                      className={`${styles.toggle} ${src.active ? styles.toggleOn : styles.toggleOff}`}
                      onClick={() => toggleSource(section.id, src.id)}
                      aria-label={src.active ? 'Deactivate' : 'Activate'}
                    >
                      <span className={styles.toggleThumb} />
                    </button>
                    <span className={styles.sourceStatus}>{src.active ? 'Active' : 'Inactive'}</span>
                  </div>
                  <div className={styles.badgeWrap}>
                    <span className={styles.typeBadge}>{src.type}</span>
                  </div>
                  <span className={styles.sourceDate}>{src.date}</span>
                  <div className={styles.sourceActions} onClick={e => e.stopPropagation()}>
                    <button className={styles.iconBtn} title="Refresh">
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1.5 7A5.5 5.5 0 0 1 12 4M12 4V1.5M12 4H9.5"/>
                        <path d="M12.5 7A5.5 5.5 0 0 1 2 10M2 10v2.5M2 10h2.5"/>
                      </svg>
                    </button>
                    <button className={styles.iconBtn} title="Download">
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 1v8M4 6l3 3 3-3M2 12h10"/>
                      </svg>
                    </button>
                    <button className={styles.iconBtn} title="Edit">
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z"/>
                      </svg>
                    </button>
                    <button className={`${styles.iconBtn} ${styles.iconBtnDanger}`} title="Delete">
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 4h10M5 4V2.5h4V4M5.5 7v4M8.5 7v4M3 4l.8 8h6.4L11 4"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
