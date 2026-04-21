// Widget catalog + availability matrix for the Engagement Builder.
// Source of truth: design spec (page type × device → available widgets, with ★ = recommended).

export const DEVICES = [
  { id: 'both',    label: 'Desktop & mobile' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'mobile',  label: 'Mobile' },
]

export const PAGE_TYPES = [
  { id: 'all-pages', label: 'All pages' },
  { id: 'home',      label: 'Home' },
  { id: 'search',    label: 'Search result' },
  { id: 'category',  label: 'Category' },
  { id: 'product',   label: 'Product details' },
  { id: 'funnel',    label: 'Purchase funnel' },
  { id: 'other',     label: 'Other pages' },
]

// Widget metadata. `variant` is the sub-type shown next to the name (Embedded / Floating / …).
// `hasIllustration: false` means the selection card renders without the illustration tile on the right.
export const WIDGETS = {
  'starters-embedded': { id: 'starters-embedded', name: 'Conversation starters', variant: 'Embedded', hasIllustration: true },
  'starters-floating': { id: 'starters-floating', name: 'Conversation starters', variant: 'Floating', hasIllustration: true },
  'classic':           { id: 'classic',           name: 'Classic',               variant: 'Floating', hasIllustration: true },
  'messaging':         { id: 'messaging',         name: 'Messaging',             variant: 'Floating', hasIllustration: true },
  'badge':             { id: 'badge',             name: 'Badge',                 variant: 'Floating', hasIllustration: true },
  'smart-banner':      { id: 'smart-banner',      name: 'Smart banner',          variant: null,       hasIllustration: true },
  'custom':            { id: 'custom',            name: 'Custom button',         variant: null,       hasIllustration: false },
}

// When device=both and widget is pair-able, the mobile half is Badge.
export const PAIR_RULES = {
  'classic':   { desktop: 'classic',   mobile: 'badge' },
  'messaging': { desktop: 'messaging', mobile: 'badge' },
}

// Availability matrix. Order matters — widgets appear in the given order after
// partitioning (recommended first, then the rest in the collapse).
// Each entry: { id, recommended? }
export const AVAILABILITY = {
  'all-pages': {
    both:    [{ id: 'starters-embedded', recommended: true }, { id: 'starters-floating' }, { id: 'classic' }, { id: 'messaging' }, { id: 'custom' }],
    desktop: [{ id: 'starters-embedded', recommended: true }, { id: 'starters-floating' }, { id: 'smart-banner' }, { id: 'classic' }, { id: 'messaging' }, { id: 'custom' }],
    mobile:  [{ id: 'starters-embedded', recommended: true }, { id: 'starters-floating' }, { id: 'badge' }, { id: 'custom' }],
  },
  'home': {
    both:    [{ id: 'starters-floating', recommended: true }, { id: 'starters-embedded' }, { id: 'classic' }, { id: 'messaging' }, { id: 'custom' }],
    desktop: [{ id: 'starters-floating', recommended: true }, { id: 'smart-banner', recommended: true }, { id: 'starters-embedded' }, { id: 'classic' }, { id: 'messaging' }, { id: 'custom' }],
    mobile:  [{ id: 'starters-floating', recommended: true }, { id: 'starters-embedded' }, { id: 'badge' }, { id: 'custom' }],
  },
  'search': {
    both:    [{ id: 'starters-floating', recommended: true }, { id: 'starters-embedded', recommended: true }, { id: 'classic' }, { id: 'messaging' }, { id: 'custom' }],
    desktop: [{ id: 'starters-floating', recommended: true }, { id: 'starters-embedded', recommended: true }, { id: 'smart-banner', recommended: true }, { id: 'classic' }, { id: 'messaging' }, { id: 'custom' }],
    mobile:  [{ id: 'starters-floating', recommended: true }, { id: 'starters-embedded', recommended: true }, { id: 'badge' }, { id: 'custom' }],
  },
  'category': {
    both:    [{ id: 'starters-floating', recommended: true }, { id: 'starters-embedded', recommended: true }, { id: 'classic' }, { id: 'messaging' }, { id: 'custom' }],
    desktop: [{ id: 'starters-floating', recommended: true }, { id: 'starters-embedded', recommended: true }, { id: 'smart-banner', recommended: true }, { id: 'classic' }, { id: 'messaging' }, { id: 'custom' }],
    mobile:  [{ id: 'starters-floating', recommended: true }, { id: 'starters-embedded', recommended: true }, { id: 'badge' }, { id: 'custom' }],
  },
  'product': {
    both:    [{ id: 'starters-embedded', recommended: true }, { id: 'starters-floating' }, { id: 'classic' }, { id: 'messaging' }, { id: 'custom' }],
    desktop: [{ id: 'starters-embedded', recommended: true }, { id: 'starters-floating' }, { id: 'classic' }, { id: 'messaging' }, { id: 'custom' }],
    mobile:  [{ id: 'starters-embedded', recommended: true }, { id: 'starters-floating' }, { id: 'badge' }, { id: 'custom' }],
  },
  'funnel': {
    both:    [{ id: 'starters-embedded', recommended: true }],
    desktop: [{ id: 'starters-embedded', recommended: true }],
    mobile:  [{ id: 'starters-embedded', recommended: true }],
  },
  'other': {
    both:    [{ id: 'starters-floating', recommended: true }, { id: 'starters-embedded' }, { id: 'classic' }, { id: 'messaging' }, { id: 'custom' }],
    desktop: [{ id: 'starters-floating', recommended: true }, { id: 'smart-banner', recommended: true }, { id: 'starters-embedded' }, { id: 'classic' }, { id: 'messaging' }, { id: 'custom' }],
    mobile:  [{ id: 'starters-floating', recommended: true }, { id: 'starters-embedded' }, { id: 'badge' }, { id: 'custom' }],
  },
}

export function getAvailableWidgets(pageTypeId, deviceId) {
  return AVAILABILITY[pageTypeId]?.[deviceId] ?? []
}

export function splitRecommended(entries) {
  const recommended = entries.filter(e => e.recommended)
  const others = entries.filter(e => !e.recommended)
  return { recommended, others }
}

// Returns true when the widget should render as a pair card under the given device.
export function isPairCard(widgetId, deviceId) {
  return deviceId === 'both' && Object.hasOwn(PAIR_RULES, widgetId)
}

// Default target URLs used to pre-fill the Website URL field when changing page type.
// Other page types start empty and require the user to enter a URL manually.
export const PAGE_TYPE_DEMO_URLS = {
  'home':     'https://idz-v2-marine.surge.sh/index.html',
  'category': 'https://idz-v2-marine.surge.sh/category/bouche.html',
  'product':  'https://idz-v2-marine.surge.sh/bouche/dentifrice-enfants.html',
}

// Returns the default URL to pre-fill for the given page type, or null if none.
export function getDemoUrl(pageTypeId) {
  return PAGE_TYPE_DEMO_URLS[pageTypeId] ?? null
}
