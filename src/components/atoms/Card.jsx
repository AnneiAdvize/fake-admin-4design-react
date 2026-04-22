import styles from './Card.module.css'

export default function Card({ title, children }) {
  return (
    <div className={styles.card}>
      {title && <div className={styles.header}><h3 className={styles.title}>{title}</h3></div>}
      <div className={styles.body}>{children}</div>
    </div>
  )
}
