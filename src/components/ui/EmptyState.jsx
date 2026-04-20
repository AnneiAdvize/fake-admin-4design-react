import styles from './EmptyState.module.css'

export default function EmptyState({ icon = '🚧', title = 'Coming soon', subtitle = 'This section is under construction.' }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
      <span className={styles.badge}>COMING SOON</span>
    </div>
  )
}
