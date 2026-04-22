import styles from './MetricRow.module.css'

export default function MetricRow({ label, value, trend, sparklineData }) {
  return (
    <div className={styles.row}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      {trend && <div className={styles.trend}>{trend}</div>}
      {sparklineData && (
        <div className={styles.sparkline}>
          <svg viewBox="0 0 80 24" preserveAspectRatio="none" width="80" height="24">
            <polyline
              points={sparklineData}
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
