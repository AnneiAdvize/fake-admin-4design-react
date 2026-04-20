import { useState, Fragment } from 'react'
import styles from './Conversations.module.css'

const ROWS = [
  { id: 1, date: '22/02/2026', time: '21:48', author: 'Visitor', anon: true, content: 'Hi, I\'m looking for capsules to make lattes at home…', nps: '9', npsClass: 'high', csat: '4.8', amount: '—', detail: {
    topic: 'Product recommendation', stars: 5,
    messages: [
      { role: 'event', text: 'Visitor loaded a new page', url: 'www.nespresso.com/uk/en/capsules/vertuo', time: '21:47:52' },
      { role: 'bot',  text: 'Welcome to Nespresso! I\'m your personal coffee assistant. How can I help you today?', time: '21:48:03' },
      { role: 'user', text: 'Hi, I\'m looking for capsules to make lattes at home', time: '21:48:22' },
      { role: 'bot',  text: 'Happy to help! For great lattes, you need capsules strong enough to hold their own against milk. My top recommendations: Barista Creations Chiaro (Intensity 6) and Barista Creations Scuro (Intensity 8). Both are designed specifically for milk-based drinks.', time: '21:48:45', analyzeVariant: 'faq-answer' },
      { role: 'event', text: 'Visitor loaded a new page', url: 'www.nespresso.com/uk/en/order/capsules…', time: '21:49:05' },
      { role: 'user', text: 'The Chiaro sounds perfect! Any current promotions?', time: '21:49:12' },
      { role: 'bot',  text: 'Barista Creations Chiaro is £4.30 per 10-capsule box. Right now, order 5+ boxes to get 10% off — the discount applies within 24 hours of checkout. Shall I redirect you to our shop?', time: '21:49:31', analyzeVariant: 'hallucination' },
    ]
  }},
  { id: 2, date: '22/02/2026', time: '21:44', author: 'Visitor', anon: true, content: 'Capsule compatibility with Original Line machine…', nps: '—', npsClass: 'empty', csat: '—', amount: '—', detail: {
    topic: 'Product compatibility', stars: 0,
    messages: [
      { role: 'event', text: 'Visitor loaded a new page', url: 'www.nespresso.com/uk/en/machines/vertuo', time: '21:43:55' },
      { role: 'bot',  text: 'Hello! How can I help you?', time: '21:44:10' },
      { role: 'user', text: 'Are my Vertuo capsules compatible with my Original Line machine?', time: '21:44:28' },
      { role: 'bot',  text: 'No, the Vertuo and Original systems are not compatible — they use different brewing technologies. For your Original Line machine, look for capsules labelled with the Original logo. Would you like me to suggest some great Original Line options?', time: '21:44:45', analyzeVariant: 'missing-knowledge' },
    ]
  }},
  { id: 3,  date: '22/02/2026', time: '21:42', author: 'Visitor',   anon: true,  content: 'Monthly capsule subscription offer…',                      nps: '8',  npsClass: 'high', csat: '4.2', amount: '40.40' },
  { id: 4,  date: '22/02/2026', time: '21:38', author: 'Lucas B.',  anon: false, content: 'Order #NES-284912 tracking — late delivery…',              nps: '—',  npsClass: 'empty', csat: '—', amount: '—' },
  { id: 5,  date: '22/02/2026', time: '21:35', author: 'Visitor',   anon: true,  content: 'Difference between Vertuo and Original Line ranges…',      nps: '7',  npsClass: 'mid',  csat: '3.8', amount: '—' },
  { id: 6,  date: '22/02/2026', time: '21:31', author: 'Marie C.',  anon: false, content: 'Vertuo Next won\'t start after descaling…',                nps: '—',  npsClass: 'empty', csat: '—', amount: '—' },
  { id: 7,  date: '22/02/2026', time: '21:28', author: 'Visitor',   anon: true,  content: 'Best high-intensity capsule for espresso…',                nps: '10', npsClass: 'high', csat: '5.0', amount: '52.00', detail: {
    topic: 'Product recommendation', stars: 5,
    messages: [
      { role: 'event', text: 'Visitor loaded a new page', url: 'www.nespresso.com/uk/en/capsules/original', time: '21:27:50' },
      { role: 'bot',  text: 'Welcome! How can I help with your Nespresso experience today?', time: '21:28:02' },
      { role: 'user', text: 'What\'s the best high-intensity capsule for a strong espresso?', time: '21:28:18' },
      { role: 'bot',  text: 'For a bold, intense espresso I\'d recommend Roma — Intensity 8 on the Original Line. It delivers a rich, full-bodied shot with a beautiful crema. Currently £4.30 per 10-capsule box.', time: '21:28:35', analyzeVariant: 'product-answer' },
    ]
  }},
  { id: 8,  date: '22/02/2026', time: '21:22', author: 'Visitor',   anon: true,  content: 'Standard delivery time to Southern UK…',                  nps: '—',  npsClass: 'empty', csat: '—', amount: '—' },
  { id: 9,  date: '22/02/2026', time: '21:18', author: 'Thomas R.', anon: false, content: 'Refund request for duplicate order…',                     nps: '5',  npsClass: 'low',  csat: '2.5', amount: '—' },
  { id: 10, date: '22/02/2026', time: '21:14', author: 'Visitor',   anon: true,  content: 'Compatible capsules for Vertuo Next — full range…',        nps: '9',  npsClass: 'high', csat: '4.6', amount: '38.60', detail: {
    topic: 'Product compatibility', stars: 5,
    messages: [
      { role: 'event', text: 'Visitor loaded a new page', url: 'www.nespresso.com/uk/en/machines/vertuo-next', time: '21:13:48' },
      { role: 'bot',  text: 'Hello! I\'m here to help with your Nespresso experience.', time: '21:14:05' },
      { role: 'user', text: 'I have a Vertuo Next — which capsules work with it and are best for strong coffee?', time: '21:14:22' },
      { role: 'bot',  text: 'For your Vertuo Next and a strong coffee preference, here are my top picks: Ristretto Decaffeinato (Intensity 10), Roma (Intensity 8), and Volluto (Intensity 4) for a lighter alternative. All are Vertuo-compatible.', time: '21:14:48', analyzeVariant: 'product-reco' },
    ]
  }},
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
  const [expandedId, setExpandedId]       = useState(1)
  const [analysisPanel, setAnalysisPanel] = useState(null) // { rowId, msgIdx, variant }

  function toggleRow(id) {
    setExpandedId(prev => {
      if (prev !== id) { setAnalysisPanel(null) }
      return prev === id ? null : id
    })
  }

  function handleAnalyze(rowId, msgIdx, variant) {
    setAnalysisPanel(prev =>
      prev?.rowId === rowId && prev?.msgIdx === msgIdx ? null : { rowId, msgIdx, variant }
    )
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

      <div className={analysisPanel ? styles.pageLayout : undefined}>
        <div className={analysisPanel ? styles.tableSide : undefined}>

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
                          <DetailPanel
                            detail={row.detail}
                            rowId={row.id}
                            analysisPanel={analysisPanel}
                            onAnalyze={handleAnalyze}
                          />
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

        {analysisPanel && (
          <AnswerAnalysisSidebar
            variant={analysisPanel.variant}
            onClose={() => setAnalysisPanel(null)}
          />
        )}
      </div>
    </div>
  )
}

/* ── Detail panel ── */
function DetailPanel({ detail, rowId, analysisPanel, onAnalyze }) {
  return (
    <div className={styles.detailPanel}>
      <div className={styles.convChat}>
        {detail.messages.map((msg, i) => {
          if (msg.role === 'event') {
            return (
              <div key={i} className={styles.chatEvent}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <rect x="1" y="3" width="14" height="10" rx="1.5"/>
                  <path d="M4 1v2M12 1v2M5 8h6M5 10.5h3.5" strokeLinecap="round"/>
                </svg>
                <span className={styles.chatEventLabel}>{msg.text}</span>
                <span className={styles.chatEventTime}>{msg.time}</span>
                <span className={styles.chatEventUrl}>{msg.url}</span>
              </div>
            )
          }
          const isActive = analysisPanel?.rowId === rowId && analysisPanel?.msgIdx === i
          return (
            <div key={i} className={`${styles.chatMsg} ${msg.role === 'bot' ? styles.chatBot : styles.chatUser}`}>
              {msg.role === 'bot' && <div className={styles.chatAvatarBot}>✦</div>}
              <div className={`${styles.chatBubbleWrap} ${msg.role === 'bot' ? styles.chatBubbleWrapBot : styles.chatBubbleWrapUser}`}>
                <div className={`${styles.chatBubble} ${msg.role === 'bot' ? styles.chatBubbleBot : styles.chatBubbleUser}`}>
                  {msg.text}
                </div>
                <div className={styles.chatMsgFooter}>
                  <div className={styles.chatTime}>{msg.time}</div>
                  {msg.analyzeVariant && (
                    <button
                      className={`${styles.analyzeBtn} ${isActive ? styles.analyzeBtnActive : ''}`}
                      onClick={e => { e.stopPropagation(); onAnalyze(rowId, i, msg.analyzeVariant) }}
                    >
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1.5l1.3 3.2 3.2.3-2.4 2.2.7 3.2L8 8.8l-2.8 1.6.7-3.2L3.5 5l3.2-.3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                        <path d="M12.5 10l.6 1.5 1.5.5-1.5.5-.6 1.5-.6-1.5-1.5-.5 1.5-.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                      </svg>
                      Analyze the answer
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Answer analysis sidebar ── */
function AnswerAnalysisSidebar({ variant, onClose }) {
  const [expandedKcards, setExpandedKcards] = useState(new Set())

  function toggleKcard(id) {
    setExpandedKcards(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className={styles.analysisSidebar}>
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarTitle}>Answer analysis</span>
        <button className={styles.sidebarClose} onClick={onClose} title="Close">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className={styles.sidebarBody}>
        {variant === 'faq-answer' && <VariantFaqAnswer expandedKcards={expandedKcards} toggleKcard={toggleKcard} />}
        {variant === 'hallucination' && <VariantHallucination expandedKcards={expandedKcards} toggleKcard={toggleKcard} />}
        {variant === 'missing-knowledge' && <VariantMissingKnowledge />}
        {variant === 'product-answer' && <VariantProductAnswer />}
        {variant === 'product-reco' && <VariantProductReco />}
      </div>
    </div>
  )
}

/* ── Shared sub-components ── */
function SectionTitle({ icon, children }) {
  return (
    <div className={styles.sidebarSectionTitle}>
      <span className={styles.sidebarSectionIcon}>{icon}</span>
      {children}
    </div>
  )
}

const IcoInterpretation = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M9 1L3 9h5.5L7 15l7-9H8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
  </svg>
)

const IcoKnowledge = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="2" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M2 6v7a1 1 0 001 1h10a1 1 0 001-1V6" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M6 9h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

const IcoBehaviors = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-8 10a8 8 0 0112.38-6.68c-.24-.1-.512-.105-.76-.005L9.504 8.95a1.5 1.5 0 00-.94.94L6.064 16.63a1.5 1.5 0 00.048 1.12A8.007 8.007 0 014 12zm2.653 5.95A8 8 0 0020 12a8 8 0 00-2.08-5.38c.1.24.105.511.005.758l-2.86 7.083a1.5 1.5 0 01-.94.94l-7.13 2.888a1.5 1.5 0 01-.342.05zM10.24 11.65l2.107 2.112-3.543 1.435 1.435-3.547z" fill="currentColor"/>
  </svg>
)

const IcoProduct = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5 6h6M5 8.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

function KCard({ title, content, tags, editBtn, expandId, expandedKcards, toggleKcard, children }) {
  const isExpanded = expandedKcards?.has(expandId)
  return (
    <div className={styles.kcard}>
      {children}
      {title && <div className={styles.kcardTitle}>{title}</div>}
      {content && (
        <>
          <div className={`${styles.kcardContent} ${isExpanded ? styles.kcardContentExpanded : ''}`}>{content}</div>
          {expandId && (
            <button className={styles.kcardViewMore} onClick={() => toggleKcard(expandId)}>
              {isExpanded ? 'View less' : 'View more'}
            </button>
          )}
        </>
      )}
      {(tags || editBtn !== false) && (
        <div className={styles.kcardFooter}>
          <div className={styles.kcardTags}>
            {tags?.map((t, i) => <span key={i} className={`${styles.tag} ${styles[t.cls]}`}>{t.label}</span>)}
          </div>
          {editBtn !== false && (
            <button className={styles.btnSmOutline}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M8 1l3 3-6 6H2V7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function CustomBehaviorCard({ title, content }) {
  return (
    <div className={styles.kcard}>
      <div className={styles.kcardTitle}>{title}</div>
      <div className={styles.kcardContent} style={{ WebkitLineClamp: 'unset', display: 'block', overflow: 'visible' }}>{content}</div>
      <div className={styles.kcardFooter}>
        <div />
        <button className={styles.btnSmOutline}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M8 1l3 3-6 6H2V7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
          Edit
        </button>
      </div>
    </div>
  )
}

const FAQ_TAGS = [
  { label: 'Useful content', cls: 'tagNeutral' },
  { label: 'My FAQ', cls: 'tagInfo' },
]

/* ── Variant A: FAQ answer ── */
function VariantFaqAnswer({ expandedKcards, toggleKcard }) {
  return (
    <>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoInterpretation}>Interpretation</SectionTitle>
        <p className={styles.interpText}>
          Your visitor wanted to <strong>know if the Barista Creations Chiaro capsules were compatible with their Original Line machine</strong>, and which format to choose for home lattes.
        </p>
      </div>

      <div className={styles.sidebarSection}>
        <div className={styles.sidebarSectionHd}>
          <SectionTitle icon={IcoKnowledge}>Used knowledge</SectionTitle>
          <button className={styles.btnSmOutline}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Add
          </button>
        </div>
        <div className={styles.knowledgeSubSec}>
          <KCard
            title="Do the Barista Creations capsules work with Original Line machines?"
            content="Yes — all Barista Creations capsules are compatible with Original Line machines. They are designed to work with the standard espresso extraction system used across the Original range."
            tags={FAQ_TAGS}
            expandId="faq-k1"
            expandedKcards={expandedKcards}
            toggleKcard={toggleKcard}
          />
          <KCard
            title="What are the best capsules for milk-based drinks?"
            content="For lattes and cappuccinos, we recommend the Barista Creations range: Chiaro (Intensity 6) for a lighter latte, Scuro (Intensity 8) for a bolder taste, and Corto (Intensity 11) for a ristretto-style base. All are optimised to blend perfectly with hot or cold milk, creating a velvety texture without bitterness."
            tags={FAQ_TAGS}
            expandId="faq-k2"
            expandedKcards={expandedKcards}
            toggleKcard={toggleKcard}
          />
          <button className={styles.viewAllLink}>View all knowledge used (+4)</button>
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoBehaviors}>Custom behaviors</SectionTitle>
        <CustomBehaviorCard
          title="If the visitor asks about machine compatibility"
          content="Always confirm the machine line (Original vs. Vertuo) before suggesting capsules"
        />
      </div>
    </>
  )
}

/* ── Variant B: Hallucination ── */
function VariantHallucination({ expandedKcards, toggleKcard }) {
  return (
    <>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoInterpretation}>Interpretation</SectionTitle>
        <p className={styles.interpText}>
          The visitor ordered Chiaro capsules and wanted to <strong>know when the 10% promotional discount would be applied to their basket</strong>.
        </p>
        <div className={styles.halluAlert}>
          <div className={styles.halluTitle}>The assistant detected a risk of hallucination</div>
          <div className={styles.halluText}>The "apply within 24 hours" delay mentioned in the response is not in your knowledge base. The assistant generated this information.</div>
          <a className={styles.halluLink} href="#">See rejected answer</a>
        </div>
        <div className={styles.infoBanner}>
          <svg className={styles.infoBannerIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#2A78A8" strokeWidth="1.3"/>
            <path d="M8 5v1M8 7.5v4" stroke="#2A78A8" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <span className={styles.infoBannerText}>We are working to improve this behavior so that the correct parts of the response can still be used.</span>
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <div className={styles.sidebarSectionHd}>
          <SectionTitle icon={IcoKnowledge}>Used knowledge</SectionTitle>
          <button className={styles.btnSmOutline}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Add
          </button>
        </div>
        <div className={styles.knowledgeSubSec}>
          <KCard
            title="Current promotions — 5+ boxes discount"
            content="Order 5 or more boxes of any Barista Creations capsules and receive 10% off your total. The discount is automatically applied at checkout with no promo code required."
            tags={FAQ_TAGS}
            expandId="hallu-k1"
            expandedKcards={expandedKcards}
            toggleKcard={toggleKcard}
          />
          <KCard
            title="What happens after receiving my returned package?"
            content="After receiving the package, the product is checked and the return is validated. After approval, the refund is activated within the standard processing window. No specific delay is guaranteed beyond the statutory maximum."
            tags={FAQ_TAGS}
            expandId="hallu-k2"
            expandedKcards={expandedKcards}
            toggleKcard={toggleKcard}
          />
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoBehaviors}>Custom behaviors</SectionTitle>
        <CustomBehaviorCard
          title="If the automatic no-reply message is triggered"
          content="Transfer to a human agent"
        />
      </div>
    </>
  )
}

/* ── Variant C: Missing knowledge ── */
function VariantMissingKnowledge() {
  return (
    <>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoInterpretation}>Interpretation</SectionTitle>
        <div className={styles.interpText}>
          The AI assistant answered <strong>without any matching knowledge content</strong>. No FAQ entry or document was used to generate this response.
        </div>
      </div>

      <div className={styles.missingWarning}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
          <path d="M8 2L14.5 13.5H1.5L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M8 6.5v3M8 11v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        <span className={styles.missingWarningText}>Missing knowledge — the bot answered without any grounded source</span>
      </div>

      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoKnowledge}>Used knowledge</SectionTitle>
        <div className={styles.knowledgeSubSec}>
          <div className={styles.missingEmptyNotice}>No knowledge content matched this conversation.</div>
          <div className={styles.missingActionText}>
            You can <a className={styles.missingActionLink} href="#">add new knowledge content</a> to cover this topic and prevent ungrounded answers.
          </div>
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoBehaviors}>Custom behaviors</SectionTitle>
        <CustomBehaviorCard
          title="If the automatic no-reply message is triggered"
          content="Transfer to a human agent"
        />
      </div>
    </>
  )
}

/* ── Variant D: Single product ── */
function VariantProductAnswer() {
  return (
    <>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoInterpretation}>Interpretation</SectionTitle>
        <div className={styles.interpText}>
          The AI assistant identified <strong>1 matching product</strong> in the catalog and shared its details with the visitor.
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoProduct}>Used product</SectionTitle>
        <div className={styles.knowledgeSubSec}>
          <div className={styles.kcard}>
            <div className={styles.matchBadgeRow}>
              <span className={`${styles.tag} ${styles.tagSuccess}`}>Full match</span>
            </div>
            <div className={styles.productRow}>
              <div className={styles.productThumb} style={{ background: 'linear-gradient(135deg,#E8C5A0,#C8956A)' }} />
              <div className={styles.productInfo}>
                <div className={styles.productName}>Roma</div>
                <div className={styles.productMeta}>
                  <span>SKU: OL-ROMA-10</span>
                  <span className={styles.productSep} />
                  <span>£4.30</span>
                  <span className={styles.productSep} />
                  <span className={styles.productStock}>218 in stock</span>
                </div>
              </div>
            </div>
            <div className={styles.kcardFooter}>
              <div style={{ fontSize: '11px', color: 'var(--color-content-secondary)' }}>Intensity 8 · Original Line</div>
              <button className={styles.btnSmOutline}>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M7 1h4v4M11 1L5 7M9 7v4H1V3h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                See in catalog
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoBehaviors}>Custom behaviors</SectionTitle>
        <CustomBehaviorCard
          title="If the automatic no-reply message is triggered"
          content="Transfer to a human agent"
        />
      </div>
    </>
  )
}

/* ── Variant E: Product recommendation (multiple) ── */
function VariantProductReco() {
  const products = [
    { name: 'Ristretto Decaffeinato', meta: 'Intensity 10 · £4.30 · 87 in stock', bg: 'linear-gradient(135deg,#3D2B1F,#6B3A2A)', match: 'full' },
    { name: 'Roma', meta: 'Intensity 8 · £4.30 · 218 in stock', bg: 'linear-gradient(135deg,#E8C5A0,#C8956A)', match: 'full' },
    { name: 'Volluto', meta: 'Intensity 4 · £4.30 · 154 in stock', bg: 'linear-gradient(135deg,#F5E6C8,#D4B896)', match: 'partial' },
  ]
  return (
    <>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoInterpretation}>Interpretation</SectionTitle>
        <div className={styles.interpText}>
          The AI assistant recommended <strong>3 products</strong> from the catalog based on the visitor's request, with match scoring.
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoProduct}>Product matches</SectionTitle>
        <div className={styles.knowledgeSubSec}>
          {products.map(p => (
            <div key={p.name} className={styles.kcard}>
              <div className={styles.matchBadgeRow}>
                <span className={`${styles.tag} ${p.match === 'full' ? styles.tagSuccess : styles.tagWarning}`}>
                  {p.match === 'full' ? 'Full match' : 'Partial match'}
                </span>
              </div>
              <div className={styles.productRow}>
                <div className={styles.productThumb} style={{ background: p.bg }} />
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{p.name}</div>
                  <div className={styles.productMeta}>{p.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoBehaviors}>Custom behaviors</SectionTitle>
        <CustomBehaviorCard
          title="If the automatic no-reply message is triggered"
          content="Transfer to a human agent"
        />
      </div>
    </>
  )
}

function ChevronIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
