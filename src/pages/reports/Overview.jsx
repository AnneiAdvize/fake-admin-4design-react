import styles from './Overview.module.css'

const TOPICS = [
  { topic: 'Payment options',                  convs: '1 459', csat: '46%', csatBad: true, automation: '3%',  conv: '3,3%', revenue: '2 367 €', aov: '2 367 €', answerRate: '60%' },
  { topic: 'Account management',               convs: '230',   csat: '53%', csatBad: false, automation: '50%', conv: '2,4%', revenue: '1 125 €', aov: '1 125 €', answerRate: '50%' },
  { topic: 'Questions about a product',        convs: '127',   csat: '25%', csatBad: true,  automation: '38%', conv: '5,8%', revenue: '567 €',   aov: '567 €',   answerRate: '38%' },
  { topic: 'Order management',                 convs: '890',   csat: '42%', csatBad: true,  automation: '18%', conv: '1,7%', revenue: '678 €',   aov: '678 €',   answerRate: '28%' },
  { topic: 'After-sales — Return and refund inquiry', convs: '456', csat: '19%', csatBad: true, automation: '53%', conv: '8,9%', revenue: '3 245 €', aov: '3 245 €', answerRate: '79%' },
]

export default function Overview() {
  return (
    <div>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Overview</h1>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.dateBtn}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="2" y="3" width="12" height="12" rx="1.5"/><path d="M2 7h12M5 1v2M11 1v2"/>
            </svg>
            May 5 – June 15, 2025
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.projectBtn}>
            <span className={styles.projectLabel}>Projects:</span> All
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.btnAddFilter}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Add filter
          </button>
        </div>
      </header>

      {/* KPI row */}
      <div className={styles.kpiRow}>
        {[
          { label: 'Revenue',         value: '24 690', unit: ' €', sub: '12% of total' },
          { label: 'Conversion rate', value: '12',     unit: '%',  sub: 'vs 0% for global website' },
          { label: 'Engagement rate', value: '1,65',   unit: '%',  sub: '\u00a0', selected: true },
          { label: 'CSAT',            value: '68,1',   unit: '%',  sub: '\u00a0' },
          { label: 'Conversations',   value: '2 203',  unit: '',   sub: '\u00a0' },
        ].map(kpi => (
          <div key={kpi.label} className={`${styles.kpiCard} ${kpi.selected ? styles.kpiSelected : ''}`}>
            <div className={styles.kpiLabel}>
              {kpi.label} <span className={styles.infoI}>i</span>
            </div>
            <div className={styles.kpiValue}>
              {kpi.value}<span className={styles.kpiUnit}>{kpi.unit}</span>
            </div>
            <div className={styles.kpiSub}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className={styles.charts2col}>
        <div className={styles.chartSection}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}>Engagement rate <span className={styles.infoI} style={{ verticalAlign: 'middle' }}>i</span></div>
            <div className={styles.chartValue}>1,65%</div>
          </div>
          <div className={styles.chartBody}>
            <svg viewBox="0 0 560 160" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}>
              <text x="26" y="16" className={styles.axisY}>9%</text>
              <text x="26" y="48" className={styles.axisY}>6%</text>
              <text x="26" y="80" className={styles.axisY}>3%</text>
              <text x="26" y="112" className={styles.axisY}>0%</text>
              <line x1="32" y1="12" x2="555" y2="12" stroke="#D1D1CB" strokeWidth="0.7"/>
              <line x1="32" y1="44" x2="555" y2="44" stroke="#D1D1CB" strokeWidth="0.7"/>
              <line x1="32" y1="76" x2="555" y2="76" stroke="#D1D1CB" strokeWidth="0.7"/>
              <line x1="32" y1="108" x2="555" y2="108" stroke="#D1D1CB" strokeWidth="0.7"/>
              <text x="42" y="130" className={styles.axisX} textAnchor="middle">5/05/25</text>
              <text x="130" y="130" className={styles.axisX} textAnchor="middle">12/05/25</text>
              <text x="218" y="130" className={styles.axisX} textAnchor="middle">19/05/25</text>
              <text x="306" y="130" className={styles.axisX} textAnchor="middle">26/05/25</text>
              <text x="394" y="130" className={styles.axisX} textAnchor="middle">2/06/25</text>
              <text x="482" y="130" className={styles.axisX} textAnchor="middle">9/06/25</text>
              <text x="549" y="130" className={styles.axisX} textAnchor="middle">13/06/25</text>
              <defs>
                <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01"/>
                </linearGradient>
              </defs>
              <polygon points="42,88 130,92 218,85 306,90 394,87 482,91 549,89 549,108 42,108" fill="url(#engGrad)"/>
              <polyline points="42,88 130,92 218,85 306,90 394,87 482,91 549,89" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
              {[42, 130, 218, 306, 394, 482, 549].map((cx, i) => (
                <circle key={i} cx={cx} cy={[88,92,85,90,87,91,89][i]} r="3" fill="#3b82f6"/>
              ))}
            </svg>
          </div>
        </div>

        <div className={styles.chartSection}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}>Copilot answer rate <span className={styles.infoI} style={{ verticalAlign: 'middle' }}>i</span></div>
            <div className={styles.chartValue}>83,22%</div>
          </div>
          <div className={styles.chartBody}>
            <svg viewBox="0 0 560 160" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}>
              <text x="34" y="16" className={styles.axisY}>100%</text>
              <text x="34" y="48" className={styles.axisY}>80%</text>
              <text x="34" y="80" className={styles.axisY}>60%</text>
              <text x="34" y="112" className={styles.axisY}>20%</text>
              <line x1="38" y1="12" x2="555" y2="12" stroke="#D1D1CB" strokeWidth="0.7"/>
              <line x1="38" y1="44" x2="555" y2="44" stroke="#D1D1CB" strokeWidth="0.7"/>
              <line x1="38" y1="76" x2="555" y2="76" stroke="#D1D1CB" strokeWidth="0.7"/>
              <line x1="38" y1="108" x2="555" y2="108" stroke="#D1D1CB" strokeWidth="0.7"/>
              <text x="42" y="130" className={styles.axisX} textAnchor="middle">5/05/25</text>
              <text x="130" y="130" className={styles.axisX} textAnchor="middle">12/05/25</text>
              <text x="218" y="130" className={styles.axisX} textAnchor="middle">19/05/25</text>
              <text x="306" y="130" className={styles.axisX} textAnchor="middle">26/05/25</text>
              <text x="394" y="130" className={styles.axisX} textAnchor="middle">2/06/25</text>
              <text x="482" y="130" className={styles.axisX} textAnchor="middle">9/06/25</text>
              <text x="549" y="130" className={styles.axisX} textAnchor="middle">13/06/25</text>
              <defs>
                <linearGradient id="ansGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0B3B37" stopOpacity="0.14"/>
                  <stop offset="100%" stopColor="#0B3B37" stopOpacity="0.01"/>
                </linearGradient>
              </defs>
              <polygon points="42,32 130,27 218,29 306,25 394,27 482,28 549,29 549,108 42,108" fill="url(#ansGrad)"/>
              <polyline points="42,32 130,27 218,29 306,25 394,27 482,28 549,29" fill="none" stroke="#0B3B37" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
              {[42, 130, 218, 306, 394, 482, 549].map((cx, i) => (
                <circle key={i} cx={cx} cy={[32,27,29,25,27,28,29][i]} r="3" fill="#0B3B37"/>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Topics table */}
      <div className={styles.topicsSection}>
        <div className={styles.topicsHeader}>
          <h2 className={styles.topicsTitle}>Recurrent topics in AI conversations</h2>
          <button className={styles.kebabBtn} aria-label="More options">⋮</button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th} style={{ width: 220 }}>AI Topics</th>
              <th className={`${styles.th} ${styles.thSortable}`}>Conversations <span className={styles.sortArrow}>↕</span></th>
              <th className={`${styles.th} ${styles.thSortable}`}>CSAT <span className={styles.sortArrow}>↕</span></th>
              <th className={`${styles.th} ${styles.thSortable}`}>Automation % <span className={styles.sortArrow}>↕</span></th>
              <th className={`${styles.th} ${styles.thSortable}`}>Conversion <span className={styles.sortArrow}>↕</span></th>
              <th className={`${styles.th} ${styles.thSortable}`}>Revenue <span className={styles.sortArrow}>↕</span></th>
              <th className={`${styles.th} ${styles.thSortable}`}>AOV <span className={styles.sortArrow}>↕</span></th>
              <th className={`${styles.th} ${styles.thSortable}`}>Answer rate <span className={styles.sortArrow}>↕</span></th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {TOPICS.map((t, i) => (
              <tr key={i} className={styles.tr}>
                <td className={`${styles.td} ${styles.tdTopic}`}>{t.topic}</td>
                <td className={`${styles.td} ${styles.tdNum}`}>{t.convs}</td>
                <td className={styles.td}>
                  <span className={`${styles.csatBadge} ${t.csatBad ? styles.csatBad : styles.csatGood}`}>{t.csat}</span>
                </td>
                <td className={`${styles.td} ${styles.tdNum}`}>{t.automation}</td>
                <td className={`${styles.td} ${styles.tdNum}`}>{t.conv}</td>
                <td className={`${styles.td} ${styles.tdNum}`}>{t.revenue}</td>
                <td className={`${styles.td} ${styles.tdNum}`}>{t.aov}</td>
                <td className={`${styles.td} ${styles.tdNum}`}>{t.answerRate}</td>
                <td className={styles.td}><button className={styles.actionLink}>Add knowledge</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.viewMoreRow}>
          <button className={styles.btnViewMore}>View more</button>
        </div>
      </div>
    </div>
  )
}
