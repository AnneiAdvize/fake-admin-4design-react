import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ShoppingAssistantBuilder.module.css'
import BuilderTemplate from '../components/templates/BuilderTemplate'
import AssistantForm, { AssistantPreview } from '../components/organisms/AssistantForm'

export default function ShoppingAssistantBuilder() {
  const navigate = useNavigate()
  const [visitorName, setVisitorName] = useState('Your AI Shopping Assistant')

  return (
    <div>
      <button className={styles.backLink} onClick={() => navigate('/shopping-assistant')}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M10 3L5 8l5 5"/>
        </svg>
        Back to AI Shopping Assistant listing
      </button>
      <BuilderTemplate
        configPanel={<AssistantForm navigate={navigate} onVisitorNameChange={setVisitorName} />}
        previewPanel={<AssistantPreview visitorName={visitorName} />}
        footerSlot={null}
        previewWidth="340px"
      />
    </div>
  )
}
