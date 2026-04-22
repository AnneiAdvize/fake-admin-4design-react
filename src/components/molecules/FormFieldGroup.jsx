import styles from './FormFieldGroup.module.css'

export default function FormFieldGroup({ label, value, onChange, error, helperText, required, children }) {
  return (
    <div className={styles.fieldGroup}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {error && <span className={styles.errorText}>{error}</span>}
      {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  )
}
