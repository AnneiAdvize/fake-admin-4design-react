import { useState, Fragment } from 'react'
import styles from './Conversations.module.css'

const ROWS = [
  { id: 1, date: '22/02/2026', time: '21:48', author: 'Visitor', anon: true, content: 'Hi, I\'m looking for capsules to make lattes at home…', nps: '9', npsClass: 'high', csat: '4.8', amount: '—', detail: {
    avatar: 'VIS', segment: 'Anonymous visitor', location: 'London, United Kingdom',
    sessionId: 'SESS-17284629834', contactId: 'CONT-47291038456', duration: '1m 38s',
    topic: 'Product recommendation', stars: 5,
    messages: [
      { role: 'bot', text: 'Welcome to Nespresso! I\'m your personal coffee assistant. How can I help you today?', time: '21:48:03' },
      { role: 'user', text: 'Hi, I\'m looking for capsules to make lattes at home', time: '21:48:22' },
      { role: 'bot', text: 'Happy to help! For great lattes, you need capsules strong enough to hold their own against milk. My top recommendations: Barista Creations Chiaro (Intensity 6) and Barista Creations Scuro (Intensity 8). Both are designed specifically for milk-based drinks.', time: '21:48:45' },
      { role: 'user', text: 'The Chiaro sounds perfect! Any current promotions?', time: '21:49:12' },
      { role: 'bot', text: 'Barista Creations Chiaro is £4.30 per 10-capsule box. Right now, order 5+ boxes to get 10% off. Shall I redirect you to our shop to complete your order?', time: '21:49:31' },
    ]
  }},
  { id: 2, date: '22/02/2026', time: '21:44', author: 'Visitor', anon: true, content: 'Capsule compatibility with Original Line machine…', nps: '—', npsClass: 'empty', csat: '—', amount: '—', detail: {
    avatar: 'VIS', duration: '0m 58s', topic: 'Product compatibility', stars: 0,
    messages: [
      { role: 'bot', text: 'Hello! How can I help you?', time: '21:44:10' },
      { role: 'user', text: 'Are my Vertuo capsules compatible with my Original Line machine?', time: '21:44:28' },
      { role: 'bot', text: 'No, the Vertuo and Original systems are not compatible — they use different brewing technologies. For your Original Line machine, look for capsules labelled with the Original logo. Would you like me to suggest some great Original Line options?', time: '21:44:45' },
    ]
  }},
  { id: 3,  date: '22/02/2026', time: '21:42', author: 'Visitor',   anon: true,  content: 'Monthly capsule subscription offer…',                      nps: '8',  npsClass: 'high', csat: '4.2', amount: '40.40' },
  { id: 4,  date: '22/02/2026', time: '21:38', author: 'Lucas B.',  anon: false, content: 'Order #NES-284912 tracking — late delivery…',              nps: '—',  npsClass: 'empty', csat: '—', amount: '—' },
  { id: 5,  date: '22/02/2026', time: '21:35', author: 'Visitor',   anon: true,  content: 'Difference between Vertuo and Original Line ranges…',      nps: '7',  npsClass: 'mid',  csat: '3.8', amount: '—' },
  { id: 6,  date: '22/02/2026', time: '21:31', author: 'Marie C.',  anon: false, content: 'Vertuo Next won\'t start after descaling…',                nps: '—',  npsClass: 'empty', csat: '—', amount: '—' },
  { id: 7,  date: '22/02/2026', time: '21:28', author: 'Visitor',   anon: true,  content: 'Best high-intensity capsule for espresso…',                nps: '10', npsClass: 'high', csat: '5.0', amount: '52.00' },
  { id: 8,  date: '22/02/2026', time: '21:22', author: 'Visitor',   anon: true,  content: 'Standard delivery time to Southern UK…',                  nps: '—',  npsClass: 'empty', csat: '—', amount: '—' },
  { id: 9,  date: '22/02/2026', time: '21:18', author: 'Thomas R.', anon: false, content: 'Refund request for duplicate order…',                     nps: '5',  npsClass: 'low',  csat: '2.5', amount: '—' },
  { id: 10, date: '22/02/2026', time: '21:14', author: 'Visitor',   anon: true,  content: 'Compatible capsules for Vertuo Next — full range…',        nps: '9',  npsClass: 'high', csat: '4.6', amount: '38.60' },
  { id: 11, date: '22/02/2026', time: '21:09', author: 'Visitor',   anon: true,  content: 'Loyalty programme — points accrual on subscriptions…',    nps: '—',  npsClass: 'empty', csat: '—', amount: '—' },
  { id: 12, date: '22/02/2026', time: '21:04', author: 'Emma D.',   anon: false, content: 'Anniversary gift idea — machine and capsule bundle…',     nps: '10', npsClass: 'high', csat: '5.0', amount: '76.00' },
  { id: 13, date: '22/02/2026', time: '20:58', author: 'Visitor',   anon: true,  content: 'How to recycle used capsules at a boutique…',             nps: '8',  npsClass: 'high', csat: '4.1', amount: '—' },
  { id: 14, date: '22/02/2026', time: '20:52', author: 'Visitor',   anon: true,  content: 'Free machine trial — discovery offer available?…',        nps: '—',  npsClass: 'empty', csat: '—', amount: '—' },
  { id: 15, date: '22/02/2026', time: '20:47', author: 'Paul M.',   anon: false, content: 'Vertuo Evoluo descaling step-by-step…',                   nps: '—',  npsClass: 'empty', csat: '—', amount: '—' },
  { id: 16, date: '22/02/2026', time: '20:43', author: 'Visitor',   anon: true,  content: 'Spring promotions — discounts on new arrivals…',          nps: '6',  npsClass: 'mid',  csat: '3.2', amount: '—' },
  { id: 17, date: '22/02/2026', time: '20:38', author: 'Visitor',   anon: true,  content: 'Recommended intensity for the perfect ristretto…',        nps: '9',  npsClass: 'high', csat: '4.7', amount: '28.50' },
  { id: 18, date: '22/02/2026', time: '20:32', author: 'Julie F.',  anon: false, content: 'Change delivery address for order in progress…',          nps: '—',  npsClass: 'empty', csat: '—', amount: '—' },
  { id: 19, date: '22/02/2026', time: '20:28', author: 'Visitor',   anon: true,  content: 'Spring 2026 collection — first look at new capsules…',    nps: '8',  npsClass: 'high', csat: '4.3', amount: '45.00' },
  { id: 20, date: '22/02/2026', time: '20:24', author: 'Visitor',   anon: true,  content: 'Sustainable capsules — eco-friendly product range…',      nps: '7',  npsClass: 'mid',  csat: '3.9', amount: '—' },
]

export default function Conversations() {
  const [expandedId, setExpandedId] = useState(1)

  function toggleRow(id) {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Conversations report
          <span className={styles.iconFav}>★</span>
        </h1>
        <div className={styles.headerRight}>
          <button className={styles.dateBtn}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="12" height="12" rx="1.5"/><path d="M2 7h12M5 1v2M11 1v2"/>
            </svg>
            Dec 10 – Dec 15, 2025
            <ChevronIcon />
          </button>
          <button className={styles.projectBtn}>
            <span className={styles.projectLabel}>Projects:</span> All
            <ChevronIcon />
          </button>
          <button className={styles.btnAddFilters}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Add filters
          </button>
        </div>
      </header>

      <div className={styles.kpiCard}>
        <div className={styles.kpiLeft}>
          <div className={styles.kpiMetricLabel}>
            Closed conversations <span className={styles.iconFav}>★</span>
          </div>
          <div className={styles.kpiMetricValue}>1,088</div>
          <div className={styles.kpiFooter}>
            <span className={styles.kpiTrendUp}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3BE1A4" stopOpacity="0.22"/>
                <stop offset="100%" stopColor="#3BE1A4" stopOpacity="0.02"/>
              </linearGradient>
            </defs>
            <line x1="0" y1="20" x2="560" y2="20" stroke="#D1D1CB" strokeWidth="0.5"/>
            <line x1="0" y1="40" x2="560" y2="40" stroke="#D1D1CB" strokeWidth="0.5"/>
            <line x1="0" y1="60" x2="560" y2="60" stroke="#D1D1CB" strokeWidth="0.5"/>
            <polygon points="0,52 19,46 37,55 56,32 75,40 93,36 112,43 131,40 149,24 168,37 187,43 205,40 224,33 243,29 262,42 280,48 299,36 318,21 336,40 355,36 374,43 392,29 411,13 430,32 449,40 467,36 486,43 504,38 523,32 542,40 560,47 560,75 0,75" fill="url(#chartGrad)"/>
            <polyline points="0,52 19,46 37,55 56,32 75,40 93,36 112,43 131,40 149,24 168,37 187,43 205,40 224,33 243,29 262,42 280,48 299,36 318,21 336,40 355,36 374,43 392,29 411,13 430,32 449,40 467,36 486,43 504,38 523,32 542,40 560,47" fill="none" stroke="#3BE1A4" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>
            Conversation log <span className={styles.iconFav}>★</span>
          </h2>
          <button className={styles.btnExport}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v7M3 5l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export
            <ChevronIcon />
          </button>
          <button className={styles.btnFilter}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M1 2.5h10M3 6h6M5 9.5h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Filter
            <span className={styles.filterCount}>2</span>
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}></th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Author</th>
              <th className={styles.th}>Channel</th>
              <th className={styles.th}>Content / Topic</th>
              <th className={styles.th}>NPS</th>
              <th className={styles.th}>CSAT</th>
              <th className={styles.th}>Cart value</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(row => (
              <Fragment key={row.id}>
                <tr
                  className={`${styles.convRow} ${expandedId === row.id ? styles.expanded : ''}`}
                  onClick={() => toggleRow(row.id)}
                >
                  <td className={styles.td}><span className={styles.statusRing} /></td>
                  <td className={styles.td}>
                    <div className={styles.dateMain}>{row.date}</div>
                    <div className={styles.dateTime}>{row.time}</div>
                  </td>
                  <td className={styles.td}>
                    <span className={row.anon ? styles.authorAnon : styles.author}>{row.author}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.canalChip}>
                      <span className={styles.canalDot} />
                      AI Shopping Assistant
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.tdContent}>{row.content}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.tdNps} ${styles[row.npsClass]}`}>{row.nps}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.tdCsat} ${row.csat !== '—' ? styles.csatRated : ''}`}>{row.csat}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.tdAmount}>{row.amount}</span>
                  </td>
                </tr>
                {expandedId === row.id && row.detail && (
                  <tr className={styles.detailRow}>
                    <td colSpan={8} className={styles.detailCell}>
                      <DetailPanel detail={row.detail} />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>Showing 1–20 of 1,088 conversations</span>
          <div className={styles.paginationControls}>
            <button className={styles.pgBtn} disabled>
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12">
                <path d="M8 2L4 6l4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className={`${styles.pgBtn} ${styles.pgActive}`}>1</button>
            <button className={styles.pgBtn}>2</button>
            <button className={styles.pgBtn}>3</button>
            <button className={styles.pgBtn}>…</button>
            <button className={styles.pgBtn}>55</button>
            <button className={styles.pgBtn}>
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12">
                <path d="M4 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailPanel({ detail }) {
  return (
    <div className={styles.detailPanel}>
      <div className={styles.convMeta}>
        <div className={styles.metaAvatar}>{detail.avatar}</div>
        {detail.segment && (
          <div>
            <div className={styles.metaLabel}>Segment</div>
            <div className={styles.metaValueNormal}>{detail.segment}</div>
          </div>
        )}
        {detail.location && (
          <div>
            <div className={styles.metaLabel}>Location</div>
            <div className={styles.metaValueNormal}>{detail.location}</div>
          </div>
        )}
        {(detail.sessionId || detail.contactId) && <div className={styles.metaDivider} />}
        {detail.sessionId && (
          <div>
            <div className={styles.metaLabel}>Session ID</div>
            <div className={styles.metaValue}>{detail.sessionId}</div>
          </div>
        )}
        {detail.contactId && (
          <div>
            <div className={styles.metaLabel}>Contact ID</div>
            <div className={styles.metaValue}>{detail.contactId}</div>
          </div>
        )}
        {detail.duration && (
          <div>
            <div className={styles.metaLabel}>Duration</div>
            <div className={styles.metaValueNormal}>{detail.duration}</div>
          </div>
        )}
        <div className={styles.metaDivider} />
        <div>
          <div className={styles.metaLabel}>Topic</div>
          <span className={styles.metaTag}>{detail.topic}</span>
        </div>
        {detail.stars > 0 && (
          <div>
            <div className={styles.metaLabel}>Satisfaction</div>
            <div className={styles.metaStars}>
              {[1,2,3,4,5].map(i => (
                <span key={i} className={i <= detail.stars ? styles.starOn : styles.starOff}>★</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.convChat}>
        {detail.messages.map((msg, i) => (
          <div key={i} className={`${styles.chatMsg} ${msg.role === 'bot' ? styles.chatBot : styles.chatUser}`}>
            {msg.role === 'bot' && <div className={styles.chatAvatarBot}>✦</div>}
            <div className={`${styles.chatBubbleWrap} ${msg.role === 'user' ? styles.chatBubbleWrapUser : ''}`}>
              <div className={`${styles.chatBubble} ${msg.role === 'bot' ? styles.chatBubbleBot : styles.chatBubbleUser}`}>
                {msg.text}
              </div>
              <div className={styles.chatTime}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChevronIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
