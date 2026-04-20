import styles from './Toggle.module.css'

/**
 * Toggle / Switch component
 * @param {boolean} checked - on/off state
 * @param {'Default'|'Hover'|'Focused'|'Disabled'} state
 */
export default function Toggle({
  label,
  checked = false,
  onChange,
  state = 'Default',
  disabled = false,
  id,
  name,
  className,
}) {
  const isDisabled = disabled || state === 'Disabled'

  const dataAttrs = {
    'data-state': state,
    ...(isDisabled && { 'data-disabled': '' }),
    ...(checked && { 'data-checked': '' }),
  }

  return (
    <label
      className={`${styles.wrapper} ${className || ''}`}
      {...dataAttrs}
    >
      <span className={styles.track}>
        <input
          type="checkbox"
          role="switch"
          id={id}
          name={name}
          checked={checked}
          onChange={!isDisabled ? onChange : undefined}
          disabled={isDisabled}
          aria-checked={checked}
          className={styles.nativeInput}
        />
        <span className={styles.thumb} aria-hidden="true" />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
