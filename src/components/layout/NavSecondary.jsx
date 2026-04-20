import { NavLink } from 'react-router-dom'
import styles from './NavSecondary.module.css'

export default function NavSecondary() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <NavLink to="/reports/overview" className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}>
          Overview
        </NavLink>
        <NavLink to="/reports/sales" className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}>
          Sales
        </NavLink>
        <NavLink to="/reports/conversations" className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}>
          Conversations
        </NavLink>
        <NavLink to="/reports/quality" className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}>
          Quality
        </NavLink>
      </div>
    </nav>
  )
}
