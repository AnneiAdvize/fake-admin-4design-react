import styles from './DropdownMenu.module.css'

/**
 * DropdownMenu — floating list of options.
 * @param {{ value: string, label: string, icon?: React.ReactNode }[]} items
 * @param {{ title: string, items: { value: string, label: string, icon?: React.ReactNode }[] }[]} sections
 * @param {function} onSelect
 * @param {string} selected - currently selected value
 */
export default function DropdownMenu({
  items = [],
  sections = [],
  onSelect,
  selected,
  className,
}) {
  const hasSections = sections.length > 0

  return (
    <div className={`${styles.menu} ${className || ''}`} role="menu">
      {!hasSections && items.map(item => (
        <button
          key={item.value}
          type="button"
          className={styles.item}
          role="menuitem"
          data-selected={item.value === selected ? '' : undefined}
          onClick={() => onSelect?.(item.value)}
        >
          {item.icon && <span className={styles.icon} aria-hidden="true">{item.icon}</span>}
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
      {hasSections && sections.map((section, i) => (
        <div key={i} className={styles.section}>
          {section.title && (
            <p className={styles.sectionTitle}>{section.title}</p>
          )}
          {section.items.map(item => (
            <button
              key={item.value}
              type="button"
              className={styles.item}
              role="menuitem"
              data-selected={item.value === selected ? '' : undefined}
              onClick={() => onSelect?.(item.value)}
            >
              {item.icon && <span className={styles.icon} aria-hidden="true">{item.icon}</span>}
              <span className={styles.label}>{item.label}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
