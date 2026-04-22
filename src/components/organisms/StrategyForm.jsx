import { useState } from 'react'
import styles from './StrategyForm.module.css'

const WIDGETS = [
  { id: 'cs-embedded', name: 'Conversation starters', sub: 'Embedded', desc: 'Inline widget embedded in page content' },
  { id: 'cs-floating', name: 'Conversation starters', sub: 'Floating', desc: 'Floating overlay above page content' },
  { id: 'classic', name: 'Classic', sub: 'Floating', desc: 'Classic notification popup' },
  { id: 'messaging', name: 'Messaging', sub: 'Floating', desc: 'Chat messaging widget' },
  { id: 'badge', name: 'Badge', sub: 'Floating', desc: 'Compact badge with avatar' },
]

const DEVICES = [
  { id: 'both', label: 'Desktop & mobile' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'mobile', label: 'Mobile' },
]

const PAGE_TYPES = ['All pages', 'Home', 'Category', 'Search result', 'Product details', 'Purchase funnel', 'Other pages']

const TABS = [
  { id: 'widget', label: 'Widget and conditions' },
  { id: 'style', label: 'Style' },
  { id: 'content', label: 'Content' },
  { id: 'position', label: 'Position' },
]

export default function StrategyForm({ navigate }) {
  const [activeTab, setActiveTab] = useState('widget')
  const [device, setDevice] = useState('both')
  const [selectedWidget, setSelectedWidget] = useState('cs-embedded')
  const [conditions, setConditions] = useState([
    { field: 'Time on page', op: 'is greater than', value: '6 seconds' },
  ])

  function addCondition() {
    setConditions(prev => [...prev, { field: 'Time on page', op: 'is greater than', value: '' }])
  }

  function removeCondition(i) {
    setConditions(prev => prev.filter((_, idx) => idx !== i))
  }

  return (
    <>
      <div className={styles.tabNav}>
        {TABS.map(t => (
          <button
            key={t.id}
            className={`${styles.tabItem} ${activeTab === t.id ? styles.tabItemActive : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'widget' && (
        <WidgetTab
          device={device}
          setDevice={setDevice}
          selectedWidget={selectedWidget}
          setSelectedWidget={setSelectedWidget}
          conditions={conditions}
          onAddCondition={addCondition}
          onRemoveCondition={removeCondition}
        />
      )}
      {activeTab === 'style' && <StyleTab />}
      {activeTab === 'content' && <ContentTab />}
      {activeTab === 'position' && <PositionTab navigate={navigate} />}
    </>
  )
}

export function StrategyFormPreview({ navigate }) {
  const [previewUrl, setPreviewUrl] = useState('')

  return (
    <div className={styles.previewPanel}>
      <div className={styles.previewHeader}>
        <div className={styles.previewTitleRow}>
          <span className={styles.previewTitle}>Preview</span>
        </div>
        <button
          className={styles.btnTest}
          onClick={() => navigate(`/test-preview?url=${encodeURIComponent(previewUrl)}&returnTo=/engagement/builder`)}
        >
          Test on my website
        </button>
      </div>
      <div className={styles.previewBody}>
        <div className={styles.previewUrlRow}>
          <span className={styles.previewUrlLabel}>Website URL</span>
          <input
            className={styles.previewUrlInput}
            type="text"
            value={previewUrl}
            onChange={e => setPreviewUrl(e.target.value)}
            placeholder="Enter your website URL"
          />
        </div>
        <p className={styles.previewDeviceLabel}>Desktop</p>
        <div className={styles.widgetPreviewCard}>
          <div className={styles.fakeWidget}>
            <div className={styles.fakeWidgetHeader}>
              <div className={styles.fakeWidgetAvatar}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <circle cx="6" cy="6" r="4.5" fill="#3BE1A4"/>
                </svg>
              </div>
              <span className={styles.fakeWidgetQuestion}>Need help with your search?</span>
            </div>
            <div className={styles.fakeChips}>
              <span className={styles.fakeChip}>Does the gamepad work on Windows 11?</span>
              <span className={styles.fakeChip}>Can I use it on console?</span>
              <span className={styles.fakeAskBtn}>Ask my question</span>
            </div>
          </div>
        </div>
        <div className={styles.previewDivider} />
        <p className={styles.previewDeviceLabel}>Mobile</p>
        <div className={styles.widgetPreviewCard}>
          <div className={styles.fakeWidget} style={{ maxWidth: 200 }}>
            <div className={styles.fakeWidgetHeader}>
              <div className={styles.fakeWidgetAvatar}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <circle cx="6" cy="6" r="4.5" fill="#3BE1A4"/>
                </svg>
              </div>
              <span className={styles.fakeWidgetQuestion}>Need help?</span>
            </div>
            <div className={styles.fakeChips}>
              <span className={styles.fakeChip}>Windows 11?</span>
              <span className={styles.fakeAskBtn}>Ask</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WidgetTab({ device, setDevice, selectedWidget, setSelectedWidget, conditions, onAddCondition, onRemoveCondition }) {
  return (
    <div className={styles.formBody}>
      <div className={styles.formSection}>
        <label className={styles.formLabel} htmlFor="strategy-name">Engagement strategy name</label>
        <input className={styles.formInput} type="text" id="strategy-name" defaultValue="All product except B5" />
      </div>

      <div className={styles.formSection}>
        <label className={styles.formLabel}>Page type</label>
        <p className={styles.formHint}>Select the page type for your widget display. We automatically detect and deploy the widget from the selected page types.</p>
        <select className={styles.formSelect} defaultValue="Product details">
          {PAGE_TYPES.map(pt => <option key={pt}>{pt}</option>)}
        </select>
      </div>

      <div className={styles.formSection}>
        <label className={styles.formLabel}>Device</label>
        <p className={styles.formHint}>Select the device where your widget will be displayed</p>
        <div className={styles.deviceChips}>
          {DEVICES.map(d => (
            <button
              key={d.id}
              className={`${styles.deviceChip} ${device === d.id ? styles.deviceChipSelected : ''}`}
              onClick={() => setDevice(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.formSection}>
        <label className={styles.formLabel}>Widget</label>
        <div className={styles.widgetOptions}>
          {WIDGETS.map(w => (
            <button
              key={w.id}
              className={`${styles.widgetOption} ${selectedWidget === w.id ? styles.widgetOptionSelected : ''}`}
              onClick={() => setSelectedWidget(w.id)}
            >
              <div className={styles.widgetOptionName}>{w.name}</div>
              {w.sub && <div className={styles.widgetOptionSub}>{w.sub}</div>}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.conditionsSection}>
        <p className={styles.conditionsTitle}>Conditions</p>
        <p className={styles.conditionsDesc}>You can add conditions to personalize the display of your widget.</p>
        <p className={styles.conditionsLabel}>My widget will display if</p>
        {conditions.map((c, i) => (
          <div key={i} className={styles.conditionRow}>
            <select className={styles.condSel} defaultValue={c.field}>
              <option>Time on page</option>
              <option>Visitor is VIP</option>
              <option>URL contains</option>
              <option>Device is</option>
            </select>
            <select className={styles.condOpSel} defaultValue={c.op}>
              <option>is greater than</option>
              <option>is less than</option>
              <option>contains</option>
              <option>equals</option>
            </select>
            <input className={styles.condInput} defaultValue={c.value} placeholder="value" />
            <button className={styles.condRemoveBtn} onClick={() => onRemoveCondition(i)} title="Remove">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ))}
        <button className={styles.addConditionLink} onClick={onAddCondition}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <path d="M6 1v10M1 6h10"/>
          </svg>
          Add condition
        </button>
      </div>
    </div>
  )
}

function StyleTab() {
  return (
    <div className={styles.formBody}>
      <div className={styles.formSection}>
        <p className={styles.styleSectionTitle}>Colors for header</p>
        <div className={styles.colorRow}>
          <div className={styles.colorSwatchWrap}>
            <div className={styles.colorSwatch} style={{ background: '#0A0A09' }} />
            <span className={styles.colorSwatchLabel}>Icon</span>
          </div>
          <div className={styles.colorSwatchWrap}>
            <div className={styles.colorSwatch} style={{ background: '#0A0A09' }} />
            <span className={styles.colorSwatchLabel}>Content</span>
          </div>
        </div>
      </div>
      <div className={styles.formSection}>
        <p className={styles.styleSectionTitle}>Colors for starters</p>
        <div className={styles.colorRow}>
          <div className={styles.colorSwatchWrap}>
            <div className={styles.colorSwatch} style={{ background: '#0B3B37' }} />
            <span className={styles.colorSwatchLabel}>Starter content</span>
          </div>
          <div className={styles.colorSwatchWrap}>
            <div className={styles.colorSwatch} style={{ background: '#0B3B37' }} />
            <span className={styles.colorSwatchLabel}>Starter background</span>
          </div>
          <div className={styles.colorSwatchWrap}>
            <div className={styles.colorSwatch} style={{ background: '#0B3B37' }} />
            <span className={styles.colorSwatchLabel}>Starter border</span>
          </div>
        </div>
      </div>
      <div className={styles.formSection}>
        <p className={styles.styleSectionTitle}>Font</p>
        <div className={styles.fontOptions}>
          <label className={styles.radioOption}><input type="radio" name="font-src" defaultChecked /><span className={styles.radioLabel}>Use Google font</span></label>
          <label className={styles.radioOption}><input type="radio" name="font-src" /><span className={styles.radioLabel}>Use my website font</span></label>
        </div>
        <select className={styles.formSelect} style={{ maxWidth: 240 }}>
          <option>Open Sans</option><option>Inter</option><option>Roboto</option>
        </select>
      </div>
    </div>
  )
}

function ContentTab() {
  return (
    <div className={styles.formBody}>
      <div className={styles.formSection}>
        <label className={styles.formLabel}>Product Knowledge Base</label>
        <select className={styles.formSelect}>
          <option>My product catalog</option>
          <option>Electronics catalog</option>
        </select>
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel}>
          Header
          <span style={{ float: 'right', fontWeight: 400, color: 'var(--color-content-secondary)', fontSize: 'var(--text-xs)' }}>35/60</span>
        </label>
        <input className={styles.formInput} type="text" defaultValue="Need help with your search?" maxLength={60} />
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel}>Number of conversation starters for desktop</label>
        <div className={styles.countStepper}>
          {[2, 3, 4, 5].map(n => (
            <button key={n} className={`${styles.countStep} ${n === 4 ? styles.countStepSelected : ''}`}>{n}</button>
          ))}
        </div>
        <div className={styles.startersList}>
          {[
            'Does the gamepad work on Windows 11?',
            'Can I use the gamepad on console?',
            'Can I use the gamepad on mobile devices?',
            'How quickly can it be delivered?',
          ].map((s, i) => (
            <div key={i} className={styles.starterRow}>
              <button className={styles.starterTypeBtn}><span className={styles.aiSpark}>✦</span> Question</button>
              <input className={styles.starterInput} defaultValue={s} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel}>Label for button</label>
        <input className={styles.formInput} type="text" defaultValue="Ask my question" maxLength={36} />
      </div>
    </div>
  )
}

function PositionTab({ navigate }) {
  return (
    <div className={styles.formBody}>
      <div className={styles.formSection}>
        <p className={styles.formLabel} style={{ fontSize: 'var(--text-md)' }}>Position</p>
        <p className={styles.formHint}>How would you like to choose your widget's position?</p>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Add HTML Element</label>
          <div className={styles.posHtmlRow}>
            <input className={styles.posHtmlInput} type="text" defaultValue="#product-information-block-5 template--2268" />
            <span className={styles.posOr}>OR</span>
            <button className={styles.btnPick} onClick={() => navigate('/test-preview?returnTo=/engagement/builder')}>
              Pick an element on my website
            </button>
          </div>
        </div>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Position relative to selected reference</label>
          <div className={styles.posReferenceOptions}>
            <label className={styles.radioOption}><input type="radio" name="pos-ref" /><span className={styles.radioLabel}>Before</span></label>
            <label className={styles.radioOption}><input type="radio" name="pos-ref" defaultChecked /><span className={styles.radioLabel}>Inside</span></label>
            <label className={styles.radioOption}><input type="radio" name="pos-ref" /><span className={styles.radioLabel}>After</span></label>
          </div>
        </div>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Margin</label>
          <div className={styles.marginGrid}>
            {[['Top margin', 16], ['Bottom margin', 16], ['Left margin', 16], ['Right margin', 16]].map(([label, val]) => (
              <div key={label} className={styles.marginField}>
                <span className={styles.marginFieldLabel}>{label}</span>
                <div className={styles.marginInputRow}>
                  <input type="number" className={styles.marginInput} defaultValue={val} />
                  <span className={styles.marginPx}>px</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
