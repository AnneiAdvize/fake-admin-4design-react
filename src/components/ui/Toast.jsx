import styles from './Toast.module.css'

const CHECK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <path d="M4 12.5L9 18L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const INFO_ICON = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 10v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="7.5" r="1" fill="currentColor"/>
  </svg>
)

const ERROR_ICON = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const CLOSE_ICON = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const SPINNER = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="spinner">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3"/>
    <path d="M8 2A6 6 0 0 1 14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const ICONS = {
  Success: CHECK_ICON,
  Information: INFO_ICON,
  Error: ERROR_ICON,
  Loading: SPINNER,
}

/**
 * Toast notification
 * @param {'Success'|'Error'|'Loading'|'Information'} goal
 * @param {string} message
 * @param {string} actionLabel - optional undo/action label
 * @param {function} onAction
 * @param {function} onDismiss
 * @param {boolean} ephemere - shows progress bar
 * @param {number} progress - 0-100 for the progress bar width
 */
export default function Toast({
  goal = 'Information',
  message = 'Brief text of the action',
  actionLabel,
  onAction,
  onDismiss,
  ephemere = false,
  progress = 80,
  className,
}) {
  const icon = ICONS[goal]

  return (
    <div
      className={`${styles.toast} ${className || ''}`}
      data-goal={goal}
      role="status"
      aria-live="polite"
    >
      {ephemere && (
        <div className={styles.progressBar} aria-hidden="true">
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <div className={styles.body}>
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          {actionLabel && (
            <button type="button" className={styles.actionBtn} onClick={onAction}>
              {actionLabel}
            </button>
          )}
          {onDismiss && (
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onDismiss}
              aria-label="Dismiss"
            >
              {CLOSE_ICON}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
