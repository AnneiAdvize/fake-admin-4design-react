import styles from './Tag.module.css'

/**
 * Tag / Badge pill
 * @param {'Validation'|'Information'|'Warning'|'Alerte'|'Purple'|'Dark'|'White'} color
 * @param {'XL'|'L'|'M'|'S'} size
 * @param {'Default'|'Right icon'|'Left icon'|'Button'} type
 * @param {boolean} intense - filled (intense) vs light background
 * @param {React.ReactNode} icon - icon node
 * @param {function} onRemove - if provided, shows a remove/button action
 */
export default function Tag({
  children,
  color = 'Information',
  size = 'M',
  type = 'Default',
  intense = false,
  icon = null,
  onRemove,
  onClick,
  className,
}) {
  const dataAttrs = {
    'data-color': color,
    'data-size': size,
    'data-type': type,
    ...(intense && { 'data-intense': '' }),
  }

  const isClickable = type === 'Button' || !!onClick || !!onRemove

  const content = (
    <>
      {(type === 'Left icon') && icon && (
        <span className={styles.icon} aria-hidden="true">{icon}</span>
      )}
      <span className={styles.label}>{children}</span>
      {(type === 'Right icon') && icon && (
        <span className={styles.icon} aria-hidden="true">{icon}</span>
      )}
      {type === 'Button' && (
        <button
          type="button"
          className={styles.closeBtn}
          onClick={e => { e.stopPropagation(); onRemove?.() }}
          aria-label="Remove"
        >
          <svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" width="8" height="8">
            <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </>
  )

  if (isClickable && onClick) {
    return (
      <button
        type="button"
        className={`${styles.tag} ${className || ''}`}
        onClick={onClick}
        {...dataAttrs}
      >
        {content}
      </button>
    )
  }

  return (
    <span className={`${styles.tag} ${className || ''}`} {...dataAttrs}>
      {content}
    </span>
  )
}
