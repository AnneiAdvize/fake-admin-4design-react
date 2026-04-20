import styles from './Home.module.css'

export default function Home() {
  return (
    <div>
      <h1 className={styles.greeting}>Welcome Lisa!</h1>

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.cardTitle}>Your Copilot performance</div>
                <div className={styles.cardSubtitle}>Track your key performance indicators.</div>
              </div>
              <a className={styles.cardLink}>Go to report</a>
            </div>
            <div className={styles.kpiGrid}>
              <KpiMini label="Conversion rate" value="9,16" unit="%" trend="+20,48 %" up />
              <KpiMini label="Revenue" value="3 875" unit="€" trend="-12,94 %" />
              <KpiMini label="Automation rate" value="98,84" unit="%" trend="+0,25 %" up />
              <KpiMini label="CSAT" value="50" unit="%" trend="-42,31 %" />
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.tipHeader}>
              <div className={styles.tipTitleRow}>
                <span className={styles.tipTitle}>Optimize your Copilot</span>
                <span className={styles.tipCounter}>— Tip 1/8</span>
              </div>
              <a className={styles.cardLink}>Go to report</a>
            </div>
            <div className={styles.tipBody}>
              <button className={styles.tipArrow} style={{ left: 'var(--sp-4)' }}>‹</button>
              <div className={styles.tipInner}>
                <div className={styles.tipInnerTitle}>Promo Code</div>
                <div className={styles.tipQuestionRow}>
                  <div className={styles.tipPill}>How can I check the expiration date of my promotional code?</div>
                  <a className={styles.tipSeeAll}>See all related questions (132)</a>
                </div>
                <div className={styles.tipKnowledgeLabel}>Knowledge</div>
                <textarea className={styles.tipTextarea} placeholder="Type your text" />
                <div className={styles.tipActions}>
                  <button className={styles.tipBtnIgnore}>Ignore</button>
                  <button className={styles.tipBtnAdd}>Add knowledge</button>
                </div>
              </div>
              <button className={styles.tipArrow} style={{ right: 'var(--sp-4)' }}>›</button>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.card}>
            <div className={styles.cardHeader} style={{ paddingBottom: 'var(--sp-1)' }}>
              <div>
                <div className={styles.cardTitle}>Help Center</div>
                <div className={styles.cardSubtitle}>Find the main resources to configure and optimize your Copilots.</div>
              </div>
            </div>
            <div className={styles.helpBody}>
              <div className={styles.helpList}>
                <HelpLink title="Copilots: concept and usage" />
                <HelpLink title="AI Knowledge: your Copilot's information source" />
                <HelpLink title="Improve your Copilot" />
              </div>
              <a className={styles.helpGoto}>Go to Help Center →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KpiMini({ label, value, unit, trend, up }) {
  return (
    <div className={styles.kpiMini}>
      <div className={styles.kpiLabel}>{label}</div>
      <div className={styles.kpiValue}>{value}<sup>{unit}</sup></div>
      <div className={`${styles.kpiTrend} ${up ? styles.trendUp : styles.trendDown}`}>{trend}</div>
    </div>
  )
}

function HelpLink({ title }) {
  return (
    <div className={styles.helpRow}>
      <span className={styles.helpTitle}>{title}</span>
      <span className={styles.helpArrow}>→</span>
    </div>
  )
}
