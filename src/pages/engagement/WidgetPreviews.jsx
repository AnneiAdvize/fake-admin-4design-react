// Shared widget previews used by:
//   - EngagementBuilder (live-reactive to style state, right-side panel)
//   - Engagement datatable (static, in the widget popover)
//
// Each preview accepts a `style` prop (optional) with design-system values:
//   { headerIconOn, iconColor, contentColor, starterContent, starterBg, starterBorder,
//     fontFamily, borderRadius, titleFontSize, starterFontSize, labelHeader, labelStarters, labelCta }
// Missing keys fall back to the defaults declared below.
import styles from './WidgetPreviews.module.css'

export const DEFAULT_STYLE = {
  headerIconOn: true,
  iconColor:    '#0A0A09',
  contentColor: '#0A0A09',
  starterContent: '#0B3B37',
  starterBg:      '#FFFFFF',
  starterBorder:  '#0B3B37',
  fontFamily:     'Open Sans',
  borderRadius:   16,
  titleFontSize:   'M',
  starterFontSize: 'M',
  labelHeader:     'A question about this product?',
  labelStarters:   [
    'Is it suitable for sports?',
    'Is it waterproof?',
    'What is the delivery time?',
  ],
  labelCta:        'Ask your question',
  messageText:     'Have a question? We can help!',
  classicHeader:   'Need help?',
  classicBody:     'Have a question? We are here to help!',
  classicCta:      'Ask your question',
  customLabel:     'Custom button',
}

const TITLE_SIZE = { S: 14, M: 16, L: 20 }
const STARTER_SIZE = { S: 11, M: 12, L: 14 }

/* ── Sparkle icon (reused across previews) ─────────────────────────── */
export function Sparkle({ size = 14, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1l1.4 4.6L14 7l-4.6 1.4L8 13l-1.4-4.6L2 7l4.6-1.4L8 1z" fill={color ?? 'currentColor'}/>
    </svg>
  )
}

/* ── Main switch ───────────────────────────────────────────────────── */

// Accepts either `widgetId` ('starters-embedded') or a display name ('Conversation starters') + variant.
export function WidgetPreview({ widgetId, widgetName, variant, compact, style, starterCount }) {
  const id = widgetId ?? resolveId(widgetName, variant)
  const s = { ...DEFAULT_STYLE, ...(style ?? {}) }
  if (starterCount != null && Array.isArray(s.labelStarters)) {
    s.labelStarters = s.labelStarters.slice(0, starterCount)
  }
  switch (id) {
    case 'starters-embedded': return <PvEmbedded compact={compact} s={s} />
    case 'starters-floating': return <PvFloating compact={compact} s={s} />
    case 'classic':           return <PvClassic s={s} />
    case 'messaging':         return <PvMessaging s={s} />
    case 'badge':             return <PvBadge s={s} />
    case 'smart-banner':      return <PvSmartBanner compact={compact} s={s} />
    case 'custom':            return <PvCustom s={s} />
    default: return null
  }
}

function resolveId(name, variant) {
  const n = (name ?? '').toLowerCase()
  const v = (variant ?? '').toLowerCase()
  if (n.includes('conversation starters')) {
    if (v.includes('floating')) return 'starters-floating'
    return 'starters-embedded'
  }
  if (n === 'classic') return 'classic'
  if (n === 'messaging') return 'messaging'
  if (n === 'badge') return 'badge'
  if (n.includes('smart')) return 'smart-banner'
  if (n.includes('custom')) return 'custom'
  return null
}

/* ── Previews ──────────────────────────────────────────────────────── */

function PvEmbedded({ compact, s }) {
  return (
    <div
      className={`${styles.pvEmbedded} ${compact ? styles.pvMobile : ''}`}
      style={{
        borderRadius: `${s.borderRadius}px`,
        fontFamily: `'${s.fontFamily}', sans-serif`,
      }}
    >
      <div className={styles.pvEmbeddedHeader}>
        {s.headerIconOn && (
          <span className={styles.pvAiBadge} style={{ background: s.iconColor }}>
            <Sparkle size={10} color="#fff" />
          </span>
        )}
        <span
          className={styles.pvEmbeddedTitle}
          style={{ color: s.contentColor, fontSize: `${TITLE_SIZE[s.titleFontSize]}px` }}
        >
          {s.labelHeader}
        </span>
      </div>
      <div className={styles.pvEmbeddedChips}>
        {s.labelStarters.map((q, i) => (
          <span
            key={i}
            className={styles.pvChip}
            style={{
              color: s.starterContent,
              background: s.starterBg,
              borderColor: s.starterBorder,
              fontSize: `${STARTER_SIZE[s.starterFontSize]}px`,
            }}
          >
            {q}
          </span>
        ))}
        <span
          className={styles.pvChipCta}
          style={{
            color: s.starterContent,
            background: s.starterBg,
            borderColor: s.starterBorder,
            fontSize: `${STARTER_SIZE[s.starterFontSize]}px`,
          }}
        >
          {s.labelCta}
        </span>
      </div>
    </div>
  )
}

function PvFloating({ compact, s }) {
  return (
    <div
      className={`${styles.pvFloating} ${compact ? styles.pvMobile : ''}`}
      style={{
        borderRadius: `${s.borderRadius}px`,
        fontFamily: `'${s.fontFamily}', sans-serif`,
      }}
    >
      <button className={styles.pvFloatingClose} aria-label="Close">×</button>
      <div className={styles.pvFloatingChips}>
        {s.labelStarters.map((q, i) => (
          <span
            key={i}
            className={styles.pvChip}
            style={{
              color: s.starterContent,
              background: s.starterBg,
              borderColor: s.starterBorder,
              fontSize: `${STARTER_SIZE[s.starterFontSize]}px`,
            }}
          >
            {q}
          </span>
        ))}
        <span
          className={styles.pvFloatingCta}
          style={{ background: s.iconColor, color: s.starterBg }}
        >
          <Sparkle size={10} color={s.starterBg} /> Shopping Assistant
        </span>
      </div>
    </div>
  )
}

function PvClassic({ s }) {
  return (
    <div
      className={styles.pvClassic}
      style={{
        borderRadius: `${s.borderRadius}px`,
        fontFamily: `'${s.fontFamily}', sans-serif`,
      }}
    >
      <div className={styles.pvClassicHeader} style={{ background: s.iconColor, color: s.starterBg }}>
        {s.classicHeader}
      </div>
      <div className={styles.pvClassicBody}>
        <div className={styles.pvClassicAvatar} style={{ background: s.iconColor, color: s.starterBg }}>
          <Sparkle />
        </div>
        <p className={styles.pvClassicText} style={{ color: s.contentColor }}>{s.classicBody}</p>
      </div>
      <button
        className={styles.pvClassicCta}
        style={{ background: s.iconColor, color: s.starterBg }}
      >
        {s.classicCta}
      </button>
    </div>
  )
}

function PvMessaging({ s }) {
  return (
    <div className={styles.pvMessaging} style={{ fontFamily: `'${s.fontFamily}', sans-serif` }}>
      <div className={styles.pvMessagingAvatar} style={{ background: s.iconColor, color: s.starterBg }}>
        <Sparkle />
      </div>
      <div
        className={styles.pvMessagingBubble}
        style={{ color: s.contentColor, background: s.starterBg }}
      >
        {s.messageText}
      </div>
    </div>
  )
}

function PvBadge({ s }) {
  return (
    <div className={styles.pvBadge}>
      <div
        className={styles.pvBadgeCircle}
        style={{ background: s.iconColor, color: s.starterBg }}
      >
        <Sparkle size={18} />
      </div>
    </div>
  )
}

function PvSmartBanner({ compact, s }) {
  return (
    <div className={`${styles.pvSmartBanner} ${compact ? styles.pvMobile : ''}`}
         style={{ fontFamily: `'${s.fontFamily}', sans-serif` }}>
      <div className={styles.pvSmartBannerInner}>
        <span className={styles.pvSmartBannerBrand} style={{ color: s.contentColor }}>
          <Sparkle size={12} color={s.iconColor} /> Shopping Assistant
        </span>
        <span className={styles.pvSmartBannerDivider} />
        <span
          className={styles.pvChip}
          style={{ color: s.starterContent, borderColor: s.starterBorder, background: s.starterBg }}
        >
          Help me find the perfect gift
        </span>
        {!compact && (
          <span
            className={styles.pvChip}
            style={{ color: s.starterContent, borderColor: s.starterBorder, background: s.starterBg }}
          >
            I am looking for a facial treatment
          </span>
        )}
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

function PvCustom({ s }) {
  return (
    <div className={styles.pvCustom}>
      <button
        className={styles.pvCustomBtn}
        style={{ background: s.iconColor, color: s.starterBg, fontFamily: `'${s.fontFamily}', sans-serif` }}
      >
        {s.customLabel}
      </button>
    </div>
  )
}
