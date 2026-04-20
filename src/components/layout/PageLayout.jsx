import { Outlet, useLocation } from 'react-router-dom'
import NavPrimary from './NavPrimary'
import NavSecondary from './NavSecondary'
import styles from './PageLayout.module.css'

export default function PageLayout() {
  const location = useLocation()
  const isReports = location.pathname.startsWith('/reports')
  const isSettings = location.pathname.startsWith('/settings')
  const hasSecondaryNav = isReports || isSettings

  return (
    <div className={styles.shell}>
      <NavPrimary />
      {hasSecondaryNav && <NavSecondary />}
      <main className={hasSecondaryNav ? styles.mainReports : styles.mainDefault}>
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
