import styles from './ReportTemplate.module.css'

export default function ReportTemplate({ children }) {
  return (
    <div className={styles.reportLayout}>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  )
}
