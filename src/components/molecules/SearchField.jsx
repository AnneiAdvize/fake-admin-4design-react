import styles from './SearchField.module.css'

export default function SearchField({ value, onChange, onSubmit, placeholder = 'Search...' }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') onSubmit?.()
  }
  return (
    <div className={styles.searchWrap}>
      <svg className={styles.searchIcon} width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="6" cy="6" r="4"/><path d="M9.5 9.5L12 12" strokeLinecap="round"/>
      </svg>
      <input
        className={styles.searchInput}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
