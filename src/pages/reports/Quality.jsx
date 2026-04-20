import { useState } from 'react'
import styles from './Quality.module.css'

const METRICS = [
  { label: 'Resolution rate',          value: '80%', trend: '+125', trendSub: 'resolved conversations', action: 'Review resolved conversations' },
  { label: 'Answer rate',              value: '76%', trend: '+125', trendSub: 'answered questions',     action: 'Review unanswered questions' },
  { label: 'Product catalog quality',  value: '68%', trend: '+3%',  trendSub: 'vs previous period',    action: 'Improve your product catalog' },
  { label: 'CSAT',                     value: '50%', trend: '+1%',  trendSub: 'vs previous period',    action: 'Review low satisfaction conversations' },
]

const PRODUCTS = [
  { name: 'Premier Cru — The Rich Cream',     sku: 'SKU-4821', color: 'linear-gradient(135deg,#D4AF37,#B8860B)', convs: 130, resRate: 50, resColor: 'amber', csat: 88, csatColor: 'green', conv: '9.1%' },
  { name: 'Premier Cru — The Cream',          sku: 'SKU-4822', color: 'linear-gradient(135deg,#F5C5A3,#E8A87C)', convs: 175, resRate: 52, resColor: 'amber', csat: 88, csatColor: 'green', conv: '9.1%' },
  { name: 'Premier Cru — The Eye Cream',      sku: 'SKU-4823', color: 'linear-gradient(135deg,#B8D4E8,#8AB4CC)', convs: 140, resRate: 37, resColor: 'red',   csat: 75, csatColor: 'amber', conv: '7.3%' },
  { name: 'Premier Cru — The Serum',          sku: 'SKU-4824', color: 'linear-gradient(135deg,#C8B4D4,#A898BC)', convs: 130, resRate: 35, resColor: 'red',   csat: 78, csatColor: 'amber', conv: '6.6%' },
  { name: 'Premier Cru — Global Anti-Aging…', sku: 'SKU-4825', color: 'linear-gradient(135deg,#8B7355,#6B5335)', convs: 35,  resRate: 51, resColor: 'amber', csat: 78, csatColor: 'amber', conv: '10.1%' },
]

const TABS = ['Products', 'Categories', 'Topics']

const TrendUp = ({ children }) => (
  <span className={styles.trendUp}>
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M4 7V1M1 4l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
    {children}
  </span>
)

const rateTextColor = { green: 'var(--color-success-text,#16a34a)', amber: 'var(--color-warning-text,#d97706)', red: 'var(--color-danger-text,#dc2626)' }

export default function Quality() {
  const [activeTab, setActiveTab] = useState('Products')

  return (
    <div>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Quality report <span className={styles.iconFav}>★</span></h1>
          <p className={styles.subtitle}>Based on <a className={styles.link}>2,175 conversations</a></p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.dateBtn}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="2" y="3" width="12" height="12" rx="1.5"/><path d="M2 7h12M5 1v2M11 1v2"/>
            </svg>
            Dec 10 – Dec 15, 2025
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button className={styles.projectBtn}><span className={styles.projectLabel}>Projects:</span> All <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <button className={styles.btnAddFilter}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            Add filters
          </button>
        </div>
      </header>

      <div className={styles.metricsSection}>
        <div className={styles.metricsTitle}>Main metrics</div>
        <div className={styles.metricsGrid}>
          {METRICS.map(m => (
            <div key={m.label} className={styles.metricCard}>
              <div className={styles.metricLabel}>{m.label}</div>
              <div className={styles.metricValue}>{m.value}</div>
              <div className={styles.metricFooter}>
                <TrendUp>{m.trend}</TrendUp>
                <span className={styles.metricSub}>{m.trendSub}</span>
              </div>
              <a className={styles.metricAction}>
                {m.action}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.aiSummary}>
        <div className={styles.aiSummaryHeader}>
          <div className={styles.aiSummaryIcon}>✦</div>
          <span className={styles.aiSummaryLabel}>AI Summary</span>
        </div>
        <p className={styles.aiSummaryText}>
          Your AI Shopping Assistant's <strong>answer rate</strong> and <strong>CSAT</strong> have improved!<br/>
          To boost them further, focus on enhancing AI knowledge on these topics, including <strong>product details</strong>, <strong>shipping</strong>, and <strong>recommendations</strong>. Reviewing low CSAT conversations about <strong>Product Releases</strong> and product details will also help.
        </p>
      </div>

      <div className={styles.qualitySection}>
        <div className={styles.qualityHeader}>
          <h2 className={styles.qualityTitle}>Quality by topics <span className={styles.iconFav}>★</span></h2>
        </div>
        <div className={styles.tabBar}>
          {TABS.map(tab => (
            <button key={tab} className={`${styles.tabItem} ${activeTab === tab ? styles.tabActive : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
          <div style={{ flex: 1 }} />
          <div className={styles.tabControls}>
            <div className={styles.perfSearch}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="6" r="4"/><path d="M9.5 9.5L12 12" strokeLinecap="round"/></svg>
              <input type="text" placeholder="Search by product name or ID" />
            </div>
            <button className={styles.btnExport}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v7M3 5l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Export
            </button>
          </div>
        </div>
        <table className={styles.qualTable}>
          <thead>
            <tr>
              <th className={styles.th} style={{ width: 280 }}># Products</th>
              <th className={styles.th}># Conversations</th>
              <th className={`${styles.th} ${styles.thActive}`}>Resolution rate <span style={{ opacity: .5 }}>↓</span></th>
              <th className={styles.th}>CSAT</th>
              <th className={styles.th}>Conversion rate</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p, i) => (
              <tr key={i} className={styles.qualRow}>
                <td className={styles.td}>
                  <div className={styles.prodCell}>
                    <div className={styles.prodThumb} style={{ background: p.color }} />
                    <div>
                      <div className={styles.prodName}>{p.name}</div>
                      <div className={styles.prodSku}>{p.sku}</div>
                    </div>
                  </div>
                </td>
                <td className={`${styles.td} ${styles.tdNum}`}>{p.convs}</td>
                <td className={styles.td}>
                  <div className={styles.rateCell}>
                    <span className={styles.rateVal} style={{ color: rateTextColor[p.resColor] }}>{p.resRate}%</span>
                    <div className={styles.rateBarBg}><div className={`${styles.rateBarFill} ${styles[p.resColor]}`} style={{ width: `${p.resRate}%` }}/></div>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.rateCell}>
                    <span className={styles.rateVal} style={{ color: rateTextColor[p.csatColor] }}>{p.csat}%</span>
                    <div className={styles.rateBarBg}><div className={`${styles.rateBarFill} ${styles[p.csatColor]}`} style={{ width: `${p.csat}%` }}/></div>
                  </div>
                </td>
                <td className={`${styles.td} ${styles.tdNum}`}>{p.conv}</td>
                <td className={styles.td}>
                  <div className={styles.qualActions}>
                    <button className={styles.actionLink}>Read conversations</button>
                    <button className={`${styles.actionLink} ${styles.actionLinkAdd}`}>Add knowledge</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.viewMoreRow}>
          <button className={styles.btnViewMore}>View more</button>
        </div>
      </div>

      <div className={styles.chartsBottom}>
        {[
          { title: 'CSAT time evolution', value: '50%', gradient: 'csatGrad', points: '38,82 135,75 231,62 328,50 424,41 460,31' },
          { title: 'Resolution rate time evolution', value: '80%', gradient: 'resGrad', points: '38,70 135,58 231,49 328,38 424,32 460,22' },
        ].map((chart, ci) => (
          <div key={ci} className={styles.bottomChartCard}>
            <div className={styles.bottomChartHeader}>
              <span className={styles.bottomChartTitle}>{chart.title} <span className={styles.iconFav}>★</span></span>
              <button className={styles.byBtn}>By: All <svg width="8" height="5" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            </div>
            <div className={styles.bottomChartBody}>
              <div className={styles.bottomChartKpi}>
                <span className={styles.bottomChartVal}>{chart.value}</span>
                <TrendUp>+13.5%</TrendUp>
              </div>
              <svg viewBox="0 0 460 130" preserveAspectRatio="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
                <defs>
                  <linearGradient id={chart.gradient} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3BE1A4" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#3BE1A4" stopOpacity="0.02"/>
                  </linearGradient>
                </defs>
                <text x="34" y="15" className={styles.axisY}>12k</text>
                <text x="34" y="48" className={styles.axisY}>8k</text>
                <text x="34" y="81" className={styles.axisY}>4k</text>
                <text x="34" y="110" className={styles.axisY}>0</text>
                {[12, 45, 78, 108].map((y, i) => <line key={i} x1="38" y1={y} x2="460" y2={y} stroke="#D1D1CB" strokeWidth="0.5"/>)}
                {['10/12','11/12','12/12','13/12','14/12'].map((d, i) => (
                  <text key={i} x={[38,135,231,328,424][i]} y="125" className={styles.axisX} textAnchor="middle">{d}</text>
                ))}
                <polygon points={chart.points.split(' ').join(' ') + ` 460,108 38,108`} fill={`url(#${chart.gradient})`}/>
                <polyline points={chart.points} fill="none" stroke="#3BE1A4" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
