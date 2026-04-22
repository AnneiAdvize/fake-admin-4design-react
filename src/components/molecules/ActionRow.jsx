import styles from './ActionRow.module.css'

export default function ActionRow({ label, description, onEdit, onDelete, actions = [], children }) {
  return (
    <div className={styles.row}>
      <div className={styles.content}>
        {label && <div className={styles.label}>{label}</div>}
        {description && <div className={styles.description}>{description}</div>}
      </div>
      <div className={styles.actions}>
        {actions.map((action, i) => (
          <button key={i} className={styles.actionBtn} onClick={action.onClick}>
            {action.icon && <span>{action.icon}</span>}
            {action.label}
          </button>
        ))}
        {onEdit && (
          <button className={styles.actionBtn} onClick={onEdit} title="Edit">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M11.5 2.5a1.414 1.414 0 0 1 2 2L5 13H3v-2L11.5 2.5z"/>
            </svg>
          </button>
        )}
        {onDelete && (
          <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} onClick={onDelete} title="Delete">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 4h12M6 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4M7 7v4M9 7v4M4 4l.7 8.3a1 1 0 001 .7h4.6a1 1 0 001-.7L12 4"/>
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
