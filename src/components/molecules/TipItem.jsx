import styles from './TipItem.module.css'

export default function TipItem({ title, description, illustration, children }) {
  return (
    <div className={styles.tipItem}>
      {illustration && <div className={styles.illustration}>{illustration}</div>}
      {title && <div className={styles.tipTitle}>{title}</div>}
      {description && <div className={styles.tipDesc}>{description}</div>}
      {children}
    </div>
  )
}
