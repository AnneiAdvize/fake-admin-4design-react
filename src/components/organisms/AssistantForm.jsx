import { useState } from 'react'
import TextArea from '../atoms/TextArea'
import styles from './AssistantForm.module.css'

const INITIAL_SKILLS = [
  { id: 1, name: 'WISMO', trigger: 'When the shopper asks where is their order', tools: [{ type: 'API', name: 'Shipup' }] },
  { id: 2, name: 'Human agent escalation', trigger: 'When a visitor asks to speak to a human agent', tools: [{ type: 'message', name: 'Send message' }] },
  { id: 3, name: 'Unknown answer handling', trigger: "When the assistant doesn't know the answer", tools: [{ type: 'message', name: 'Send message' }] },
]

const TABS = [
  { id: 'identity', label: 'Identity' },
  { id: 'content', label: 'Content' },
  { id: 'skills', label: 'Skills' },
  { id: 'selling-logic', label: 'Selling logic' },
]

export default function AssistantForm({ navigate, onVisitorNameChange }) {
  const [activeTab, setActiveTab] = useState('identity')
  const [brandIdentity, setBrandIdentity] = useState(true)
  const [panelPos, setPanelPos] = useState('left')
  const [visitorName, setVisitorName] = useState('Your AI Shopping Assistant')
  const [skills, setSkills] = useState(INITIAL_SKILLS)
  const [editingSkill, setEditingSkill] = useState(null)

  function handleVisitorNameChange(name) {
    setVisitorName(name)
    onVisitorNameChange?.(name)
  }

  function deleteSkill(id) {
    setSkills(prev => prev.filter(s => s.id !== id))
  }

  function handleSaveSkill(skillData) {
    if (skillData.id) {
      setSkills(prev => prev.map(s => s.id === skillData.id ? skillData : s))
    } else {
      setSkills(prev => [...prev, { ...skillData, id: Date.now() }])
    }
    setEditingSkill(null)
  }

  return (
    <>
      <div className={styles.saHeader}>
        <div className={styles.saHeaderLeft}>
          <h1 className={styles.saTitle}>Shopping Assistant</h1>
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
          visitorName={visitorName}
          setVisitorName={handleVisitorNameChange}
        />
      )}
      {activeTab === 'content' && <ContentTab />}
      {activeTab === 'skills' && (
        <SkillsTab
          skills={skills}
          onDelete={deleteSkill}
          onAdd={() => setEditingSkill({})}
          onEdit={skill => setEditingSkill(skill)}
        />
      )}
      {activeTab === 'selling-logic' && <SellingLogicTab />}

      {editingSkill !== null && (
        <SkillModal
          editingSkill={editingSkill.id ? editingSkill : null}
          onClose={() => setEditingSkill(null)}
          onSave={handleSaveSkill}
        />
      )}
    </>
  )
}

export function AssistantPreview({ visitorName = 'Your AI Shopping Assistant' }) {
  const [message, setMessage] = useState('')

  return (
    <div className={styles.previewPanel}>
      <div className={styles.previewHeader}>
        <div className={styles.previewHeaderBar}>
          <span className={styles.previewName}>{visitorName}</span>
          <button className={styles.previewIconBtn} title="Minimize" aria-label="Minimize">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 6l5 5 5-5"/>
            </svg>
          </button>
        </div>
        <div className={styles.previewProductCard}>
          <img
            className={styles.previewProductImg}
            src="https://www.figma.com/api/mcp/asset/e50dbac0-de37-4b62-b187-55a307f600b8"
            alt="Nourishing Night Balm"
          />
          <div className={styles.previewProductInfo}>
            <p className={styles.previewProductName}>Nourishing Night Balm</p>
            <p className={styles.previewProductPrice}>34€</p>
          </div>
          <button className={styles.previewAddToCart}>Add to cart</button>
        </div>
      </div>

      <div className={styles.previewChat}>
        <div className={styles.previewSeparator}>
          <span className={styles.previewSeparatorLine} />
          <span className={styles.previewSeparatorDate}>05/07/2025 — 2:56PM</span>
          <span className={styles.previewSeparatorLine} />
        </div>
        <div className={styles.previewMessages}>
          <p className={styles.previewMessageText}>👋 Hello, welcome to Brand&apos;s AI Shopping Assistant.</p>
          <p className={styles.previewMessageText}>What can I help you with?</p>
        </div>
      </div>

      <div className={styles.previewFooter}>
        <div className={styles.previewQuickReplies}>
          <button className={styles.previewQuickReply}>Track my order</button>
          <button className={styles.previewQuickReply}>Product info</button>
          <button className={styles.previewQuickReply}>Returns</button>
        </div>
        <div className={styles.previewCompose}>
          <input
            className={styles.previewComposeInput}
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.4016 1.03813C10.33 0.98983 10.2372 0.987255 10.1632 1.03133L1.10914 6.41534C1.03228 6.46106 0.99015 6.54829 1.00197 6.63696C1.01358 6.72552 1.07719 6.79874 1.16309 6.82284L3.46371 7.46473C3.53358 7.48409 3.60849 7.46843 3.6647 7.4225L7.8098 4.41837L4.77622 7.69314C4.74529 7.73248 4.72874 7.78109 4.72874 7.83103V10.7765C4.72874 10.876 4.7941 10.9633 4.88935 10.991C4.91001 10.9972 4.93097 11 4.95172 11C5.02653 11 5.09815 10.9623 5.13977 10.8966L6.74041 8.37869L9.08038 9.03139C9.14183 9.04859 9.2078 9.03829 9.26164 9.00349C9.31518 8.96857 9.35135 8.91235 9.36101 8.84912L10.4975 1.25676C10.5103 1.17149 10.473 1.08632 10.4016 1.03813Z" fill="#3D3D38"/>
  </svg>
)

function IdentityTab({ brandIdentity, setBrandIdentity, panelPos, setPanelPos, visitorName, setVisitorName }) {
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
            <input className={styles.formInput} type="text" value={visitorName} onChange={e => setVisitorName(e.target.value)} />
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
            <select className={styles.formInput}>
              <option>Open Sans</option><option>Inter</option><option>Roboto</option>
            </select>
          </div>
          <div className={styles.formField} style={{ marginBottom: 0 }}>
            <label className={styles.formLabel}>Radius</label>
            <input className={styles.formInput} type="text" defaultValue="4px" placeholder="e.g. 4px" />
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

function ContentTab() {
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
            <option>Catalog_2025</option><option>Catalog_2024</option>
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
          <TextArea label="Welcome message*" rows={3} defaultValue={"Welcome!\nI'm an AI-powered assistant here to answer your questions about products or post-sales support."} />
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Follow-up message*</label>
          <input className={styles.formInput} type="text" defaultValue="How can I assist you?" />
        </div>
        <div className={styles.formField}>
          <TextArea label="Closing message if transfer failure" rows={3} defaultValue="Thank you for contacting us. If you need further assistance, feel free to reach out again. In the meantime, have a great day." />
        </div>
        <p className={styles.surveyNote}>
          A satisfaction survey will be sent &nbsp;<span className={styles.knowledgeLink}>Edit the survey settings</span>
        </p>
      </div>
    </>
  )
}

function SkillsTab({ skills, onDelete, onAdd, onEdit }) {
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
        <div key={s.id} className={styles.skillListItem} onClick={() => onEdit(s)}>
          <div className={styles.skillListItemInfo}>
            <div className={styles.skillListItemName}>{s.name}</div>
            <div className={styles.skillListItemTrigger}>{s.trigger}</div>
            <div className={styles.skillTagsRow}>
              {(s.tools || []).map((tool, i) => (
                <span key={i} className={styles.skillTag}>
                  {tool.name === 'Send message' && <SendIcon />}
                  {['API', 'MCP'].includes(tool.type) ? `${tool.type}: ${tool.name}` : tool.name}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <button className={styles.skillEditBtn} title="Edit" onClick={e => { e.stopPropagation(); onEdit(s) }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M9.5 2.5l2 2-8 8H1.5v-2l8-8z"/>
              </svg>
            </button>
            <button className={`${styles.skillEditBtn} ${styles.skillDeleteBtn}`} onClick={e => { e.stopPropagation(); onDelete(s.id) }} title="Delete">
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

function SellingLogicTab() {
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

function SkillModal({ onClose, onSave, editingSkill = null }) {
  const [step, setStep] = useState('skill')
  const [skillName, setSkillName] = useState(editingSkill?.name || '')
  const [skillTrigger, setSkillTrigger] = useState(editingSkill?.trigger || '')
  const [showToolPicker, setShowToolPicker] = useState(false)
  const [addedTools, setAddedTools] = useState(editingSkill?.tools || [])
  const [selectedPreset, setSelectedPreset] = useState(null)
  const [mcpName, setMcpName] = useState('')
  const [mcpDesc, setMcpDesc] = useState('')
  const [mcpUrl, setMcpUrl] = useState('')

  const TOOL_TYPES = ['MCP', 'API', 'Web search', 'File']

  function handleToolTypeClick(type) {
    if (type === 'MCP') { setStep('mcp'); setShowToolPicker(false) }
    else { setAddedTools(prev => [...prev, { type, name: type }]); setShowToolPicker(false) }
  }

  function handleBackFromMcp() {
    setStep('skill'); setSelectedPreset(null)
    setMcpName(''); setMcpDesc(''); setMcpUrl('')
  }

  function selectPreset(name) {
    setSelectedPreset(prev => prev === name ? null : name)
    setMcpName(''); setMcpDesc(''); setMcpUrl('')
  }

  function handleAddMcp() {
    const name = selectedPreset || mcpName.trim()
    if (!name) return
    setAddedTools(prev => [...prev, { type: 'MCP', name }])
    setStep('skill'); setSelectedPreset(null)
    setMcpName(''); setMcpDesc(''); setMcpUrl('')
  }

  function removeTool(i) { setAddedTools(prev => prev.filter((_, idx) => idx !== i)) }

  const canAddMcp = selectedPreset || mcpName.trim()

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          {step === 'mcp' && (
            <button className={`${styles.modalBack} ${styles.modalBackVisible}`} onClick={handleBackFromMcp}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M9 3L4 7l5 4"/>
              </svg>
              Back
            </button>
          )}
          <div className={styles.modalHeaderCenter}>
            <span className={styles.modalTitle}>{step === 'skill' ? 'Add skill' : 'Add MCP'}</span>
          </div>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>

        <div className={styles.modalBody}>
          {step === 'skill' ? (
            <>
              <div className={styles.formField}>
                <label className={styles.modalLabel}>Skill name</label>
                <input className={styles.formInput} type="text" value={skillName} onChange={e => setSkillName(e.target.value)} placeholder="e.g. WISMO" />
              </div>
              <div className={styles.formField}>
                <TextArea label="Trigger — when should this skill activate?" rows={2} value={skillTrigger} onChange={e => setSkillTrigger(e.target.value)} placeholder="e.g. When the shopper asks where is their order" />
              </div>
              {addedTools.length > 0 && (
                <div className={styles.addedToolsList}>
                  {addedTools.map((tool, i) => (
                    <div key={i} className={styles.addedToolItem}>
                      <span className={styles.addedToolBadge}>{tool.type}</span>
                      <span className={styles.addedToolName}>{tool.name}</span>
                      <button className={styles.removeToolBtn} onClick={() => removeTool(i)} aria-label="Remove tool">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                          <path d="M1 1l10 10M11 1L1 11"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {showToolPicker ? (
                <div className={styles.toolPicker}>
                  <div className={styles.toolTypeChips}>
                    {TOOL_TYPES.map(t => (
                      <button key={t} className={styles.toolTypeChip} onClick={() => handleToolTypeClick(t)}>{t}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <button className={styles.btnTertiary} onClick={() => setShowToolPicker(true)}>
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 1v10M1 6h10"/>
                  </svg>
                  Add a tool
                </button>
              )}
            </>
          ) : (
            <>
              <div className={styles.mcpPresetGrid}>
                {['Zendesk', 'Gorgias'].map(p => (
                  <button
                    key={p}
                    className={`${styles.mcpPresetCard} ${selectedPreset === p ? styles.mcpPresetCardSelected : ''}`}
                    onClick={() => selectPreset(p)}
                  >
                    <span className={styles.mcpPresetIcon}>{p[0]}</span>
                    <span className={styles.mcpPresetLabel}>{p}</span>
                  </button>
                ))}
              </div>
              <div className={styles.orSeparator}><span>or</span></div>
              <div className={styles.formField}>
                <label className={styles.modalLabel}>Name</label>
                <input className={styles.formInput} type="text" value={mcpName} onChange={e => { setMcpName(e.target.value); setSelectedPreset(null) }} placeholder="e.g. My MCP server" />
              </div>
              <div className={styles.formField}>
                <label className={styles.modalLabel}>Description <span className={styles.optionalTag}>optional</span></label>
                <input className={styles.formInput} type="text" value={mcpDesc} onChange={e => { setMcpDesc(e.target.value); setSelectedPreset(null) }} placeholder="Describe what this MCP does" />
              </div>
              <div className={styles.formField}>
                <label className={styles.modalLabel}>MCP server URL</label>
                <input className={styles.formInput} type="url" value={mcpUrl} onChange={e => { setMcpUrl(e.target.value); setSelectedPreset(null) }} placeholder="https://" />
              </div>
              <button className={styles.btnAdvanced} disabled>
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 3l4 4 4-4"/>
                </svg>
                Advanced settings
              </button>
            </>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnCancelText} onClick={onClose}>Cancel</button>
          {step === 'skill' ? (
            <button
              className={styles.btnSave}
              onClick={() => onSave({ id: editingSkill?.id, name: skillName, trigger: skillTrigger, tools: addedTools })}
              disabled={!skillName.trim()}
              style={!skillName.trim() ? { opacity: 0.45, cursor: 'not-allowed' } : {}}
            >
              {editingSkill ? 'Update' : 'Add'}
            </button>
          ) : (
            <button className={styles.btnSave} onClick={handleAddMcp} disabled={!canAddMcp} style={!canAddMcp ? { opacity: 0.45, cursor: 'not-allowed' } : {}}>Add</button>
          )}
        </div>
      </div>
    </div>
  )
}
