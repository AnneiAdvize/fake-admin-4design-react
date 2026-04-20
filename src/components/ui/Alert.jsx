import styles from './Alert.module.css'

const ICONS = {
  Alert: (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="11.5" r="0.75" fill="currentColor"/>
    </svg>
  ),
  Warning: (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
      <path d="M8 1.5L14.5 14H1.5L8 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="11.5" r="0.75" fill="currentColor"/>
    </svg>
  ),
  Info: (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="5" r="0.75" fill="currentColor"/>
    </svg>
  ),
  Success: (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
      <path d="M3 8.5L6.5 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Neutral: null,
}

/**
 * Alert / Clue banner
 * @param {'Alert'|'Warning'|'Info'|'Success'|'Neutral'} type
 * @param {string} message
 * @param {string} actionLabel - optional action button label
 * @param {function} onAction - callback for action button
 */
export default function Alert({
  type = 'Info',
  message,
  actionLabel,
  onAction,
  className,
}) {
  const icon = ICONS[type] || null

  return (
    <div
      className={`${styles.alert} ${className || ''}`}
      data-type={type}
      role="alert"
    >
      <span className={styles.body}>
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={styles.message}>{message}</span>
      </span>
      {actionLabel && (
        <span className={styles.action}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={onAction}
            data-type={type}
          >
            {actionLabel}
          </button>
        </span>
      )}
    </div>
  )
}
