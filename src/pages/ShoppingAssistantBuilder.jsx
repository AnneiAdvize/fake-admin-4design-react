import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ShoppingAssistantBuilder.module.css'

const INITIAL_SKILLS = [
  { id: 1, name: 'WISMO', trigger: 'When the shopper asks where is their order', actionType: 'action-api', actionLabel: 'API: Shipup' },
  { id: 2, name: 'Human agent escalation', trigger: 'When a visitor asks to speak to a human agent', actionType: '', actionLabel: 'Send message' },
  { id: 3, name: 'Unknown answer handling', trigger: "When the assistant doesn't know the answer", actionType: '', actionLabel: 'Send message' },
]

const RANKING_RULES = [
  { rank: 1, title: 'The products are first displayed based on their match with the customer\'s request', sub: 'Products with the highest match score are shown first' },
  { rank: 2, title: 'Then sorted by available stock', sub: 'Out-of-stock products are deprioritized' },
]

export default function ShoppingAssistantBuilder() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('identity')
  const [brandIdentity, setBrandIdentity] = useState(true)
  const [panelPos, setPanelPos] = useState('left')
  const [skills, setSkills] = useState(INITIAL_SKILLS)
  const [skillModal, setSkillModal] = useState(false)

  function deleteSkill(id) {
    setSkills(prev => prev.filter(s => s.id !== id))
  }

  const TABS = [
    { id: 'identity', label: 'Identity' },
    { id: 'content', label: 'Content' },
    { id: 'skills', label: 'Skills' },
    { id: 'selling-logic', label: 'Selling logic' },
  ]

  return (
    <div>
      <button className={styles.backLink} onClick={() => navigate('/shopping-assistant')}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M10 3L5 8l5 5"/>
        </svg>
        Back to AI Shopping Assistant listing
      </button>

      <div className={styles.saLayout}>
        <div>
          <div className={styles.saHeader}>
            <div className={styles.saHeaderLeft}>
              <h1 className={styles.saTitle}>Shopping Assistant</h1>
              <span className={styles.statusPill}>Offline</span>
            </div>
            <div className={styles.saHeaderActions}>
              <button className={styles.btnCancel} onClick={() => navigate('/shopping-assistant')}>Cancel</button>
              <button className={styles.btnSave}>Save</button>
              <button className={styles.btnPublish}>Publish</button>
            </div>
          </div>

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

          {activeTab === 'identity' && (
            <IdentityTab
              brandIdentity={brandIdentity}
              setBrandIdentity={setBrandIdentity}
              panelPos={panelPos}
              setPanelPos={setPanelPos}
              styles={styles}
            />
          )}
          {activeTab === 'content' && <ContentTab styles={styles} />}
          {activeTab === 'skills' && (
            <SkillsTab
              skills={skills}
              onDelete={deleteSkill}
              onAdd={() => setSkillModal(true)}
              styles={styles}
            />
          )}
          {activeTab === 'selling-logic' && <SellingLogicTab styles={styles} />}
        </div>

        <PreviewPanel styles={styles} />
      </div>

      {skillModal && <SkillModal onClose={() => setSkillModal(false)} styles={styles} />}
    </div>
  )
}

function IdentityTab({ brandIdentity, setBrandIdentity, panelPos, setPanelPos, styles }) {
  return (
    <>
      <div className={styles.formCard}>
        <p className={styles.formCardTitle}>Identity</p>
        <div className={styles.formRow2col}>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Internal Name*</label>
            <input className={styles.formInput} type="text" defaultValue="Shopping Assistant" />
            <span className={styles.formCaption}>Visible only to your team for identification</span>
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Visitor-facing Name*</label>
            <input className={styles.formInput} type="text" defaultValue="Your AI Shopping Assistant" />
          </div>
        </div>
      </div>

      <div className={styles.formCard}>
        <div className={styles.styleHeader}>
          <p className={styles.formCardTitle} style={{ marginBottom: 0 }}>Style</p>
          <label className={styles.toggleSwitch}>
            <input type="checkbox" checked={brandIdentity} onChange={e => setBrandIdentity(e.target.checked)} />
            <span className={styles.toggleTrack} />
            <span className={styles.toggleSwitchLabel}>Apply the <span className={styles.knowledgeLink}>brand identity</span> styles</span>
          </label>
        </div>
        {brandIdentity && (
          <div className={styles.infoChip}>
            <div className={styles.infoChipIcon}>i</div>
            <span>Your assistant now follows the style defined for your brand.</span>
          </div>
        )}
        <p className={styles.formLabel} style={{ marginTop: 'var(--sp-4)', marginBottom: 'var(--sp-3)' }}>Colors</p>
        <div className={styles.formRow2col} style={{ marginBottom: 'var(--sp-4)' }}>
          <div>
            <div className={`${styles.colorBar} ${styles.colorBarLight}`} style={{ background: '#34393F' }}>#34393F</div>
            <div className={styles.colorMeta}>
              <span className={styles.accessibleBadge}>✅ Accessible</span>
              <label className={styles.toggleSwitch}>
                <input type="checkbox" />
                <span className={styles.toggleTrack} />
                <span className={styles.toggleSwitchLabel} style={{ fontSize: 'var(--text-xs)' }}>Dark font color</span>
              </label>
            </div>
          </div>
          <div>
            <div className={`${styles.colorBar} ${styles.colorBarLight}`} style={{ background: '#8260FF' }}>#8260FF</div>
            <div className={styles.colorMeta}>
              <span className={styles.accessibleBadge}>✅ Accessible</span>
              <label className={styles.toggleSwitch}>
                <input type="checkbox" />
                <span className={styles.toggleTrack} />
                <span className={styles.toggleSwitchLabel} style={{ fontSize: 'var(--text-xs)' }}>Dark font color</span>
              </label>
            </div>
          </div>
        </div>
        <div className={styles.formRow2col}>
          <div className={styles.formField} style={{ marginBottom: 0 }}>
            <label className={styles.formLabel}>Google font</label>
            <div className={styles.fieldStatic}>Open Sans</div>
          </div>
          <div className={styles.formField} style={{ marginBottom: 0 }}>
            <label className={styles.formLabel}>Radius</label>
            <div className={styles.fieldStatic}>4px</div>
          </div>
        </div>
      </div>

      <div className={styles.formCard}>
        <p className={styles.formCardTitle}>Panel position</p>
        <div className={styles.panelInfoNote}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
            <circle cx="7" cy="7" r="5.5"/><path d="M7 5.5v.5M7 8v1" strokeLinecap="round"/>
          </svg>
          <span>If your assistant comes from a floating widget, it will show on the same side.</span>
        </div>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-content-secondary)', marginBottom: 'var(--sp-3)' }}>
          Define the side from which the panel will display from a fixed widget
        </p>
        <div className={styles.panelPosOptions}>
          <button
            className={`${styles.panelPosOption} ${panelPos === 'left' ? styles.panelPosSelected : ''}`}
            onClick={() => setPanelPos('left')}
          >
            Left
            <span className={styles.posIndicator}><span className={styles.posThumb} /></span>
          </button>
          <button
            className={`${styles.panelPosOption} ${panelPos === 'right' ? styles.panelPosSelected : ''}`}
            onClick={() => setPanelPos('right')}
          >
            Right
            <span className={styles.posIndicator} style={{ justifyContent: 'flex-end' }}><span className={styles.posThumb} /></span>
          </button>
        </div>
      </div>
    </>
  )
}

function ContentTab({ styles }) {
  return (
    <>
      <div className={styles.formCard}>
        <p className={styles.formCardTitle}>Knowledge sources</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-content-secondary)', marginBottom: 'var(--sp-4)' }}>
          Connect the data sources that will power your assistant's answers.{' '}
          <span className={styles.knowledgeLink}>View my knowledge</span>
        </p>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Product Catalog</label>
          <select className={styles.formSelect}>
            <option>Catalog_2025</option>
            <option>Catalog_2024</option>
          </select>
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Helpful Content</label>
          <div className={styles.multiTagField}>
            <span className={styles.multiTag}>FAQ 2024 <button className={styles.tagRemove}>×</button></span>
            <span className={styles.multiTag}>Website content extract 2024 <button className={styles.tagRemove}>×</button></span>
          </div>
        </div>
      </div>

      <div className={styles.formCard}>
        <p className={styles.formCardTitle}>Conversation messages</p>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Welcome message*</label>
          <textarea className={styles.formTextarea} rows={3} defaultValue={"Welcome!\nI'm an AI-powered assistant here to answer your questions about products or post-sales support."} />
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Follow-up message*</label>
          <input className={styles.formInput} type="text" defaultValue="How can I assist you?" />
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Closing message if transfer failure</label>
          <textarea className={styles.formTextarea} rows={3} defaultValue="Thank you for contacting us. If you need further assistance, feel free to reach out again. In the meantime, have a great day." />
        </div>
        <p className={styles.surveyNote}>
          A satisfaction survey will be sent &nbsp;<span className={styles.knowledgeLink}>Edit the survey settings</span>
        </p>
      </div>
    </>
  )
}

function SkillsTab({ skills, onDelete, onAdd, styles }) {
  return (
    <div>
      <div className={styles.skillsHeader}>
        <div className={styles.skillsHeaderText}>
          <p className={styles.skillsTitle}>Skills</p>
          <p className={styles.skillsDesc}>Create rules for specific situations. These rules will always override the assistant's general instructions.</p>
        </div>
        <button className={styles.btnSave} onClick={onAdd} style={{ flexShrink: 0 }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" style={{ marginRight: 4 }}>
            <path d="M6 1v10M1 6h10"/>
          </svg>
          Add skill
        </button>
      </div>
      {skills.map(s => (
        <div key={s.id} className={styles.skillListItem}>
          <div className={styles.skillListItemInfo}>
            <div className={styles.skillListItemName}>{s.name}</div>
            <div className={styles.skillListItemTrigger}>{s.trigger}</div>
            <span className={`${styles.skillListItemAction} ${s.actionType ? styles[s.actionType] : ''}`}>{s.actionLabel}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <button className={styles.skillEditBtn} title="Edit">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M9.5 2.5l2 2-8 8H1.5v-2l8-8z"/>
              </svg>
            </button>
            <button className={`${styles.skillEditBtn} ${styles.skillDeleteBtn}`} onClick={() => onDelete(s.id)} title="Delete">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M2 4h10M5 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4M6 7v3M8 7v3M3 4l.7 7.3a.7.7 0 00.7.7h5.2a.7.7 0 00.7-.7L11 4"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function SellingLogicTab({ styles }) {
  const rules = [
    { rank: 1, title: "The products are first displayed based on their match with the customer's request", sub: 'Products with the highest match score are shown first' },
    { rank: 2, title: 'Then sorted by available stock', sub: 'Out-of-stock products are deprioritized' },
  ]
  return (
    <div className={styles.formCard}>
      <p className={styles.formCardTitle}>Product ranking rules</p>
      <p className={styles.cardDesc}>Organize and display the products in your online catalog in a way that best suits your needs and preferences.</p>
      {rules.map(r => (
        <div key={r.rank} className={styles.rankingItem}>
          <span className={styles.rankingBadge}>{r.rank}</span>
          <div>
            <p className={styles.rankingItemTitle}>{r.title}</p>
            <p className={styles.rankingItemSub}>{r.sub}</p>
          </div>
        </div>
      ))}
      <button className={styles.btnAddFeature}>
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          <path d="M6 1v10M1 6h10"/>
        </svg>
        Add ranking rule
      </button>
    </div>
  )
}

function PreviewPanel({ styles }) {
  return (
    <div className={styles.previewPanel}>
      <div className={styles.previewPanelTopbar}>
        <div className={styles.previewPanelName}>
          My first Assistant
          <span className={styles.previewChevron}>▾</span>
        </div>
        <span className={styles.previewExpand}>⤢</span>
      </div>
      <div className={styles.previewBody}>
        <div className={styles.chatWidget}>
          <div className={styles.chatProductCard}>
            <div className={styles.chatProductImg} />
            <div className={styles.chatProductInfo}>
              <div className={styles.chatProductName}>Nespresso Vertuo Next</div>
              <div className={styles.chatProductPrice}>89,99 €</div>
            </div>
            <button className={styles.chatProductBtn}>View</button>
          </div>
          <div className={styles.chatBody}>
            <div className={styles.chatTimestamp}>Today, 14:32</div>
            <div className={styles.chatBubble}>
              Welcome! I'm an AI-powered assistant here to answer your questions about products or post-sales support.
            </div>
            <div className={`${styles.chatBubble} ${styles.chatBubbleSub}`}>How can I assist you?</div>
          </div>
          <div className={styles.chatQuickReplies}>
            <span className={styles.chatQuickReply}>Track my order</span>
            <span className={styles.chatQuickReply}>Product info</span>
            <span className={styles.chatQuickReply}>Returns</span>
          </div>
          <div className={styles.chatInputRow}>
            <svg className={styles.chatInputIcon} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <circle cx="5.5" cy="5.5" r="3.5"/><path d="M8.5 8.5l3 3"/>
            </svg>
            <input className={styles.chatInputField} placeholder="Type your message…" />
          </div>
        </div>
        <div className={styles.previewFooter}>
          <span className={styles.previewFooterLink}>Test on my website</span>
          <span className={styles.previewFooterSep}>·</span>
          <span className={styles.previewFooterLink}>View guidelines</span>
        </div>
      </div>
    </div>
  )
}

function SkillModal({ onClose, styles }) {
  const [step, setStep] = useState(0)
  const [selectedType, setSelectedType] = useState(null)

  const toolTypes = [
    { id: 'api', label: 'API', color: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8' },
    { id: 'mcp', label: 'MCP', color: '#F5F3FF', border: '#DDD6FE', text: '#6D28D9' },
    { id: 'search', label: 'Search', color: '#FFF7ED', border: '#FED7AA', text: '#C2410C' },
    { id: 'message', label: 'Send message', color: 'var(--color-bg-default)', border: 'var(--color-border-default)', text: 'var(--color-content-secondary)' },
  ]

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          {step === 1 && (
            <button className={`${styles.modalBack} ${styles.modalBackVisible}`} onClick={() => setStep(0)}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M9 3L4 7l5 4"/>
              </svg>
              Back
            </button>
          )}
          <div className={styles.modalHeaderCenter}>
            <span className={styles.modalTitle}>{step === 0 ? 'Add skill' : 'Configure skill'}</span>
          </div>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.modalBody}>
          {step === 0 ? (
            <>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Skill name</label>
                <input className={styles.formInput} type="text" placeholder="e.g. WISMO" />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Trigger — when should this skill activate?</label>
                <textarea className={styles.formTextarea} rows={2} placeholder="e.g. When the shopper asks where is their order" />
              </div>
              <div>
                <div className={styles.toolSectionLabel}>Action type</div>
                <div className={styles.toolSectionDesc}>Choose how the assistant should respond when this skill activates</div>
                <div className={styles.toolTypeChips}>
                  {toolTypes.map(t => (
                    <button
                      key={t.id}
                      className={`${styles.toolTypeChip} ${selectedType === t.id ? styles.toolTypeChipActive : ''}`}
                      onClick={() => setSelectedType(t.id)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.formField}>
              <label className={styles.formLabel}>Configuration</label>
              <input className={styles.formInput} type="text" placeholder="Configure your skill…" />
            </div>
          )}
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.btnCancelText} onClick={onClose}>Cancel</button>
          {step === 0
            ? <button className={styles.btnSave} onClick={() => setStep(1)}>Next</button>
            : <button className={styles.btnPublish} onClick={onClose}>Save skill</button>
          }
        </div>
      </div>
    </div>
  )
}
