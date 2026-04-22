import styles from './PageHeader.module.css'
import SearchField from '../molecules/SearchField'

export default function PageHeader({ title, subtitle, cta, search }) {
  return (
    <div className={styles.pageHead}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {search && (
          <div className={styles.searchSlot}>
            <SearchField
              value={search.value}
              onChange={search.onChange}
              placeholder={search.placeholder}
            />
          </div>
        )}
      </div>
      {cta && (
        <button className={styles.btnCta} onClick={cta.onClick}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          {cta.label}
        </button>
      )}
    </div>
  )
}
