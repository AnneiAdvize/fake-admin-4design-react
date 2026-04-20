import { Outlet, useLocation } from 'react-router-dom'
import NavPrimary from './NavPrimary'
import NavSecondary from './NavSecondary'
import styles from './PageLayout.module.css'

export default function PageLayout() {
  const location = useLocation()
  const isReports = location.pathname.startsWith('/reports')

  return (
    <div className={styles.shell}>
      <NavPrimary />
      {isReports && <NavSecondary />}
      <main className={isReports ? styles.mainReports : styles.mainDefault}>
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
