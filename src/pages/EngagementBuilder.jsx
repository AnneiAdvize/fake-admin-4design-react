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
  getDemoUrl,
} from './engagement/widgetCatalog'
import { ILLUSTRATIONS } from './engagement/WidgetIllustrations'
import { WidgetPreview, DEFAULT_STYLE } from './engagement/WidgetPreviews'
import StyleTab from './engagement/StyleTab'
import ContentTab from './engagement/ContentTab'

export default function EngagementBuilder() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('widget')
  const [pageType, setPageType] = useState('product')
  const [device, setDevice] = useState('both')
  const [selectedWidget, setSelectedWidget] = useState('starters-embedded')
  const [showOthers, setShowOthers] = useState(false)
  const [strategyName, setStrategyName] = useState('All product except B5')
  const [status] = useState('Offline')
  const [customUrl, setCustomUrl] = useState(() => getDemoUrl('product') ?? '')
  const [urlError, setUrlError] = useState(false)
  const [conditions, setConditions] = useState([])
  const [widgetStyle, setWidgetStyle] = useState({
    ...DEFAULT_STYLE,
    labelStarters: [
      ...DEFAULT_STYLE.labelStarters,
      'How quickly can it be delivered?',
      'Is there a warranty?',
    ],
  })
  const [starterCount, setStarterCount] = useState(3)
  const [mobileStarterCount, setMobileStarterCount] = useState(3)

  // When page type changes, if it has a default demo URL, pre-fill the field.
  // Empty the field for page types without defaults so the user provides their own.
  useEffect(() => {
    const demo = getDemoUrl(pageType)
    if (demo) setCustomUrl(demo)
  }, [pageType])

  // Clear any URL error as soon as the user types.
  useEffect(() => {
    if (customUrl.trim()) setUrlError(false)
  }, [customUrl])

  function openTestOnWebsite(opts = {}) {
    const trimmed = customUrl.trim()
    if (!trimmed) {
      setUrlError(true)
      return
    }
    const url = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    const params = new URLSearchParams({ url, returnTo: '/engagement/builder' })
    if (opts.picker) params.set('picker', '1')
    navigate(`/test-preview?${params.toString()}`)
  }
  function openPickElement() {
    openTestOnWebsite({ picker: true })
  }

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
    <div className={styles.builderRoot}>
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
              strategyName={strategyName}
              onStrategyNameCommit={setStrategyName}
            />
          )}
          {activeTab === 'style' && (
            <StyleTab
              widgetId={selectedWidget}
              widgetStyle={widgetStyle}
              setWidgetStyle={setWidgetStyle}
            />
          )}
          {activeTab === 'content' && (
            <ContentTab
              widgetId={selectedWidget}
              widgetStyle={widgetStyle}
              setWidgetStyle={setWidgetStyle}
              starterCount={starterCount}
              setStarterCount={setStarterCount}
              mobileStarterCount={mobileStarterCount}
              setMobileStarterCount={setMobileStarterCount}
            />
          )}
          {activeTab === 'position' && (
            <PositionTab
              pageType={pageType}
              customUrl={customUrl}
              setCustomUrl={setCustomUrl}
              urlError={urlError}
              onOpenTest={openTestOnWebsite}
              onPickElement={openPickElement}
            />
          )}
        </div>

        <PreviewPanel
          device={device}
          selectedWidget={selectedWidget}
          pageType={pageType}
          customUrl={customUrl}
          setCustomUrl={setCustomUrl}
          urlError={urlError}
          onOpenTest={openTestOnWebsite}
          widgetStyle={widgetStyle}
          starterCount={starterCount}
          mobileStarterCount={mobileStarterCount}
        />
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
  strategyName, onStrategyNameCommit,
}) {
  const available = getAvailableWidgets(pageType, device)
  const { recommended, others } = splitRecommended(available)
  const hasOthers = others.length > 0

  // Local input value — committed to the parent only on blur so the title
  // at the top updates when the user leaves the field.
  const [localName, setLocalName] = useState(strategyName)
  useEffect(() => { setLocalName(strategyName) }, [strategyName])

  const hasConditions = conditions.length > 0

  return (
    <div className={styles.formBody}>
      <div className={styles.tabCard}>
        <div className={styles.formSection}>
          <label className={styles.formLabel} htmlFor="strategy-name">Engagement strategy name</label>
          <input
            className={styles.formInput}
            type="text"
            id="strategy-name"
            value={localName}
            onChange={e => setLocalName(e.target.value)}
            onBlur={() => onStrategyNameCommit(localName.trim() || 'Untitled strategy')}
          />
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
      </div>

      <div className={styles.tabCard}>
        <div className={styles.conditionsSection}>
          <p className={styles.conditionsTitle}>Conditions</p>
          <p className={styles.conditionsDesc}>You can add conditions to personalize the display of your widget.</p>
          {hasConditions && (
            <p className={styles.conditionsLabel}>My widget will display if</p>
          )}
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

/* StyleTab is imported from './engagement/StyleTab'. */

/* ContentTab is imported from './engagement/ContentTab'. */

function PositionTab({ pageType, customUrl, setCustomUrl, urlError, onOpenTest, onPickElement }) {
  const [personalizeMobile, setPersonalizeMobile] = useState(true)

  return (
    <div className={styles.formBody}>
      <PositionCard title="Position" subtitle="How would you like to choose your widget's position?" onPick={onPickElement} />

      <label className={styles.posCheckboxRow}>
        <input
          type="checkbox"
          className={styles.posCheckbox}
          checked={personalizeMobile}
          onChange={e => setPersonalizeMobile(e.target.checked)}
        />
        <span className={styles.posCheckboxLabel}>Personalize the mobile widget position</span>
      </label>

      {personalizeMobile && (
        <PositionCard title="Position for mobile" subtitle="How would you like to choose your widget's position?" onPick={onPickElement} />
      )}
    </div>
  )
}

function PositionCard({ title, subtitle, onPick }) {
  return (
    <div className={styles.posCard}>
      <div>
        <h3 className={styles.posCardTitle}>{title}</h3>
        <p className={styles.posCardSub}>{subtitle}</p>
      </div>

      <div className={styles.posHtmlRow}>
        <div className={styles.posHtmlField}>
          <label className={styles.posFieldLabel}>Add HTML Element</label>
          <input className={styles.posHtmlInput} type="text" defaultValue="#product-information-block-5 template--2268" />
        </div>
        <span className={styles.posOr}>OR</span>
        <button className={styles.btnPick} onClick={onPick}>
          Pick an element on my website
        </button>
      </div>

      <div>
        <label className={styles.posFieldLabel}>Position relative to selected reference</label>
        <div className={styles.posReferenceOptions}>
          <label className={styles.radioOption}><input type="radio" name={`pos-ref-${title}`} /><span className={styles.radioLabel}>Before</span></label>
          <label className={styles.radioOption}><input type="radio" name={`pos-ref-${title}`} defaultChecked /><span className={styles.radioLabel}>Inside</span></label>
          <label className={styles.radioOption}><input type="radio" name={`pos-ref-${title}`} /><span className={styles.radioLabel}>After</span></label>
        </div>
      </div>

      <div>
        <p className={styles.posMarginLabel}>Margin</p>
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
  )
}

/* ── Preview panel ─────────────────────────────────────────────────── */

function PreviewPanel({ device, selectedWidget, pageType, customUrl, setCustomUrl, urlError, onOpenTest, widgetStyle, starterCount, mobileStarterCount }) {
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
        <button className={styles.btnTest} onClick={onOpenTest}>
          Test on my website
        </button>
      </div>
      <div className={styles.previewBody}>
        <div className={styles.previewUrlBlock}>
          <span className={styles.previewUrlLabel}>Website URL</span>
          <input
            className={`${styles.previewUrlInput} ${urlError ? styles.previewUrlInputError : ''}`}
            type="text"
            value={customUrl}
            onChange={e => setCustomUrl(e.target.value)}
            placeholder="Enter your website URL"
          />
          {urlError && (
            <p className={styles.previewUrlErrorMsg}>
              Please enter your website URL to run the test on your website.
            </p>
          )}
        </div>

        {showDesktop && (
          <>
            <p className={styles.previewDeviceLabel}>Desktop</p>
            <div className={styles.widgetPreviewCard}>
              <WidgetPreview widgetId={selectedWidget} style={widgetStyle} starterCount={starterCount} />
            </div>
          </>
        )}

        {showDesktop && showMobile && <div className={styles.previewDivider} />}

        {showMobile && (
          <>
            <p className={styles.previewDeviceLabel}>Mobile</p>
            <div className={styles.widgetPreviewCard}>
              <WidgetPreview widgetId={mobileWidget} compact style={widgetStyle} starterCount={mobileStarterCount} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* Widget previews are imported from './engagement/WidgetPreviews'. */
