// Per-widget Style tab used inside the EngagementBuilder form panel.
// Renders cards based on the selected widget type. Writes into widgetStyle
// via setWidgetStyle; live updates propagate to the right-side preview.
import { useState } from 'react'
import styles from './StyleTab.module.css'

export const GOOGLE_FONTS = [
  'Open Sans', 'Source Sans Pro', 'Montserrat', 'Lato', 'Nunito',
  'PT Serif', 'Arial', 'Roboto', 'EB Garamond', 'Poppins',
]

export default function StyleTab({ widgetId, widgetStyle, setWidgetStyle }) {
  const s = widgetStyle
  const set = (patch) => setWidgetStyle(prev => ({ ...prev, ...patch }))

  return (
    <div className={styles.root}>
      {/* Colors */}
      {widgetId === 'starters-embedded' || widgetId === 'starters-floating' || widgetId === 'smart-banner' ? (
        <>
          <Card title="Colors for header">
            <div className={styles.row}>
              <Toggle
                on={s.headerIconOn}
                onChange={v => set({ headerIconOn: v })}
                label="Display an icon"
              />
              <ColorField
                label="Icon"
                value={s.iconColor}
                onChange={v => set({ iconColor: v })}
                disabled={!s.headerIconOn}
              />
              <ColorField
                label="Content"
                value={s.contentColor}
                onChange={v => set({ contentColor: v })}
              />
            </div>
          </Card>

          <Card title="Colors for starters">
            <div className={styles.row}>
              <ColorField
                label="Starter content"
                value={s.starterContent}
                onChange={v => set({ starterContent: v })}
              />
              <ColorField
                label="Starter background"
                value={s.starterBg}
                onChange={v => set({ starterBg: v })}
              />
              <ColorField
                label="Starter border"
                value={s.starterBorder}
                onChange={v => set({ starterBorder: v })}
              />
            </div>
          </Card>
        </>
      ) : widgetId === 'classic' ? (
        <Card title="Colors">
          <div className={styles.row}>
            <ColorField
              label="Header background"
              value={s.iconColor}
              onChange={v => set({ iconColor: v })}
            />
            <ColorField
              label="Button background"
              value={s.starterContent}
              onChange={v => set({ starterContent: v })}
            />
          </div>
          <div className={styles.row}>
            <ColorField
              label="Font color for header and button"
              value={s.starterBg}
              onChange={v => set({ starterBg: v })}
            />
          </div>
        </Card>
      ) : widgetId === 'messaging' ? (
        <Card title="Colors">
          <div className={styles.row}>
            <ColorField
              label="Avatar background"
              value={s.iconColor}
              onChange={v => set({ iconColor: v })}
            />
            <ColorField
              label="Bubble background"
              value={s.starterBg}
              onChange={v => set({ starterBg: v })}
            />
            <ColorField
              label="Text color"
              value={s.contentColor}
              onChange={v => set({ contentColor: v })}
            />
          </div>
        </Card>
      ) : widgetId === 'badge' ? (
        <Card title="Colors">
          <div className={styles.row}>
            <ColorField
              label="Primary color"
              value={s.iconColor}
              onChange={v => set({ iconColor: v })}
            />
            <ColorField
              label="Secondary color"
              value={s.starterBg}
              onChange={v => set({ starterBg: v })}
            />
          </div>
        </Card>
      ) : widgetId === 'custom' ? (
        <Card title="Colors">
          <div className={styles.row}>
            <ColorField
              label="Background"
              value={s.iconColor}
              onChange={v => set({ iconColor: v })}
            />
            <ColorField
              label="Text color"
              value={s.starterBg}
              onChange={v => set({ starterBg: v })}
            />
          </div>
        </Card>
      ) : null}

      {/* Font (all widgets except Badge) */}
      {widgetId !== 'badge' && (
        <Card title="Font">
          <div className={styles.radioRow}>
            <Radio
              name="font-source"
              checked={s.fontSource !== 'website'}
              onChange={() => set({ fontSource: 'google' })}
              label="Use Google font"
            />
            <Radio
              name="font-source"
              checked={s.fontSource === 'website'}
              onChange={() => set({ fontSource: 'website' })}
              label="Use my website font"
            />
          </div>
          {s.fontSource !== 'website' && (
            <div className={styles.selectBlock}>
              <label className={styles.selectLabel}>Google font</label>
              <select
                className={styles.select}
                value={s.fontFamily}
                onChange={e => set({ fontFamily: e.target.value })}
                style={{ fontFamily: `'${s.fontFamily}', sans-serif` }}
              >
                {GOOGLE_FONTS.map(f => (
                  <option key={f} value={f} style={{ fontFamily: `'${f}', sans-serif` }}>{f}</option>
                ))}
              </select>
            </div>
          )}
        </Card>
      )}

      {/* Advanced settings collapse — shown for widgets that have them */}
      {(widgetId === 'starters-embedded' || widgetId === 'starters-floating') && (
        <AdvancedCard>
          <div className={styles.field}>
            <label className={styles.selectLabel}>Border radius</label>
            <div className={styles.numberField}>
              <input
                type="number"
                className={styles.numberInput}
                value={s.borderRadius}
                onChange={e => set({ borderRadius: Number(e.target.value) || 0 })}
              />
              <span className={styles.numberSuffix}>px</span>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.selectLabel}>Title font size</label>
            <div className={styles.radioRow}>
              {['S', 'M', 'L'].map(size => (
                <Radio
                  key={size}
                  name="title-font-size"
                  checked={s.titleFontSize === size}
                  onChange={() => set({ titleFontSize: size })}
                  label={size === 'S' ? 'Small' : size === 'M' ? 'Medium' : 'Large'}
                />
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.selectLabel}>Starter font size</label>
            <div className={styles.radioRow}>
              {['S', 'M', 'L'].map(size => (
                <Radio
                  key={size}
                  name="starter-font-size"
                  checked={s.starterFontSize === size}
                  onChange={() => set({ starterFontSize: size })}
                  label={size === 'S' ? 'Small' : size === 'M' ? 'Medium' : 'Large'}
                />
              ))}
            </div>
          </div>
        </AdvancedCard>
      )}
    </div>
  )
}

/* ── Subcomponents ─────────────────────────────────────────────────── */

function Card({ title, children }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      {children}
    </div>
  )
}

function AdvancedCard({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        type="button"
        className={styles.advancedToggle}
        onClick={() => setOpen(v => !v)}
      >
        Advanced settings
        <svg
          className={open ? styles.advancedChevronOpen : ''}
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M2 4l3 3 3-3"/>
        </svg>
      </button>
      {open && <div className={styles.card}>{children}</div>}
    </div>
  )
}

function Toggle({ on, onChange, label }) {
  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={on}
        onChange={e => onChange(e.target.checked)}
        className={styles.toggleInput}
      />
      <span className={`${styles.toggleTrack} ${on ? styles.toggleTrackOn : ''}`}>
        <span className={styles.toggleThumb} />
      </span>
      <span className={styles.toggleLabel}>{label}</span>
    </label>
  )
}

function ColorField({ label, value, onChange, disabled }) {
  return (
    <div className={`${styles.colorField} ${disabled ? styles.colorFieldDisabled : ''}`}>
      <label className={styles.colorSwatchWrap}>
        <span className={styles.colorSwatch} style={{ background: value }} />
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className={styles.colorInput}
          aria-label={label}
        />
      </label>
      <span className={styles.colorLabel}>{label}</span>
    </div>
  )
}

function Radio({ name, checked, onChange, label }) {
  return (
    <label className={styles.radio}>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.radioInput}
      />
      <span className={`${styles.radioDot} ${checked ? styles.radioDotOn : ''}`}>
        {checked && <span className={styles.radioInnerDot} />}
      </span>
      <span className={styles.radioLabel}>{label}</span>
    </label>
  )
}
