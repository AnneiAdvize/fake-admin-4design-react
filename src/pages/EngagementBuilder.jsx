import { useNavigate } from 'react-router-dom'
import styles from './EngagementBuilder.module.css'
import BuilderTemplate from '../components/templates/BuilderTemplate'
import StrategyForm, { StrategyFormPreview } from '../components/organisms/StrategyForm'

export default function EngagementBuilder() {
  const navigate = useNavigate()

  const footer = (
    <>
      <button className={styles.btnCancel} onClick={() => navigate('/engagement')}>Cancel</button>
      <button className={styles.btnSave}>Save</button>
      <button className={styles.btnPublish}>Publish</button>
    </>
  )

  return (
    <div>
      <button className={styles.backLink} onClick={() => navigate('/engagement')}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M10 3L5 8l5 5"/>
        </svg>
        Back to engagement strategies listing
      </button>
      <h1 className={styles.builderTitle}>Engagement builder</h1>
      <BuilderTemplate
        configPanel={<StrategyForm navigate={navigate} />}
        previewPanel={<StrategyFormPreview navigate={navigate} />}
        footerSlot={footer}
      />
    </div>
  )
}
