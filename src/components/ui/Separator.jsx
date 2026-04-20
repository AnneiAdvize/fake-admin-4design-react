import styles from './Separator.module.css'

/**
 * Separator — horizontal rule, optionally with centered text label.
 * @param {boolean} withText - show an "OR" label in the center
 * @param {string} text - label text (default "OR")
 * @param {boolean} spaceBottom - adds bottom padding
 */
export default function Separator({
  withText = false,
  text = 'OR',
  spaceBottom = false,
  className,
}) {
  const dataAttrs = {
    ...(withText && { 'data-with-text': '' }),
    ...(spaceBottom && { 'data-space-bottom': '' }),
  }

  return (
    <div className={`${styles.separator} ${className || ''}`} {...dataAttrs} role="separator" aria-hidden="true">
      <span className={styles.line} />
      {withText && <span className={styles.text}>{text}</span>}
      {withText && <span className={styles.line} />}
    </div>
  )
}
