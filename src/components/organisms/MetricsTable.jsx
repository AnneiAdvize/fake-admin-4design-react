import styles from './MetricsTable.module.css'

export default function MetricsTable({ data = [], columns = [], filters, onFilterChange, children }) {
  return (
    <div className={styles.section}>
      {(filters || children) && (
        <div className={styles.filterBar}>
          {filters && filters.map((f, i) => (
            <div key={i} className={styles.filter}>
              <label className={styles.filterLabel}>{f.label}</label>
              <select
                className={styles.filterSelect}
                value={f.value}
                onChange={e => onFilterChange?.(f.key, e.target.value)}
              >
                {f.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          ))}
          {children}
        </div>
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} className={styles.th} style={col.width ? { width: col.width } : {}}>
                {col.label}
                {col.sortable && <span className={styles.sortArrow}> ↕</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={styles.tr}>
              {columns.map((col, j) => (
                <td key={j} className={`${styles.td} ${col.numeric ? styles.tdNum : ''}`}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
