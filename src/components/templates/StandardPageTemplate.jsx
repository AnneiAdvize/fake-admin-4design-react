import styles from './StandardPageTemplate.module.css'

export default function StandardPageTemplate({ header, children }) {
  return (
    <main className={styles.page}>
      {header && <div className={styles.headerSlot}>{header}</div>}
      <section className={styles.content}>
        {children}
      </section>
    </main>
  )
}
