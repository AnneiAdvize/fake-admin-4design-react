import styles from './TextArea.module.css'

/**
 * TextArea — multi-line text input with label, helper text, error state, and various states.
 * @param {'rest'|'hover'|'focused'|'filled'|'disabled'|'readonly'|'error'} state
 */
export default function TextArea({
  label,
  placeholder = '',
  helperText,
  errorText,
  value,
  defaultValue,
  onChange,
  disabled = false,
  readOnly = false,
  required = false,
  state,
  rows = 4,
  id,
  name,
  className,
}) {
  const hasError = state === 'error' || !!errorText
  const isDisabled = disabled || state === 'disabled'
  const isReadOnly = readOnly || state === 'readonly'

  const dataAttrs = {
    ...(hasError && { 'data-error': '' }),
    ...(isDisabled && { 'data-disabled': '' }),
    ...(isReadOnly && { 'data-readonly': '' }),
  }

  return (
    <div
      className={`${styles.field} ${className || ''}`}
      {...dataAttrs}
    >
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        className={styles.textarea}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={isDisabled}
        readOnly={isReadOnly}
        rows={rows}
        aria-invalid={hasError}
        aria-describedby={
          errorText ? `${id}-error` : helperText ? `${id}-helper` : undefined
        }
      />
      {hasError && errorText && (
        <p className={styles.errorText} id={`${id}-error`} role="alert">
          {errorText}
        </p>
      )}
      {!hasError && helperText && (
        <p className={styles.helperText} id={`${id}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  )
}
