import styles from './Badge.module.css'

export default function Badge({ variant = 'neutral', label }) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {label}
    </span>
  )
}
