import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import styles from './EngagementBuilder.module.css'
import {
  DEVICES,
  PAGE_TYPES,
  WIDGETS,
  PAIR_RULES,
  getAvailableWidgets,
  splitRecommended,
  isPairCard,
} from './engagement/widgetCatalog'
import { ILLUSTRATIONS } from './engagement/WidgetIllustrations'

export default function EngagementBuilder() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('widget')
  const [pageType, setPageType] = useState('product')
  const [device, setDevice] = useState('both')
  const [selectedWidget, setSelectedWidget] = useState('starters-embedded')
  const [showOthers, setShowOthers] = useState(false)
  const [strategyName] = useState('All product except B5')
  const [status] = useState('Offline')
  const [conditions, setConditions] = useState([
    { field: 'Time on page', op: 'is greater than', value: '6 seconds' },
  ])

  // Auto-switch selected widget if it becomes unavailable for the current page/device.
  useEffect(() => {
    const available = getAvailableWidgets(pageType, device)
    const ids = available.map(w => w.id)
    if (!ids.includes(selectedWidget)) {
      const firstReco = available.find(w => w.recommended)
      setSelectedWidget((firstReco ?? available[0])?.id ?? selectedWidget)
    }
  }, [pageType, device, selectedWidget])

  function addCondition() {
    setConditions(prev => [...prev, { field: 'Time on page', op: 'is greater than', value: '' }])
  }
  function removeCondition(i) {
    setConditions(prev => prev.filter((_, idx) => idx !== i))
  }

  const TABS = [
    { id: 'widget', label: 'Widget and conditions' },
    { id: 'style', label: 'Style' },
    { id: 'content', label: 'Content' },
    { id: 'position', label: 'Position' },
  ]

  return (
    <div>
      <button className={styles.backLink} onClick={() => navigate('/engagement')}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M10 3L5 8l5 5"/>
        </svg>
        Back to engagement strategies listing
      </button>
      <div className={styles.builderTitleRow}>
        <h1 className={styles.builderTitle}>{strategyName}</h1>
        <Badge variant="neutral" label={status} />
      </div>

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

      <div className={styles.builderLayout}>
        <div className={styles.formPanel}>
          {activeTab === 'widget' && (
            <WidgetTab
              pageType={pageType}
              setPageType={setPageType}
              device={device}
              setDevice={setDevice}
              selectedWidget={selectedWidget}
              setSelectedWidget={setSelectedWidget}
              showOthers={showOthers}
              setShowOthers={setShowOthers}
              conditions={conditions}
              onAddCondition={addCondition}
              onRemoveCondition={removeCondition}
            />
          )}
          {activeTab === 'style' && <StyleTab />}
          {activeTab === 'content' && <ContentTab />}
          {activeTab === 'position' && <PositionTab navigate={navigate} />}
        </div>

        <PreviewPanel navigate={navigate} device={device} selectedWidget={selectedWidget} />
      </div>

      <div className={styles.formFooter}>
        <button className={styles.btnCancel} onClick={() => navigate('/engagement')}>Cancel</button>
        <button className={styles.btnSave}>Save</button>
        <button className={styles.btnPublish}>Publish</button>
      </div>
    </div>
  )
}

/* ── Widget tab ─────────────────────────────────────────────────────── */

function WidgetTab({
  pageType, setPageType,
  device, setDevice,
  selectedWidget, setSelectedWidget,
  showOthers, setShowOthers,
  conditions, onAddCondition, onRemoveCondition,
}) {
  const available = getAvailableWidgets(pageType, device)
  const { recommended, others } = splitRecommended(available)
  const hasOthers = others.length > 0

  return (
    <div className={styles.formBody}>
      <div className={styles.formSection}>
        <label className={styles.formLabel} htmlFor="strategy-name">Engagement strategy name</label>
        <input className={styles.formInput} type="text" id="strategy-name" defaultValue="All product except B5" />
      </div>

      <div className={styles.formSection}>
        <label className={styles.formLabel}>Page type</label>
        <p className={styles.formHint}>Select the page type for your widget display. We automatically detect and deploy the widget from the selected page types.</p>
        <select
          className={styles.formSelect}
          value={pageType}
          onChange={e => setPageType(e.target.value)}
        >
          {PAGE_TYPES.map(pt => <option key={pt.id} value={pt.id}>{pt.label}</option>)}
        </select>
      </div>

      <div className={styles.formSection}>
        <label className={styles.formLabel}>Device</label>
        <p className={styles.formHint}>Select the device where your widget will be displayed</p>
        <div className={styles.deviceTiles}>
          {DEVICES.map(d => (
            <button
              key={d.id}
              className={`${styles.deviceTile} ${device === d.id ? styles.deviceTileSelected : ''}`}
              onClick={() => setDevice(d.id)}
              type="button"
            >
              <DeviceIcon id={d.id} />
              <span className={styles.deviceTileLabel}>{d.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.formSection}>
        <label className={styles.formLabel}>Widget</label>
        <div className={styles.widgetList}>
          {recommended.map(entry => (
            <WidgetCard
              key={entry.id}
              entry={entry}
              device={device}
              selected={selectedWidget === entry.id}
              onSelect={() => setSelectedWidget(entry.id)}
            />
          ))}

          {hasOthers && (
            <button
              type="button"
              className={styles.seeOtherLink}
              onClick={() => setShowOthers(v => !v)}
            >
              See other widgets
              <svg
                className={showOthers ? styles.seeOtherChevronOpen : ''}
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M2 4l3 3 3-3"/>
              </svg>
            </button>
          )}

          {hasOthers && showOthers && others.map(entry => (
            <WidgetCard
              key={entry.id}
              entry={entry}
              device={device}
              selected={selectedWidget === entry.id}
              onSelect={() => setSelectedWidget(entry.id)}
            />
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

/* ── Widget card (solo + pair) ──────────────────────────────────────── */

function WidgetCard({ entry, device, selected, onSelect }) {
  const widget = WIDGETS[entry.id]
  const pair = isPairCard(entry.id, device) ? PAIR_RULES[entry.id] : null

  const cls = [
    styles.widgetCard,
    selected ? styles.widgetCardSelected : '',
    pair ? styles.widgetCardPair : '',
    !widget.hasIllustration ? styles.widgetCardNoIllus : '',
  ].filter(Boolean).join(' ')

  return (
    <button type="button" className={cls} onClick={onSelect}>
      {pair ? (
        <>
          <CardHalf
            widgetId={pair.desktop}
            label={`Desktop: ${WIDGETS[pair.desktop].name}`}
            active={selected}
            showRadio
            selected={selected}
            recommended={entry.recommended}
          />
          <span className={styles.pairDivider} aria-hidden="true" />
          <CardHalf
            widgetId={pair.mobile}
            label={`Mobile: ${WIDGETS[pair.mobile].name}`}
            active={selected}
          />
        </>
      ) : (
        <CardBody
          widget={widget}
          active={selected}
          selected={selected}
          recommended={entry.recommended}
        />
      )}
    </button>
  )
}

function CardBody({ widget, active, selected, recommended }) {
  const Illus = widget.hasIllustration ? ILLUSTRATIONS[widget.id] : null
  return (
    <>
      <span className={styles.widgetCardMain}>
        <Radio on={selected} />
        <span className={styles.widgetCardTexts}>
          <span className={styles.widgetCardTitleRow}>
            <span className={styles.widgetCardName}>{widget.name}</span>
            {widget.variant && (
              <>
                <span className={styles.widgetCardDash}>—</span>
                <span className={styles.widgetCardVariant}>{widget.variant}</span>
              </>
            )}
            <HelpIcon />
          </span>
          {recommended && <span className={styles.recommendedTag}>Recommended</span>}
        </span>
      </span>
      {Illus && (
        <span className={styles.illustrationTile}>
          <Illus active={active} />
        </span>
      )}
    </>
  )
}

function CardHalf({ widgetId, label, active, showRadio, selected, recommended }) {
  const widget = WIDGETS[widgetId]
  const Illus = ILLUSTRATIONS[widgetId]
  return (
    <span className={styles.pairHalf}>
      <span className={styles.widgetCardMain}>
        {showRadio && <Radio on={selected} />}
        <span className={styles.widgetCardTexts}>
          <span className={styles.widgetCardTitleRow}>
            <span className={styles.widgetCardName}>{label}</span>
            <HelpIcon />
          </span>
          <span className={styles.widgetCardVariant}>{widget.variant}</span>
          {recommended && <span className={styles.recommendedTag}>Recommended</span>}
        </span>
      </span>
      <span className={styles.illustrationTile}>
        <Illus active={active} />
      </span>
    </span>
  )
}

function Radio({ on }) {
  return (
    <span className={`${styles.radio} ${on ? styles.radioOn : ''}`} aria-hidden="true">
      {on && <span className={styles.radioDot} />}
    </span>
  )
}

function HelpIcon() {
  return (
    <svg className={styles.helpIcon} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="5" fill="var(--color-content-icon)" />
      <path d="M4.5 4.5a1.5 1.5 0 013 0c0 .6-.4 1-.9 1.2s-.6.4-.6.8M6 8.3v.2" stroke="white" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

function DeviceIcon({ id }) {
  if (id === 'both') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="9" height="7" rx="1"/>
      <rect x="10" y="6" width="5" height="8" rx="1"/>
    </svg>
  )
  if (id === 'desktop') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1.5" y="2.5" width="13" height="9" rx="1"/>
      <path d="M5 14h6M8 11.5v2.5"/>
    </svg>
  )
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="8" height="12" rx="1.25"/>
      <path d="M7 12.5h2"/>
    </svg>
  )
}

/* ── Style / Content / Position tabs (unchanged) ───────────────────── */

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

/* ── Preview panel ─────────────────────────────────────────────────── */

function PreviewPanel({ navigate, device, selectedWidget }) {
  const [previewUrl, setPreviewUrl] = useState('')

  const showDesktop = device === 'both' || device === 'desktop'
  const showMobile  = device === 'both' || device === 'mobile'

  // For Desktop+mobile with a pair widget, mobile preview uses the paired widget id.
  const mobileWidget = isPairCard(selectedWidget, device)
    ? PAIR_RULES[selectedWidget].mobile
    : selectedWidget

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

        {showDesktop && (
          <>
            <p className={styles.previewDeviceLabel}>Desktop</p>
            <div className={styles.widgetPreviewCard}>
              <WidgetPreview widgetId={selectedWidget} />
            </div>
          </>
        )}

        {showDesktop && showMobile && <div className={styles.previewDivider} />}

        {showMobile && (
          <>
            <p className={styles.previewDeviceLabel}>Mobile</p>
            <div className={styles.widgetPreviewCard}>
              <WidgetPreview widgetId={mobileWidget} compact />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ── Widget previews — one component per widget type ───────────────── */

function WidgetPreview({ widgetId, compact }) {
  switch (widgetId) {
    case 'starters-embedded': return <PvEmbedded compact={compact} />
    case 'starters-floating': return <PvFloating compact={compact} />
    case 'classic':           return <PvClassic />
    case 'messaging':         return <PvMessaging />
    case 'badge':             return <PvBadge />
    case 'smart-banner':      return <PvSmartBanner compact={compact} />
    case 'custom':            return <PvCustom />
    default: return null
  }
}

function Sparkle({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1l1.4 4.6L14 7l-4.6 1.4L8 13l-1.4-4.6L2 7l4.6-1.4L8 1z" fill="currentColor"/>
    </svg>
  )
}

function PvEmbedded({ compact }) {
  return (
    <div className={`${styles.pvEmbedded} ${compact ? styles.pvMobile : ''}`}>
      <div className={styles.pvEmbeddedHeader}>
        <span className={styles.pvAiBadge}>✦</span>
        <span className={styles.pvEmbeddedTitle}>A question about this product?</span>
      </div>
      <div className={styles.pvEmbeddedChips}>
        <span className={styles.pvChip}>Is it suitable for sports?</span>
        <span className={styles.pvChip}>Is it waterproof?</span>
        <span className={styles.pvChip}>What is the delivery time?</span>
        <span className={styles.pvChipCta}>
          <span className={styles.pvAiSpark}>✦</span> Ask your question
        </span>
      </div>
    </div>
  )
}

function PvFloating({ compact }) {
  return (
    <div className={`${styles.pvFloating} ${compact ? styles.pvMobile : ''}`}>
      <button className={styles.pvFloatingClose} aria-label="Close">×</button>
      <div className={styles.pvFloatingChips}>
        <span className={styles.pvChip}>Is it suitable for sports?</span>
        <span className={styles.pvChip}>Is it waterproof?</span>
        <span className={styles.pvChip}>What is the delivery time?</span>
        <span className={styles.pvFloatingCta}>
          <span className={styles.pvAiSpark}>✦</span> Shopping Assistant
        </span>
      </div>
    </div>
  )
}

function PvClassic() {
  return (
    <div className={styles.pvClassic}>
      <div className={styles.pvClassicHeader}>Need help?</div>
      <div className={styles.pvClassicBody}>
        <div className={styles.pvClassicAvatar}><Sparkle /></div>
        <p className={styles.pvClassicText}>Have a question? We are here to help!</p>
      </div>
      <button className={styles.pvClassicCta}>Ask your question</button>
    </div>
  )
}

function PvMessaging() {
  return (
    <div className={styles.pvMessaging}>
      <div className={styles.pvMessagingAvatar}><Sparkle /></div>
      <div className={styles.pvMessagingBubble}>Have a question? We can help!</div>
    </div>
  )
}

function PvBadge() {
  return (
    <div className={styles.pvBadge}>
      <div className={styles.pvBadgeCircle}><Sparkle size={18} /></div>
    </div>
  )
}

function PvSmartBanner({ compact }) {
  return (
    <div className={`${styles.pvSmartBanner} ${compact ? styles.pvMobile : ''}`}>
      <div className={styles.pvSmartBannerInner}>
        <span className={styles.pvSmartBannerBrand}>
          <span className={styles.pvAiSpark}>✦</span> Shopping Assistant
        </span>
        <span className={styles.pvSmartBannerDivider} />
        <span className={styles.pvChip}>Help me find the perfect gift</span>
        {!compact && <span className={styles.pvChip}>I am looking for a facial treatment</span>}
        <span className={styles.pvSmartBannerInput}>
          Ask a question
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="6" y="2" width="4" height="8" rx="2"/>
            <path d="M4 9a4 4 0 008 0M8 13v2"/>
          </svg>
        </span>
      </div>
    </div>
  )
}

function PvCustom() {
  return (
    <div className={styles.pvCustom}>
      <button className={styles.pvCustomBtn}>Custom button</button>
    </div>
  )
}
