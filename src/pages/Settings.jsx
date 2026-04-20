import { useState } from 'react'
import styles from './Settings.module.css'
import TextArea from '../components/ui/TextArea'

const INITIAL_PAGE_TYPES = [
  { id: 'product',  label: 'Product',   detection: 'auto',   pages: '1,240', rules: [], expanded: false },
  { id: 'category', label: 'Category',  detection: 'custom', pages: '450',   rules: [{ type: 'URL', op: 'contains', value: '/category/' }, { type: 'URL', op: 'matches regex', value: '^/c/[0-9]+$' }], expanded: true },
  { id: 'home',     label: 'Home',      detection: 'auto',   pages: '1',     rules: [], expanded: false },
  { id: 'cart',     label: 'Cart',      detection: 'auto',   pages: '89',    rules: [], expanded: false },
  { id: 'checkout', label: 'Checkout',  detection: 'auto',   pages: '52',    rules: [], expanded: false },
  { id: 'search',   label: 'Search',    detection: 'custom', pages: '178',   rules: [{ type: 'URL', op: 'starts with', value: '/search' }], expanded: false },
  { id: 'other',    label: 'Other',     detection: 'auto',   pages: '3,210', rules: [], expanded: false, note: 'Catch-all for unclassified pages' },
]

const USERS = [
  { initials: 'LP', color: '#0f766e', name: 'Lisa Petit',       email: 'lisa.petit@nespresso.com',       role: 'Admin', lastLogin: 'Apr 14, 2026', created: 'Jan 12, 2025' },
  { initials: 'TM', color: '#6366f1', name: 'Thomas Martin',    email: 'thomas.martin@nespresso.com',    role: 'Agent', lastLogin: 'Apr 10, 2026', created: 'Mar 5, 2025' },
  { initials: 'SB', color: '#f59e0b', name: 'Sophie Bernard',   email: 'sophie.bernard@nespresso.com',   role: 'Admin', lastLogin: 'Apr 13, 2026', created: 'Feb 18, 2025' },
  { initials: 'JD', color: '#10b981', name: 'Julie Dupont',     email: 'julie.dupont@nespresso.com',     role: 'Agent', lastLogin: 'Apr 8, 2026',  created: 'Jun 3, 2025' },
  { initials: 'MR', color: '#ef4444', name: 'Marc Rousseau',    email: 'marc.rousseau@nespresso.com',    role: 'Agent', lastLogin: 'Mar 29, 2026', created: 'Sep 20, 2025' },
]

const CMPS = [
  { value: 'didomi',   label: 'Didomi',    desc: 'Connect via Didomi SDK' },
  { value: 'onetrust', label: 'OneTrust',  desc: 'Connect via OneTrust integration' },
  { value: 'axeptio',  label: 'Axeptio',   desc: 'Connect via Axeptio widget' },
  { value: 'none',     label: 'None',      desc: 'No CMP — always show the chat widget' },
]

export default function Settings({ section = 'pagetypes' }) {
  return (
    <div>
      {section === 'pagetypes'   && <PageTypes />}
      {section === 'users'       && <Users />}
      {section === 'integration' && <Integration />}
      {section === 'consent'     && <Consent />}
    </div>
  )
}


/* ── Page Types ── */
function PageTypes() {
  const [pageTypes, setPageTypes] = useState(INITIAL_PAGE_TYPES)
  const [troubleshootOpen, setTroubleshootOpen] = useState(false)
  const [addRuleModal, setAddRuleModal] = useState(null)

  function toggleExpand(id) {
    setPageTypes(prev => prev.map(pt => pt.id === id ? { ...pt, expanded: !pt.expanded } : pt))
  }

  function updateRule(ptId, rIdx, field, val) {
    setPageTypes(prev => prev.map(pt =>
      pt.id === ptId ? { ...pt, rules: pt.rules.map((r, i) => i === rIdx ? { ...r, [field]: val } : r) } : pt
    ))
  }

  function addRule(ptId) {
    setPageTypes(prev => prev.map(pt =>
      pt.id === ptId ? { ...pt, rules: [...pt.rules, { type: 'URL', op: 'contains', value: '' }] } : pt
    ))
  }

  function deleteRule(ptId, rIdx) {
    setPageTypes(prev => prev.map(pt =>
      pt.id === ptId ? { ...pt, rules: pt.rules.filter((_, i) => i !== rIdx) } : pt
    ))
  }

  return (
    <>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Page types configuration</h2>
          <p className={styles.sectionSub}>Configure manual detection rules for page types. Custom rules always override automatic detection.</p>
        </div>
        <button className={styles.btnSecondary} onClick={() => setTroubleshootOpen(true)}>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="6" cy="6" r="4.5"/><path d="M6 4v2.5L7.5 8M10 10l2 2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Troubleshoot a URL
        </button>
      </div>

      <div className={styles.infoBanner}>
        <span className={styles.infoIcon}>ℹ️</span>
        <span className={styles.infoText}>
          <strong>Detection priority order:</strong> Custom Data rules → Configured URL rules → Automatic detection (fallback).
        </span>
      </div>

      <div className={styles.ptCard}>
        <div className={styles.ptCardHead}>
          <span className={styles.ptCardTitle}>Page types</span>
          <span className={styles.countBadge}>{pageTypes.length}</span>
        </div>
        <table className={styles.ptTable}>
          <thead>
            <tr>
              <th className={styles.ptTh} style={{ width: 180 }}>Page type</th>
              <th className={styles.ptTh}>Detection</th>
              <th className={styles.ptTh}>Pages detected</th>
              <th className={styles.ptTh}>Custom rules</th>
              <th className={styles.ptTh}></th>
            </tr>
          </thead>
          <tbody>
            {pageTypes.map(pt => (
              <>
                <tr key={pt.id} className={`${styles.ptRow} ${pt.expanded ? styles.ptRowExpanded : ''}`}>
                  <td className={`${styles.ptTd} ${styles.ptTdName}`}>
                    {pt.label}
                    {pt.note && <span className={styles.ptNote}>{pt.note}</span>}
                  </td>
                  <td className={styles.ptTd}>
                    {pt.detection === 'auto'
                      ? <span className={styles.badgeAuto}><span className={styles.dot}/>Auto-detected</span>
                      : <span className={styles.badgeCustom}><span className={styles.dot}/>Custom rules</span>}
                  </td>
                  <td className={styles.ptTd}>
                    <span className={styles.pagesCount}><strong>{pt.pages}</strong> {pt.pages === '1' ? 'page' : 'pages'}</span>
                  </td>
                  <td className={styles.ptTd}>
                    {pt.rules.length === 0
                      ? <span className={styles.tdSec}>—</span>
                      : <span className={styles.rulesChip}>{pt.rules.length} {pt.rules.length === 1 ? 'rule' : 'rules'}</span>}
                  </td>
                  <td className={styles.ptTd}>
                    <div className={styles.tdActions}>
                      {pt.expanded ? (
                        <>
                          <button className={styles.actionSecondary} onClick={() => toggleExpand(pt.id)}>Cancel</button>
                          <button className={styles.actionPrimary} onClick={() => toggleExpand(pt.id)}>
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Save rules
                          </button>
                        </>
                      ) : pt.rules.length > 0 ? (
                        <button className={styles.actionSecondary} onClick={() => toggleExpand(pt.id)}>
                          Edit rules
                          <svg width="9" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                        </button>
                      ) : (
                        <button className={styles.actionPrimary} onClick={() => setAddRuleModal(pt.label)}>
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                          Add custom rule
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {pt.expanded && (
                  <tr key={`${pt.id}-detail`} className={styles.detailRow}>
                    <td colSpan={5} className={styles.detailCell}>
                      <div className={styles.rulesEditor}>
                        <div className={styles.rulesEditorTitle}>Conditions — any of the following matches (OR logic)</div>
                        {pt.rules.map((rule, rIdx) => (
                          <div key={rIdx}>
                            {rIdx > 0 && <div className={styles.orDivider}>OR</div>}
                            <div className={styles.condRow}>
                              <select className={styles.condSel} value={rule.type} onChange={e => updateRule(pt.id, rIdx, 'type', e.target.value)}>
                                <option>URL</option><option>Custom Data</option>
                              </select>
                              <select className={styles.condOpSel} value={rule.op} onChange={e => updateRule(pt.id, rIdx, 'op', e.target.value)}>
                                <option>contains</option>
                                <option>starts with</option>
                                <option>ends with</option>
                                <option>matches regex</option>
                                <option>equals</option>
                              </select>
                              <input className={styles.condInput} value={rule.value} onChange={e => updateRule(pt.id, rIdx, 'value', e.target.value)} />
                              <button className={styles.condDeleteBtn} onClick={() => deleteRule(pt.id, rIdx)} title="Remove condition">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                              </button>
                            </div>
                          </div>
                        ))}
                        <button className={styles.btnAddCond} onClick={() => addRule(pt.id)}>
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                          Add OR condition
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {troubleshootOpen && <TroubleshootModal onClose={() => setTroubleshootOpen(false)} />}
      {addRuleModal && <AddRuleModal pageType={addRuleModal} onClose={() => setAddRuleModal(null)} />}
    </>
  )
}

function TroubleshootModal({ onClose }) {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)

  function runTest() {
    if (!url.trim()) return
    const u = url.toLowerCase()
    const path = u.replace(/^https?:\/\/[^/]+/, '')
    let pageType, chain

    const customDataStep = { step: 'Custom Data rules', matched: false, detail: 'No custom data rules configured' }
    if (u.includes('/category/') || /\/c\/[0-9]+/.test(u)) {
      pageType = 'Category'
      chain = [customDataStep, { step: 'URL rules', matched: true, detail: 'Matched: URL contains "/category/"' }]
    } else if (path.startsWith('/search')) {
      pageType = 'Search'
      chain = [customDataStep, { step: 'URL rules', matched: true, detail: 'Matched: URL starts with "/search"' }]
    } else if (u.includes('/product/') || u.includes('/p/')) {
      pageType = 'Product'
      chain = [customDataStep, { step: 'URL rules', matched: false, detail: 'No matching URL patterns' }, { step: 'Auto-detection', matched: true, detail: 'Classified as Product by automatic detection' }]
    } else if (path === '/' || u.endsWith('.com') || u.endsWith('.com/')) {
      pageType = 'Home'
      chain = [customDataStep, { step: 'URL rules', matched: false, detail: 'No matching URL patterns' }, { step: 'Auto-detection', matched: true, detail: 'Classified as Home by automatic detection' }]
    } else {
      pageType = 'Other'
      chain = [customDataStep, { step: 'URL rules', matched: false, detail: 'No matching URL patterns' }, { step: 'Auto-detection', matched: true, detail: 'Fallback to Other' }]
    }
    setResult({ url: url.trim(), pageType, chain })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Troubleshoot a URL</h2>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.modalBody}>
          <p className={styles.modalDesc}>Test how a URL would be classified with the current detection rules.</p>
          <div className={styles.tsUrlRow}>
            <input
              className={styles.tsUrlInput}
              placeholder="https://your-website.com/category/shoes"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && runTest()}
            />
            <button className={styles.btnTestUrl} onClick={runTest}>Test URL</button>
          </div>
          {result && (
            <div className={styles.tsResult}>
              <div className={styles.tsTestedUrl}>Testing: <strong>{result.url}</strong></div>
              <div className={styles.tsDetectedAs}>
                <span className={styles.tsDetectedLabel}>Detected as</span>
                <span className={styles.tsPageTypeChip}>{result.pageType}</span>
              </div>
              <div className={styles.tsChainTitle}>Detection chain</div>
              <div className={styles.tsChain}>
                {result.chain.map((step, i) => (
                  <div key={i} className={`${styles.tsChainItem} ${step.matched ? styles.tsMatched : styles.tsSkipped}`}>
                    <div className={styles.tsChainIcon}>{step.matched ? '✓' : '–'}</div>
                    <div>
                      <div className={styles.tsChainStep}>{step.step}</div>
                      <div className={styles.tsChainDetail}>{step.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.btnCancel} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

function AddRuleModal({ pageType, onClose }) {
  const [ruleType, setRuleType] = useState('url')
  const [conditions, setConditions] = useState([{ op: 'contains', value: '' }])

  function addCondition() {
    setConditions(prev => [...prev, { op: 'contains', value: '' }])
  }

  function deleteCondition(i) {
    setConditions(prev => prev.filter((_, idx) => idx !== i))
  }

  function updateCondition(i, field, val) {
    setConditions(prev => prev.map((c, idx) => idx === i ? { ...c, [field]: val } : c))
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add custom rule</h2>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalField}>
            <div className={styles.modalFieldLabel}>For page type</div>
            <span className={styles.pageTypeChip}>{pageType}</span>
          </div>
          <div className={styles.modalField}>
            <div className={styles.modalFieldLabel}>Rule type</div>
            <div className={styles.ruleTypeToggle}>
              <button className={`${styles.ruleTypeBtn} ${ruleType === 'url' ? styles.ruleTypeBtnActive : ''}`} onClick={() => setRuleType('url')}>URL</button>
              <button className={`${styles.ruleTypeBtn} ${ruleType === 'custom' ? styles.ruleTypeBtnActive : ''}`} onClick={() => setRuleType('custom')}>Custom Data</button>
            </div>
          </div>
          <div className={styles.modalField}>
            <div className={styles.modalFieldLabel}>Conditions <span className={styles.modalFieldNote}>— any of the following matches (OR logic)</span></div>
            {conditions.map((c, i) => (
              <div key={i}>
                {i > 0 && <div className={styles.orDividerModal}>OR</div>}
                <div className={styles.condRow}>
                  <select className={styles.condOpSel} value={c.op} onChange={e => updateCondition(i, 'op', e.target.value)}>
                    <option>contains</option>
                    <option>starts with</option>
                    <option>ends with</option>
                    <option>matches regex</option>
                    <option>equals</option>
                  </select>
                  <input className={styles.condInput} value={c.value} onChange={e => updateCondition(i, 'value', e.target.value)} placeholder="/your-pattern..." />
                  <button className={styles.condDeleteBtn} onClick={() => deleteCondition(i)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
            ))}
            <button className={styles.btnAddCond} onClick={addCondition}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Add OR condition
            </button>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.btnCancel} onClick={onClose}>Cancel</button>
          <button className={styles.btnSave} onClick={onClose}>Save rule</button>
        </div>
      </div>
    </div>
  )
}


/* ── Users ── */
function Users() {
  return (
    <>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Users</h2>
        <button className={styles.btnPrimary}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Invite user
        </button>
      </div>
      <div className={styles.ptCard} style={{ padding: 0 }}>
        <table className={styles.ptTable}>
          <thead>
            <tr>
              <th className={styles.ptTh}>Name</th>
              <th className={styles.ptTh}>Role</th>
              <th className={styles.ptTh}>Last login</th>
              <th className={styles.ptTh}>Created</th>
              <th className={styles.ptTh} style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {USERS.map(u => (
              <tr key={u.email} className={styles.ptRow}>
                <td className={styles.ptTd}>
                  <div className={styles.userCell}>
                    <div className={styles.avatar} style={{ background: u.color }}>{u.initials}</div>
                    <div>
                      <div className={styles.userName}>{u.name}</div>
                      <div className={styles.userEmail}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className={styles.ptTd}>
                  <span className={`${styles.roleBadge} ${u.role === 'Admin' ? styles.roleAdmin : styles.roleAgent}`}>{u.role}</span>
                </td>
                <td className={`${styles.ptTd} ${styles.tdSec}`}>{u.lastLogin}</td>
                <td className={`${styles.ptTd} ${styles.tdSec}`}>{u.created}</td>
                <td className={styles.ptTd}>
                  <div className={styles.tdActions}>
                    <button className={styles.iconBtnSm} title="Edit">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 16 16"><path d="M11.5 2.5a1.414 1.414 0 0 1 2 2L5 13H3v-2L11.5 2.5z"/></svg>
                    </button>
                    <button className={`${styles.iconBtnSm} ${styles.iconBtnDanger}`} title="Delete">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 16 16"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><path d="M3 4l1 10h8l1-10"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}


/* ── Integration ── */
function Integration() {
  return (
    <>
      <h2 className={styles.sectionTitle} style={{ marginBottom: 'var(--sp-5)' }}>Integration</h2>
      <div className={styles.intGrid}>
        <div className={styles.intCard}>
          <div className={styles.intCardTitle}>Install your tags</div>
          <p className={styles.intCardDesc}>Add the iAdvize tag to your website to enable visitor tracking and chat capabilities. Follow the setup guide to integrate the main tag and any optional tags for advanced features.</p>
          <button className={styles.btnSetup}>Go to setup guide</button>
        </div>
        <div className={styles.intCard}>
          <div className={styles.intCardTitle}>Test the main tag</div>
          <p className={styles.intCardDesc}>Verify that your main tag is correctly installed and sending data. Run a live check to confirm the tag is firing on your website.</p>
          <div className={styles.tagTestSuccess}>
            <svg width="15" height="15" fill="none" viewBox="0 0 16 16" style={{ flexShrink: 0 }}><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            The main tag is successfully detected
          </div>
          <button className={styles.btnCheckAgain}>Check again</button>
        </div>
      </div>
    </>
  )
}


/* ── Consent ── */
function Consent() {
  const [selectedCmp, setSelectedCmp] = useState('didomi')

  return (
    <>
      <h2 className={styles.sectionTitle} style={{ marginBottom: 'var(--sp-5)' }}>Consent</h2>
      <div className={styles.intCard}>
        <div className={styles.intCardTitle} style={{ marginBottom: 4 }}>Consent Management Platform</div>
        <p className={styles.intCardDesc} style={{ marginBottom: 'var(--sp-4)' }}>Select the CMP integrated on your website. iAdvize will use it to request and respect visitor consent.</p>
        <div className={styles.cmpList}>
          {CMPS.map(cmp => (
            <label key={cmp.value} className={`${styles.cmpOption} ${selectedCmp === cmp.value ? styles.cmpSelected : ''}`}>
              <input type="radio" name="cmp" value={cmp.value} checked={selectedCmp === cmp.value} onChange={() => setSelectedCmp(cmp.value)} style={{ display: 'none' }} />
              <div className={`${styles.cmpRadio} ${selectedCmp === cmp.value ? styles.cmpRadioChecked : ''}`} />
              <div>
                <div className={styles.cmpName}>{cmp.label}</div>
                <div className={styles.cmpDesc}>{cmp.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {selectedCmp !== 'none' && (
        <div className={styles.intCard}>
          <div className={styles.intCardTitle} style={{ marginBottom: 'var(--sp-5)' }}>
            {CMPS.find(c => c.value === selectedCmp)?.label} configuration
          </div>
          <div className={styles.cmpFormGrid}>
            <div className={styles.cmpFormRow}>
              <label className={styles.cmpFormLabel}>Vendor ID</label>
              <input className={styles.cmpFormInput} defaultValue="iadvize" placeholder="e.g. iadvize" />
            </div>
            <div className={styles.cmpFormRow}>
              <label className={styles.cmpFormLabel}>Device Vendor ID</label>
              <input className={styles.cmpFormInput} defaultValue="c:iadvize" placeholder="e.g. c:iadvize" />
            </div>
            <div className={`${styles.cmpFormRow} ${styles.cmpFormFull}`}>
              <TextArea label="Consent message" rows={3} defaultValue="By continuing, you agree to the use of cookies to power the live chat assistant and improve your experience." />
            </div>
            <div className={styles.cmpFormRow}>
              <label className={styles.cmpFormLabel}>Privacy policy URL</label>
              <input className={styles.cmpFormInput} defaultValue="https://www.nespresso.com/fr/fr/legal/privacy-policy" />
            </div>
            <div className={styles.cmpFormRow}>
              <label className={styles.cmpFormLabel}>Legal notice</label>
              <input className={styles.cmpFormInput} defaultValue="iAdvize SAS — 2 rue de la Loire, 44000 Nantes" />
            </div>
          </div>
        </div>
      )}

      <div className={styles.consentFooter}>
        <button className={styles.btnCancel}>Cancel</button>
        <button className={styles.btnSave}>Save changes</button>
      </div>
    </>
  )
}
