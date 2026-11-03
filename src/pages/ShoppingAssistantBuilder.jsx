import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ShoppingAssistantBuilder.module.css'

const productImage = 'https://www.figma.com/api/mcp/asset/de76a3a4-22a4-4147-a4c5-dda74706a3d9'

const INITIAL_SKILLS = [
  { id: 1, name: 'WISMO', trigger: 'When the shopper asks where is their order', actionType: 'action-api', actionLabel: 'API: Shipup' },
  { id: 2, name: 'Human agent escalation', trigger: 'When a visitor asks to speak to a human agent', actionType: '', actionLabel: 'Send message' },
  { id: 3, name: 'Unknown answer handling', trigger: "When the assistant doesn't know the answer", actionType: '', actionLabel: 'Send message' },
]

const TABS = [
  { id: 'identity', label: 'Identity' },
  { id: 'knowledge', label: 'Knowledge' },
  { id: 'custom-behaviors', label: 'Custom behaviors' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'appearance', label: 'Appearance' },
]

export default function ShoppingAssistantBuilder() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('identity')

  return (
    <div className={styles.pageWrapper}>
      <button className={styles.backLink} onClick={() => navigate('/shopping-assistant')}>
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M9 3L4 7l5 4" />
        </svg>
        Back to AI Shopping Assistant listing
      </button>

      <div className={styles.saHeader}>
        <div className={styles.saHeaderLeft}>
          <h1 className={styles.saTitle}>Shopping Assistant</h1>
          <span className={styles.statusPill}>Offline</span>
        </div>
      </div>

      <div className={styles.saLayout}>
        <div className={styles.leftPanel}>
          <div className={styles.pageTabs}>
            {TABS.map(t => (
              <button
                key={t.id}
                className={`${styles.pageTab} ${activeTab === t.id ? styles.pageTabActive : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'identity' && <IdentityTab styles={styles} />}
          {activeTab !== 'identity' && (
            <div className={styles.formCard}>
              <p className={styles.formCardTitle}>{TABS.find(t => t.id === activeTab)?.label}</p>
              <p className={styles.placeholderText}>Content coming soon.</p>
            </div>
          )}

          <div className={styles.pageFooter}>
            <button className={styles.btnCancel} onClick={() => navigate('/shopping-assistant')}>Cancel</button>
            <button className={styles.btnSaveGreen}>Save</button>
          </div>
        </div>

        <PreviewPanel styles={styles} />
      </div>
    </div>
  )
}

function IdentityTab({ styles }) {
  const [surveyEnabled, setSurveyEnabled] = useState(true)

  return (
    <>
      <div className={styles.formCard}>
        <p className={styles.formCardTitle}>Name</p>
        <div className={styles.formRow2col}>
          <div className={styles.formFieldStack}>
            <label className={styles.formLabelLight}>Internal name</label>
            <input className={styles.formInputFilled} type="text" defaultValue="Product_discovery AISA" />
            <span className={styles.formCaption}>Visible only to your team.</span>
          </div>
          <div className={styles.formFieldStack}>
            <label className={styles.formLabelLight}>Public name</label>
            <input className={styles.formInputFilled} type="text" defaultValue="Your AI Shopping Assistant" />
          </div>
        </div>
      </div>

      <div className={styles.formCard}>
        <div className={styles.cardHeaderRow}>
          <p className={styles.formCardTitle} style={{ marginBottom: 0 }}>Personnality</p>
          <button className={styles.btnGenerateAI}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z" fill="url(#sg)" />
              <defs>
                <linearGradient id="sg" x1="1" y1="8" x2="15" y2="8" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8F26B5" />
                  <stop offset="1" stopColor="#D371FF" />
                </linearGradient>
              </defs>
            </svg>
            <span className={styles.btnGenerateAIText}>Generate from website</span>
          </button>
        </div>
        <div className={styles.formFieldStack}>
          <div className={styles.labelWithIcon}>
            <span className={styles.formLabelLight}>Define the assistant's tone of voice</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#6c6c68" strokeWidth="1.5" aria-hidden="true">
              <circle cx="8" cy="8" r="6" /><path d="M8 7.5v3M8 5.5v.5" strokeLinecap="round" />
            </svg>
          </div>
          <textarea
            className={styles.formTextareaLarge}
            defaultValue={`You are the shopping assistant of Brand, a French organic skincare brand.\n\nYour tone is warm, clear, and sales-focused, like a helpful in-store advisor. You guide customers quickly toward the right products based on their needs.\n\nHighlight key benefits, skin results, natural ingredients, and ease of use. Emphasize what makes each product a good choice and help customers feel confident buying.\n\nKeep it simple, helpful, and gently persuasive, never pushy.`}
          />
        </div>
        <div className={styles.infoBanner}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#2a78a8" strokeWidth="1.5" aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="8" cy="8" r="6" /><path d="M8 7.5v3M8 5.5v.5" strokeLinecap="round" />
          </svg>
          <span className={styles.infoBannerText}>To set up actions based on shopper behavior, go to the Custom behavior tab</span>
          <button className={styles.btnManage}>Manage</button>
        </div>
      </div>

      <div className={styles.formCard}>
        <p className={styles.formCardTitle}>Conversation messages</p>
        <div className={styles.formFieldStack}>
          <label className={styles.formLabelLight}>Welcome message*</label>
          <textarea
            className={styles.formTextarea}
            defaultValue={"Welcome!\nI'm an AI-powered assistant here to answer your questions about products or post-sales support."}
            rows={3}
          />
        </div>
        <div className={styles.formFieldStack}>
          <label className={styles.formLabelLight}>Follow-up message*</label>
          <input className={styles.formInputFilled} type="text" defaultValue="How can I assist you?" />
        </div>
        <div className={styles.formFieldStack}>
          <label className={styles.formLabelLight}>Closing message if transfert failure</label>
          <textarea
            className={styles.formTextarea}
            defaultValue="Thank you for contacting us. If you need further assistance, feel free to reach out again. In the meantime, have a great day."
            rows={3}
          />
        </div>
        <div className={styles.surveyRow}>
          <label className={styles.toggleSwitch}>
            <input type="checkbox" checked={surveyEnabled} onChange={e => setSurveyEnabled(e.target.checked)} />
            <span className={styles.toggleTrack} />
            <span className={styles.toggleSwitchLabel}>A satisfaction survey will be sent</span>
          </label>
          <button className={styles.editSurveyLink}>Edit survey settings</button>
        </div>
      </div>
    </>
  )
}

function PreviewPanel({ styles }) {
  return (
    <div className={styles.previewPanel}>
      <div className={styles.chatHeader}>
        <button className={styles.chatRoundBtn} aria-label="Expand">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M2 9.5V14h4.5M14 6.5V2h-4.5" /><path d="M2 14l5-5M14 2l-5 5" />
          </svg>
        </button>
        <span className={styles.chatHeaderName}>Your AI Shopping Assistant</span>
        <button className={styles.chatRoundBtn} aria-label="Collapse">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </div>

      <div className={styles.chatProductCard}>
        <img className={styles.chatProductImg} src={productImage} alt="Nourishing Night Balm" />
        <div className={styles.chatProductInfo}>
          <div className={styles.chatProductName}>Nourishing Night Balm</div>
          <div className={styles.chatProductPrice}>34€</div>
        </div>
        <button className={styles.chatAddToCart}>Add to cart</button>
      </div>

      <div className={styles.chatBody}>
        <div className={styles.chatSeparator}>
          <span className={styles.chatSeparatorLine} />
          <span className={styles.chatSeparatorDate}>05/07/2025 - 2:56PM</span>
          <span className={styles.chatSeparatorLine} />
        </div>
        <p className={styles.chatMsgBold}>👋 Hello, welcome to Brand's AI Shopping Assistant.</p>
        <p className={styles.chatMsg}>What can I help you with?</p>
      </div>

      <div className={styles.chatFooter}>
        <div className={styles.chatFooterBrand}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="#6c6c68" aria-hidden="true"><circle cx="7" cy="7" r="7" /></svg>
          <span className={styles.chatFooterLogoText}>iadvize</span>
          <span className={styles.chatFooterDot}>·</span>
          <span className={styles.chatFooterPrivacy}>Privacy →</span>
        </div>
        <div className={styles.chatCompose}>
          <input className={styles.chatComposeInput} type="text" placeholder="Type your message" />
        </div>
      </div>
    </div>
  )
}
