import styles from './DropdownItem.module.css'

export default function DropdownItem({ label, icon, onClick, isSelected, isDestructive }) {
  return (
    <div
      className={`${styles.item} ${isSelected ? styles.itemSelected : ''} ${isDestructive ? styles.itemDestructive : ''}`}
      onClick={onClick}
      role="menuitem"
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
      {isSelected && (
        <span className={styles.selectedDot} />
      )}
    </div>
  )
}
