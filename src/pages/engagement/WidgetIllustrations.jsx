// Compact 80×48 illustrations used in the widget-selection cards.
// Each exports a component that accepts `{ active }`: colored when true, neutral grayscale when false.
// Colors are resolved from CSS tokens (see src/tokens.css).

const ACTIVE = 'var(--color-brand)'          // primary 600 — #3BE1A4
const OFF    = 'var(--color-border-disabled)' // #F0F0EC
const DARK   = 'var(--color-content-icon)'    // #3D3D38

export function StartersEmbedded({ active }) {
  const fill = active ? ACTIVE : OFF
  return (
    <svg width="64" height="40" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Header row (avatar + label bar — always neutral) */}
      <circle cx="5" cy="5" r="3" fill={DARK} />
      <rect x="11" y="3" width="32" height="4" rx="2" fill={DARK} />
      {/* Three chips below */}
      <rect x="0"  y="14" width="33" height="7" rx="3.5" fill={fill} />
      <rect x="36" y="14" width="27" height="7" rx="3.5" fill={fill} />
      <rect x="0"  y="24" width="43" height="7" rx="3.5" fill={fill} />
    </svg>
  )
}

export function StartersFloating({ active }) {
  const fill = active ? ACTIVE : OFF
  return (
    <svg width="64" height="40" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Close cross top-right */}
      <path d="M60 2 l3 3 M63 2 l-3 3" stroke={DARK} strokeWidth="1" strokeLinecap="round" />
      {/* Stacked chips aligned right */}
      <rect x="36" y="8"  width="27" height="4" rx="2" fill={fill} />
      <rect x="21" y="16" width="42" height="4" rx="2" fill={fill} />
      <rect x="13" y="24" width="50" height="4" rx="2" fill={fill} />
      {/* CTA pill (dark) */}
      <rect x="28" y="32" width="35" height="7" rx="3.5" fill={DARK} />
    </svg>
  )
}

export function Classic({ active }) {
  const accent = active ? ACTIVE : OFF
  return (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Header bar */}
      <rect x="0" y="0" width="56" height="8" rx="2" fill={DARK} />
      {/* Card body */}
      <rect x="0" y="8" width="56" height="32" rx="2" fill="white" stroke={OFF} />
      {/* Avatar */}
      <circle cx="11" cy="22" r="5" fill={DARK} />
      <circle cx="13" cy="20" r="1" fill={accent} />
      {/* Text lines */}
      <rect x="20" y="19" width="28" height="2.5" rx="1.25" fill={DARK} opacity="0.7" />
      <rect x="20" y="23" width="20" height="2.5" rx="1.25" fill={DARK} opacity="0.5" />
      {/* CTA */}
      <rect x="8" y="30" width="40" height="6" rx="3" fill={DARK} />
    </svg>
  )
}

export function Messaging({ active }) {
  const dot = active ? ACTIVE : OFF
  return (
    <svg width="64" height="40" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Avatar */}
      <circle cx="11" cy="20" r="9" fill={DARK} />
      <circle cx="11" cy="17" r="2" fill="white" />
      <ellipse cx="11" cy="25" rx="5" ry="3" fill="white" />
      <circle cx="18" cy="13" r="2.5" fill={dot} stroke="white" strokeWidth="1" />
      {/* Bubble */}
      <rect x="24" y="12" width="36" height="16" rx="3" fill="white" stroke={OFF} />
      <rect x="28" y="17" width="20" height="2" rx="1" fill={DARK} opacity="0.5" />
      <rect x="28" y="21" width="14" height="2" rx="1" fill={DARK} opacity="0.5" />
    </svg>
  )
}

export function Badge({ active }) {
  const dot = active ? ACTIVE : OFF
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="13" fill={DARK} />
      <circle cx="20" cy="17" r="3" fill="white" />
      <ellipse cx="20" cy="26" rx="7" ry="4" fill="white" />
      <circle cx="28" cy="12" r="3" fill={dot} stroke="white" strokeWidth="1.2" />
    </svg>
  )
}

export function SmartBanner({ active }) {
  const pill = active ? ACTIVE : OFF
  return (
    <svg width="64" height="16" viewBox="0 0 64 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="64" height="16" rx="4" fill={OFF} />
      <circle cx="5" cy="8" r="2" fill="white" />
      <rect x="9"  y="6" width="8" height="4" rx="2" fill={pill} />
      <rect x="19" y="6" width="8" height="4" rx="2" fill={pill} />
      <rect x="29" y="6" width="8" height="4" rx="2" fill={pill} />
      <rect x="41" y="6" width="18" height="4" rx="2" fill="white" />
    </svg>
  )
}

// Helper: map widget id → illustration component.
export const ILLUSTRATIONS = {
  'starters-embedded': StartersEmbedded,
  'starters-floating': StartersFloating,
  'classic':           Classic,
  'messaging':         Messaging,
  'badge':             Badge,
  'smart-banner':      SmartBanner,
}
