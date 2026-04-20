import { NavLink, useLocation } from 'react-router-dom'
import styles from './NavSecondary.module.css'

const REPORTS_LINKS = [
  { to: '/reports/overview', label: 'Overview' },
  { to: '/reports/sales', label: 'Sales' },
  { to: '/reports/conversations', label: 'Conversations' },
  { to: '/reports/quality', label: 'Quality' },
]

const SETTINGS_LINKS = [
  { to: '/settings/users', label: 'Users' },
  { to: '/settings/page-types', label: 'Page types' },
  { to: '/settings/integration', label: 'Integration' },
  { to: '/settings/consent', label: 'Consent' },
]

export default function NavSecondary() {
  const location = useLocation()
  const links = location.pathname.startsWith('/settings') ? SETTINGS_LINKS : REPORTS_LINKS

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={styles.item}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
