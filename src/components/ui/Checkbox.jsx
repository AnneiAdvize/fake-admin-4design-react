import styles from './Checkbox.module.css'

/**
 * Checkbox component
 * @param {'Default'|'Hover'|'Focused'|'Disabled'|'Error'|'Validation'} state
 * @param {boolean} checked
 * @param {boolean} indeterminate - partial/mixed state
 */
export default function Checkbox({
  label,
  checked = false,
  indeterminate = false,
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
    ...(indeterminate && { 'data-indeterminate': '' }),
  }

  return (
    <label
      className={`${styles.wrapper} ${className || ''}`}
      {...dataAttrs}
    >
      <span className={styles.control}>
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={!isDisabled ? onChange : undefined}
          disabled={isDisabled}
          aria-checked={indeterminate ? 'mixed' : checked}
          aria-invalid={hasError}
          className={styles.nativeInput}
          ref={el => {
            if (el) el.indeterminate = indeterminate
          }}
        />
        <span className={styles.box} aria-hidden="true">
          {checked && !indeterminate && (
            <svg className={styles.checkmark} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4L4.5 7.5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {indeterminate && (
            <span className={styles.indeterminateMark} aria-hidden="true" />
          )}
        </span>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
