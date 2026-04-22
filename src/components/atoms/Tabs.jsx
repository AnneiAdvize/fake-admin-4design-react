import styles from './Tabs.module.css'
import TabItem from './TabItem'

/**
 * @param {{ id: string, label: string, icon?: React.ReactNode, tag?: string|number, disabled?: boolean }[]} tabs
 * @param {string} value - id of the active tab
 * @param {(id: string) => void} onChange
 * @param {'Small'|'Large'|'OFF'} underline
 * @param {boolean} dark
 */
export default function Tabs({
  tabs = [],
  value,
  onChange,
  underline = 'Small',
  dark = false,
  className,
}) {
  return (
    <div className={`${styles.tabs}${className ? ` ${className}` : ''}`} role="tablist">
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          label={tab.label}
          selected={tab.id === value}
          disabled={tab.disabled}
          dark={dark}
          icon={tab.icon}
          tag={tab.tag}
          underline={underline}
          onClick={() => onChange?.(tab.id)}
        />
      ))}
    </div>
  )
}
