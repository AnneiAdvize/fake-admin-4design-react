import styles from './KpiItem.module.css'

export default function KpiItem({ label, value, delta, deltaType = 'neutral', unit }) {
  const deltaClass = deltaType === 'positive' ? styles.trendUp : deltaType === 'negative' ? styles.trendDown : ''
  return (
    <div className={styles.kpiItem}>
      <div className={styles.kpiLabel}>{label}</div>
      <div className={styles.kpiValue}>{value}{unit && <sup>{unit}</sup>}</div>
      {delta && <div className={`${styles.kpiTrend} ${deltaClass}`}>{delta}</div>}
    </div>
  )
}
