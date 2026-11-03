# CLAUDE.md — iAdvize Admin Design System Rules

This file documents the conventions, components, and workflows to follow when implementing Figma designs in this React project. **Read this before writing any UI code.**

---

## Two Design Systems

This project uses **two separate Figma design systems** depending on the surface being built:

| Surface | Design System | Figma file |
|---|---|---|
| Admin interface (forms, nav, tables, buttons…) | **Ori - Admin Design System** | https://www.figma.com/design/SWQkAMTponnLRVHG1JVaiC/Ori---Admin-Design-System |
| Chat widget (preview panel + deployed on client sites) | **Ori - Shopping Assistant Design System** | (see team Figma library) |

The Shopping Assistant Builder page (`/shopping-assistant/builder`) contains **both**: the left panel is Admin DS, the right panel (chat preview) is Shopping Assistant DS. Never mix tokens or components between the two surfaces.

---

## Project Stack

- **Framework**: React 18 (JSX, no TypeScript)
- **Routing**: React Router v6 (`<BrowserRouter>`, `<Outlet>`)
- **Styling**: CSS Modules (`*.module.css`) + CSS custom properties (no Tailwind, no styled-components)
- **Build**: Vite
- **No external UI library** (all components are custom-built)

---

## Project Structure

```
src/
├── tokens.css                  ← ALL design tokens (NEVER hardcode values — use these)
├── index.css                   ← Global reset only
├── App.jsx                     ← Router
├── components/
│   ├── ui/                     ← Atomic components (Button, Tag, TextField, etc.)
│   └── layout/                 ← Layout components (NavPrimary, NavSecondary, PageLayout)
└── pages/                      ← Page-level components + their .module.css
```

---

## Design Tokens (`src/tokens.css`)

**IMPORTANT: Never hardcode any color, spacing, font size, radius, shadow, or transition. Always use the CSS variables defined in `src/tokens.css`.**

### Colors

```css
/* Backgrounds */
--color-bg-default: #F8F8F6
--color-bg-surface: #FFFFFF
--color-bg-hover: #F0F0EC
--color-bg-selected: #3D3D38

/* Content / Text */
--color-content-primary: #0A0A09
--color-content-secondary: #6C6C68
--color-content-disabled: #9B9B97
--color-content-inverse: #FFFFFF
--color-content-icon: #3D3D38

/* Borders */
--color-border-default: #D1D1CB
--color-border-disabled: #F0F0EC

/* Brand */
--color-brand: #3BE1A4            /* primary green */
--color-brand-subtle: #D0FBF4
--color-brand-selected: #29A37A
--color-brand-strong: #0B3B37     /* dark green */

/* Actions */
--color-action-primary: #3BE1A4
--color-action-primary-hover: #176251
--color-action-primary-active: #0B3B37
--color-action-primary-disabled: #F0F0EC
--color-action-secondary: #0B3B37
--color-action-secondary-hover: #D0FBF4
--color-action-secondary-active: #93F0CD

/* Status */
--color-info-bg / --color-info-icon / --color-info-text
--color-warning-bg / --color-warning-icon / --color-warning-text
--color-danger-bg / --color-danger-icon / --color-danger-text
--color-success-bg / --color-success-icon / --color-success-text

/* Navigation */
--color-nav-bg: #FFFFFF
--color-subnav-bg: #0B3B37
```

### Typography

```css
/* Font families */
--font: 'Open Sans', -apple-system, sans-serif   /* default body font */
--font-btn: 'Open Sans', sans-serif
--font-mono: 'SFMono-Regular', Consolas, monospace

/* Font sizes */
--text-xs: 11px    --text-sm: 12px    --text-base: 13px
--text-md: 14px    --text-lg: 15px    --text-xl: 16px
--text-2xl: 18px   --text-3xl: 20px   --text-4xl: 24px
--text-title-xxl: 25px  --text-title-xxxl: 30px  --text-title-xxxxl: 36px

/* Font weights */
--weight-normal: 400   --weight-medium: 500
--weight-semibold: 600  --weight-bold: 700
```

### Spacing

```css
--sp-1: 4px    --sp-2: 8px    --sp-3: 14px   --sp-4: 16px
--sp-5: 20px   --sp-6: 24px   --sp-8: 32px   --sp-10: 40px   --sp-12: 48px
```

### Border Radius

```css
--r-sm: 4px    --r-md: 6px    --r-lg: 8px
--r-xl: 12px   --r-2xl: 16px  --r-full: 9999px
```

### Shadows & Transitions

```css
/* Shadows */
--shadow-xs  --shadow-sm  --shadow-md  --shadow-lg  --shadow-dropdown

/* Transitions */
--t-fast: 100ms ease    --t-base: 150ms ease    --t-slow: 220ms ease
```

---

## UI Component Library (`src/components/ui/`)

**IMPORTANT: Always reuse an existing component before creating a new one.**

| Component | Key props | Notes |
|---|---|---|
| `Button` | `variant` (primary/secondary/tertiary/ghost/danger), `size` (sm/md/lg), `loading`, `iconLeft`, `iconRight` | Primary = green, Secondary = dark outline |
| `Tag` | `color` (Validation/Information/Warning/Alerte/Purple/Dark/White), `size` (XL/L/M/S), `intense` | Use for status pills |
| `TextField` | `label`, `helperText`, `errorText`, `state`, `prefix`, `suffix` | Wraps `<input>` |
| `TextArea` | `label`, `helperText`, `rows`, `state` | Wraps `<textarea>` |
| `Toggle` | `checked`, `onChange`, `label`, `disabled` | Switch component |
| `Tabs` | `tabs` (array), `value`, `onChange`, `underline` | Use instead of custom tab bars |
| `TabItem` | `label`, `selected`, `disabled`, `dark` | Used internally by `Tabs` |
| `Alert` | `type` (Alert/Warning/Info/Success/Neutral), `message`, `actionLabel` | Info banners |
| `Badge` | `variant` (info/success/warning/error/neutral), `label` | Small status indicators |
| `Checkbox` | `checked`, `indeterminate`, `label`, `state` | |
| `RadioButton` | `checked`, `label`, `description`, `state` | |
| `Separator` | `withText`, `text` | Horizontal divider |
| `DataTable` | `columns`, `rows`, `onRowClick` | Generic table |
| `DropdownMenu` | `items`, `sections`, `onSelect`, `selected` | |
| `Toast` | `goal` (Success/Error/Loading/Information), `message` | Notification |
| `Tooltip` | `content`, `side` (Top/Bottom/Left/Right), `children` | |
| `EmptyState` | `icon`, `title`, `subtitle` | Empty placeholder |
| `Card` | `title`, `children` | Generic card container |

### Layout components (`src/components/layout/`)

- `PageLayout` — main wrapper (NavPrimary + optional NavSecondary + `<Outlet>`)
- `NavPrimary` — top navigation bar
- `NavSecondary` — sidebar/subnav (appears on /reports and /settings)

---

## Styling Conventions

### CSS Modules

Every component has a co-located `.module.css` file. Page-specific styles live in `pages/PageName.module.css`.

```jsx
import styles from './MyComponent.module.css'

<div className={styles.wrapper}>
  <button className={`${styles.btn} ${styles[variant]} ${styles[size]}`}>
    {children}
  </button>
</div>
```

### Data attributes for state styling

Use data attributes (not additional CSS classes) to style interactive states:

```jsx
// In component JSX
<div
  data-variant={variant}
  data-size={size}
  data-state={state}
  data-checked={checked || undefined}
  data-disabled={disabled || undefined}
  data-error={hasError || undefined}
/>
```

```css
/* In module.css */
.wrapper { /* base */ }
.wrapper[data-checked] { /* checked state */ }
.wrapper[data-disabled] { cursor: not-allowed; opacity: 0.5; }
.wrapper:hover:not([data-disabled]) { /* hover */ }
```

### Never do this

```css
/* ❌ Hardcoded values */
color: #0A0A09;
padding: 16px;
border-radius: 4px;
font-size: 14px;

/* ✅ Use tokens instead */
color: var(--color-content-primary);
padding: var(--sp-4);
border-radius: var(--r-sm);
font-size: var(--text-md);
```

```jsx
/* ❌ Inline styles (except for truly dynamic values) */
<div style={{ color: '#0A0A09', padding: '16px' }} />

/* ✅ CSS Module class */
<div className={styles.content} />
```

---

## Figma MCP Integration Workflow

Follow these steps **in order** for every Figma-driven implementation:

### 1. Get design context

```
get_design_context(fileKey, nodeId)
```

Use `fileKey` + `nodeId` extracted from the Figma URL:
- URL: `https://figma.com/design/:fileKey/...?node-id=1-2`
- `nodeId` = `1:2` (replace `-` with `:`)

If the response is too large, use `get_metadata` first to explore the node tree, then fetch specific child nodes individually.

### 2. Get a screenshot for visual reference

```
get_screenshot(fileKey, nodeId)
```

Keep this open throughout implementation. It is the source of truth.

### 3. Download assets

- **IMPORTANT**: Use `localhost` asset URLs returned by the Figma MCP server directly — never recreate icons as code if a URL is provided.
- **IMPORTANT**: Do not install new icon packages. All icons should come from the Figma payload or from existing SVGs in the codebase.
- Static assets (images) go in `public/`.

### 4. Translate to project conventions

The Figma MCP returns React + Tailwind code. **Do not use it as-is.** Instead:

1. Replace Tailwind classes with CSS Module classes and `var(--*)` tokens
2. Replace any generic `<div>` with the matching component from `src/components/ui/`
3. Follow the data-attribute pattern for interactive states
4. Use `var(--font)` instead of hardcoded font stacks

### 5. Validate against screenshot

Before marking complete, verify:
- [ ] Layout matches (spacing, alignment, sizing)
- [ ] Typography matches (font size, weight, line height)
- [ ] Colors match exactly (mapped to correct tokens)
- [ ] Interactive states work (hover, active, disabled)
- [ ] No hardcoded values

---

## Which Design System to Use

When implementing a Figma node, first identify the surface:

```
Admin interface (nav, forms, settings, tables) → Ori - Admin Design System
  → Use components from src/components/ui/
  → Use tokens from src/tokens.css

Chat widget (preview panel, message bubbles, compose input) → Ori - Shopping Assistant DS
  → Styles are scoped to the preview panel
  → Do NOT import admin tokens into chat widget styles
```

On the Shopping Assistant Builder page:
- `src/pages/ShoppingAssistantBuilder.jsx`
- Left panel (`.leftPanel`) → Admin DS
- Right panel (`.previewPanel`) → Shopping Assistant DS

---

## Page Conventions

- One CSS Module per page: `PageName.module.css`
- Sub-components that are page-specific (used only once) can be defined as local functions in the same file
- Shared components that appear in multiple pages go in `src/components/ui/`
- Pages use `useNavigate()` for programmatic navigation
- Data fetching and state management live in the page component (no global store currently)

---

## Routes

```
/home                           → Home.jsx
/engagement                     → Engagement.jsx
/engagement/builder             → EngagementBuilder.jsx
/shopping-assistant             → ShoppingAssistant.jsx
/shopping-assistant/builder     → ShoppingAssistantBuilder.jsx
/knowledge                      → Knowledge.jsx
/knowledge/catalog              → KnowledgeCatalog.jsx
/knowledge/faq                  → KnowledgeFaq.jsx
/settings/page-types            → Settings.jsx (section="pagetypes")
/settings/users                 → Settings.jsx (section="users")
/reports/overview               → reports/Overview.jsx
/reports/sales                  → reports/Sales.jsx
/reports/conversations          → reports/Conversations.jsx
/reports/quality                → reports/Quality.jsx
/test-preview                   → TestPreview.jsx (outside PageLayout)
```
