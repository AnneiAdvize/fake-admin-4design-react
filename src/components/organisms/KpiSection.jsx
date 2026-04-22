import styles from './KpiSection.module.css'
import KpiItem from '../molecules/KpiItem'

export default function KpiSection({ title, kpis = [] }) {
  return (
    <div className={styles.section}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.grid}>
        {kpis.map((kpi, i) => (
          <KpiItem key={i} {...kpi} />
        ))}
      </div>
    </div>
  )
}
