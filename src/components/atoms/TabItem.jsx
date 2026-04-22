import styles from './TabItem.module.css'

export default function TabItem({
  label,
  selected = false,
  disabled = false,
  dark = false,
  icon = null,
  tag = null,
  underline = 'Small',
  state = 'Default',
  onClick,
}) {
  const dataAttrs = {
    ...(selected && !disabled && { 'data-selected': '' }),
    ...(disabled && { 'data-disabled': '' }),
    ...(dark && { 'data-dark': '' }),
    'data-underline': underline,
    'data-state': state,
  }

  return (
    <button
      className={styles.tabItem}
      onClick={!disabled ? onClick : undefined}
      aria-selected={selected}
      aria-disabled={disabled}
      role="tab"
      {...dataAttrs}
    >
      <span className={styles.content}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{label}</span>
        {tag != null && <span className={styles.tag}>{tag}</span>}
      </span>
      <span className={styles.indicator} aria-hidden="true" />
    </button>
  )
}
