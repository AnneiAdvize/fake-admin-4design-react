import { useState } from 'react'
import styles from './Conversations.module.css'
import { ROWS } from './conversationsData'
import ConversationTable from '../../components/organisms/ConversationTable'
import ConversationDetail from '../../components/organisms/ConversationDetail'

const Chevron = () => <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>

export default function Conversations() {
  const [expandedId, setExpandedId] = useState(1)
  const [analysisPanel, setAnalysisPanel] = useState(null)

  function toggleRow(id) {
    setExpandedId(prev => { if (prev !== id) setAnalysisPanel(null); return prev === id ? null : id })
  }
  function handleAnalyze(rowId, msgIdx, variant) {
    setAnalysisPanel(prev => prev?.rowId === rowId && prev?.msgIdx === msgIdx ? null : { rowId, msgIdx, variant })
  }

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Conversations report <span className={styles.iconFav}>★</span></h1>
        <div className={styles.headerRight}>
          <button className={styles.dateBtn}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="12" height="12" rx="1.5"/><path d="M2 7h12M5 1v2M11 1v2"/></svg>
            Dec 10 – Dec 15, 2025 <Chevron />
          </button>
          <button className={styles.projectBtn}><span className={styles.projectLabel}>Projects:</span> All <Chevron /></button>
          <button className={styles.btnAddFilters}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            Add filters
          </button>
        </div>
      </header>

      <div className={analysisPanel ? styles.pageLayout : undefined}>
        <div className={analysisPanel ? styles.tableSide : undefined}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiLeft}>
              <div className={styles.kpiMetricLabel}>Closed conversations <span className={styles.iconFav}>★</span></div>
              <div className={styles.kpiMetricValue}>1,088</div>
              <div className={styles.kpiFooter}>
                <span className={styles.kpiTrendUp}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  +4.1%
                </span>
                <span className={styles.kpiTrendLabel}>vs previous period</span>
              </div>
            </div>
            <div className={styles.kpiChart}>
              <div className={styles.kpiChartHeader}>
                <span className={styles.kpiChartLabel}>Daily volume — Dec 2025</span>
                <span className={styles.kpiChartValue}>36.3 / day</span>
              </div>
              <svg viewBox="0 0 560 80" preserveAspectRatio="none" style={{ width: '100%', height: '80px', overflow: 'visible' }}>
                <defs><linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3BE1A4" stopOpacity="0.22"/><stop offset="100%" stopColor="#3BE1A4" stopOpacity="0.02"/></linearGradient></defs>
                <line x1="0" y1="20" x2="560" y2="20" stroke="#D1D1CB" strokeWidth="0.5"/><line x1="0" y1="40" x2="560" y2="40" stroke="#D1D1CB" strokeWidth="0.5"/><line x1="0" y1="60" x2="560" y2="60" stroke="#D1D1CB" strokeWidth="0.5"/>
                <polygon points="0,52 19,46 37,55 56,32 75,40 93,36 112,43 131,40 149,24 168,37 187,43 205,40 224,33 243,29 262,42 280,48 299,36 318,21 336,40 355,36 374,43 392,29 411,13 430,32 449,40 467,36 486,43 504,38 523,32 542,40 560,47 560,75 0,75" fill="url(#chartGrad)"/>
                <polyline points="0,52 19,46 37,55 56,32 75,40 93,36 112,43 131,40 149,24 168,37 187,43 205,40 224,33 243,29 262,42 280,48 299,36 318,21 336,40 355,36 374,43 392,29 411,13 430,32 449,40 467,36 486,43 504,38 523,32 542,40 560,47" fill="none" stroke="#3BE1A4" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <ConversationTable
            conversations={ROWS}
            expandedId={expandedId}
            analysisPanel={analysisPanel}
            onToggleRow={toggleRow}
            onAnalyze={handleAnalyze}
          />
        </div>
        {analysisPanel && (
          <ConversationDetail conversation={analysisPanel} onClose={() => setAnalysisPanel(null)} />
        )}
      </div>
    </div>
  )
}
