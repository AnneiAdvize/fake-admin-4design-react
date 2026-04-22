import styles from './Button.module.css'

/**
 * Button component
 * @param {'primary'|'secondary'|'tertiary'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {'Default'|'Hover'|'Active'|'Focus'|'Loading'|'Disable'} state
 * @param {boolean} disabled
 * @param {React.ReactNode} iconLeft
 * @param {React.ReactNode} iconRight
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  state = 'Default',
  disabled = false,
  loading = false,
  children,
  onClick,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  className,
}) {
  const isDisabled = disabled || loading || state === 'Disable' || state === 'Loading'

  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant] || ''} ${styles[size] || ''} ${className || ''}`}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      data-variant={variant}
      data-size={size}
      data-state={loading ? 'Loading' : state}
      aria-disabled={isDisabled}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
      {children && <span className={styles.label}>{children}</span>}
      {!loading && iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  )
}
