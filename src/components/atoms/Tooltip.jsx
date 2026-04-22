import styles from './Tooltip.module.css'

/**
 * Tooltip component
 * @param {'Top'|'Bottom'|'Left'|'Right'} side - position of the arrow
 * @param {React.ReactNode} children - the trigger element
 * @param {string} content - tooltip text
 */
export default function Tooltip({
  content,
  side = 'Top',
  children,
  className,
}) {
  return (
    <span className={`${styles.container} ${className || ''}`} data-side={side}>
      {children && <span className={styles.trigger}>{children}</span>}
      <span className={styles.tooltip} role="tooltip" data-side={side}>
        {side === 'Bottom' || side === 'Right' ? null : (
          <span className={styles.arrow} data-side={side} aria-hidden="true" />
        )}
        <span className={styles.content}>{content}</span>
        {(side === 'Bottom' || side === 'Right') && (
          <span className={styles.arrow} data-side={side} aria-hidden="true" />
        )}
      </span>
    </span>
  )
}
