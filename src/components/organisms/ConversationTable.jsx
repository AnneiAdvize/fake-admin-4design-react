import { Fragment } from 'react'
import styles from './ConversationTable.module.css'

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

export default function ConversationTable({ conversations, expandedId, analysisPanel, onToggleRow, onAnalyze }) {
  return (
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
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
            <th className={styles.th}>Conv ID</th>
            <th className={styles.th}>Respondent</th>
            <th className={styles.th}>CSAT</th>
            <th className={styles.th}>NPS</th>
            <th className={styles.th}>Turnover</th>
            <th className={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {conversations.map(row => (
            <Fragment key={row.id}>
              <tr
                className={`${styles.convRow} ${expandedId === row.id ? styles.expanded : ''}`}
                onClick={() => onToggleRow(row.id)}
              >
                <td className={styles.td}><span className={styles.statusRing} /></td>
                <td className={styles.td}>
                  <div className={styles.dateMain}>{row.date}</div>
                  <div className={styles.dateTime}>{row.time}</div>
                </td>
                <td className={styles.td}>
                  <div className={styles.convIdCell}>
                    <span className={styles.convIdText}>{row.convId}</span>
                    <button className={styles.convIdCopy} onClick={e => e.stopPropagation()} title="Copy ID">
                      <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <rect x="4" y="4" width="8" height="8" rx="1.2"/><path d="M2 10V2h8" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={styles.canalChip}><span className={styles.canalDot} />AI Shopping Assistant</span>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.tdCsat} ${row.csat !== '—' ? styles.csatRated : ''}`}>{row.csat}</span>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.tdNps} ${styles[row.npsClass]}`}>{row.nps}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.tdAmount}>{row.amount}</span>
                </td>
                <td className={`${styles.td} ${styles.tdAction}`}>
                  {row.detail && (
                    <button className={styles.viewDetailsBtn} onClick={e => { e.stopPropagation(); onToggleRow(row.id) }}>
                      View details
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d={expandedId === row.id ? 'M9 5L5 1L1 5' : 'M1 1L5 5L9 1'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </td>
              </tr>
              {expandedId === row.id && row.detail && (
                <tr className={styles.detailRow}>
                  <td colSpan={8} className={styles.detailCell}>
                    <DetailPanel detail={row.detail} rowId={row.id} analysisPanel={analysisPanel} onAnalyze={onAnalyze} />
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
  )
}
