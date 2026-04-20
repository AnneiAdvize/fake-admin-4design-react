import styles from './Button.module.css'

export default function Button({ variant = 'primary', size = 'md', children, onClick, disabled }) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
