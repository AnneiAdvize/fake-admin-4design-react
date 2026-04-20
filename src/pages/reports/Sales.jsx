import { useState } from 'react'
import styles from './Sales.module.css'

const PRODUCTS = [
  { name: 'Premier Cru — The Rich Cream',        sku: 'SKU-4821', color: 'linear-gradient(135deg,#D4AF37,#B8860B)', convs: 180, cart: 24, orders: 14, revenue: '£1,638', convRate: 7.9 },
  { name: 'Premier Cru — The Cream',             sku: 'SKU-4822', color: 'linear-gradient(135deg,#F5C5A3,#E8A87C)', convs: 175, cart: 22, orders: 14, revenue: '£1,611', convRate: 8.0 },
  { name: 'Premier Cru — The Eye Cream',         sku: 'SKU-4823', color: 'linear-gradient(135deg,#B8D4E8,#8AB4CC)', convs: 140, cart: 37, orders: 17, revenue: '£1,488', convRate: 8.5 },
  { name: 'Premier Cru — The Serum',             sku: 'SKU-4824', color: 'linear-gradient(135deg,#C8B4D4,#A898BC)', convs: 140, cart: 20, orders: 22, revenue: '£1,209', convRate: 6.5 },
  { name: 'Premier Cru — Global Anti-Aging…',    sku: 'SKU-4825', color: 'linear-gradient(135deg,#8B7355,#6B5335)', convs: 90,  cart: 14, orders: 9,  revenue: '£2,350', convRate: 10.0 },
]

const TABS = ['Products', 'Categories', 'Engagement by designer', 'Conv. journeys']

const TrendUp = ({ children }) => (
  <span className={styles.trendUp}>
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M4 7V1M1 4l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
    {children}
  </span>
)

export default function Sales() {
  const [activeTab, setActiveTab] = useState('Products')
  const [infoDismissed, setInfoDismissed] = useState(false)

  return (
    <div>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Sales report <span className={styles.iconFav}>★</span></h1>
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

      {!infoDismissed && (
        <div className={styles.infoPanel}>
          <span className={styles.infoPanelIcon}>ℹ️</span>
          <div className={styles.infoPanelBody}>
            <div className={styles.infoPanelTitle}>How this report is calculated</div>
            <div className={styles.infoPanelText}>This report measures the sales impact of fully automated conversations. Transactions are counted if they occur within <strong>3 days</strong> of a fully automated conversation.</div>
          </div>
          <button className={styles.infoPanelClose} onClick={() => setInfoDismissed(true)} aria-label="Dismiss">✕</button>
        </div>
      )}

      <div className={styles.kpiRow}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Revenue per conversation <span className={styles.infoI}>i</span></div>
          <div className={styles.kpiValue}>£8.90</div>
          <div className={styles.kpiFooter}><TrendUp>+10.7%</TrendUp><span className={styles.kpiSub}>+£0.86 vs previous period</span></div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Conversion rate <span className={styles.infoI}>i</span></div>
          <div className={styles.kpiValue}>6.09%</div>
          <div className={styles.kpiFooter}><TrendUp>+0.3 pts</TrendUp><span className={styles.kpiSub}>vs previous period</span></div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Avg. order value <span className={styles.infoI}>i</span></div>
          <div className={styles.kpiValue}>£133.11</div>
          <div className={styles.kpiFooter}><TrendUp>+£14.96</TrendUp><span className={styles.kpiSub}>for AI-attributed orders</span></div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Orders <span className={styles.infoI}>i</span></div>
          <div className={styles.kpiValue}>152</div>
          <div className={styles.kpiFooter}><TrendUp>+10%</TrendUp><span className={styles.kpiSub}>of total orders this period</span></div>
        </div>
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <span className={styles.chartTitle}>AI-attributed revenue over time</span>
          <div className={styles.chartLegend}>
            <div className={styles.legendItem}><div className={`${styles.legendLine} ${styles.legendSolid}`}/> AI-attributed orders</div>
            <div className={styles.legendItem}><div className={`${styles.legendLine} ${styles.legendDashed}`}/> Assisted orders</div>
          </div>
        </div>
        <div className={styles.chartBody}>
          <svg viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B3B37" stopOpacity="0.14"/>
                <stop offset="100%" stopColor="#0B3B37" stopOpacity="0.01"/>
              </linearGradient>
              <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3BE1A4" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#3BE1A4" stopOpacity="0.01"/>
              </linearGradient>
            </defs>
            <text x="38" y="18" className={styles.axisY}>8,000</text>
            <text x="38" y="58" className={styles.axisY}>6,000</text>
            <text x="38" y="98" className={styles.axisY}>4,000</text>
            <text x="38" y="138" className={styles.axisY}>2,000</text>
            <text x="38" y="173" className={styles.axisY}>0</text>
            {[15, 55, 95, 135, 170].map((y, i) => <line key={i} x1="45" y1={y} x2="715" y2={y} stroke="#D1D1CB" strokeWidth="0.7"/>)}
            {['12/10/25','12/11/25','12/12/25','12/13/25','12/14/25','12/15/25'].map((d, i) => (
              <text key={i} x={[45,178,311,444,577,710][i]} y="188" className={styles.axisX} textAnchor="middle">{d}</text>
            ))}
            <polygon points="45,96 178,89 311,71 444,83 577,95 710,65 710,170 45,170" fill="url(#grad1)"/>
            <polyline points="45,96 178,89 311,71 444,83 577,95 710,65" fill="none" stroke="#0B3B37" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
            {[45,178,311,444,577,710].map((cx, i) => <circle key={i} cx={cx} cy={[96,89,71,83,95,65][i]} r="3.5" fill="#0B3B37"/>)}
            <polygon points="45,135 178,129 311,120 444,127 577,133 710,116 710,170 45,170" fill="url(#grad2)"/>
            <polyline points="45,135 178,129 311,120 444,127 577,133 710,116" fill="none" stroke="#3BE1A4" strokeWidth="2" strokeDasharray="6,4" strokeLinejoin="round" strokeLinecap="round"/>
            {[45,178,311,444,577,710].map((cx, i) => <circle key={i} cx={cx} cy={[135,129,120,127,133,116][i]} r="3" fill="#3BE1A4"/>)}
          </svg>
        </div>
      </div>

      <div className={styles.perfSection}>
        <div className={styles.perfHeader}>
          <h2 className={styles.perfTitle}>Top performances <span className={styles.iconFav}>★</span></h2>
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

        <table className={styles.prodTable}>
          <thead>
            <tr>
              <th className={styles.th} style={{ width: 300 }}>Products</th>
              <th className={`${styles.th} ${styles.thActive}`}># Conversations <span className={styles.sortIcon}>↓</span></th>
              <th className={styles.th}># Add to cart</th>
              <th className={styles.th}># Orders</th>
              <th className={styles.th}>Revenue</th>
              <th className={styles.th}>Conv. rate</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p, i) => (
              <tr key={i} className={styles.prodRow}>
                <td className={styles.td}>
                  <div className={styles.prodCell}>
                    <div className={styles.prodThumb} style={{ background: p.color }} />
                    <div>
                      <div className={styles.prodName}>{p.name}</div>
                      <div className={styles.prodSku}>{p.sku}</div>
                    </div>
                  </div>
                </td>
                <td className={`${styles.td} ${styles.tdNumBold}`}>{p.convs}</td>
                <td className={`${styles.td} ${styles.tdNum}`}>{p.cart}</td>
                <td className={`${styles.td} ${styles.tdNum}`}>{p.orders}</td>
                <td className={`${styles.td} ${styles.tdNumBold}`}>{p.revenue}</td>
                <td className={styles.td}>
                  <div className={styles.convRateBar}>
                    <span className={styles.convRateVal}>{p.convRate}%</span>
                    <div className={styles.miniBarBg}><div className={styles.miniBarFill} style={{ width: `${p.convRate * 10}%` }}/></div>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.rowActions}>
                    <button className={styles.actionLink}>Read conversations</button>
                    <button className={styles.actionLink}>Read knowledge</button>
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
    </div>
  )
}
