import styles from './RadioButton.module.css'

/**
 * RadioButton component
 * @param {'Default'|'Hover'|'Focused'|'Disabled'|'Error'|'Validation'} state
 * @param {'Filled'|'Outlined'} style
 * @param {boolean} checked
 */
export default function RadioButton({
  label,
  description,
  checked = false,
  onChange,
  state = 'Default',
  disabled = false,
  id,
  name,
  value,
  className,
}) {
  const isDisabled = disabled || state === 'Disabled'
  const hasError = state === 'Error'
  const isValidation = state === 'Validation'

  const dataAttrs = {
    'data-state': state,
    ...(isDisabled && { 'data-disabled': '' }),
    ...(hasError && { 'data-error': '' }),
    ...(isValidation && { 'data-validation': '' }),
    ...(checked && { 'data-checked': '' }),
  }

  return (
    <label
      className={`${styles.wrapper} ${className || ''}`}
      {...dataAttrs}
    >
      <span className={styles.control}>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={!isDisabled ? onChange : undefined}
          disabled={isDisabled}
          aria-invalid={hasError}
          className={styles.nativeInput}
        />
        <span className={styles.dot} aria-hidden="true" />
      </span>
      {(label || description) && (
        <span className={styles.labelGroup}>
          {label && <span className={styles.label}>{label}</span>}
          {description && <span className={styles.description}>{description}</span>}
        </span>
      )}
    </label>
  )
}
