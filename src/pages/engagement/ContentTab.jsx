// Per-widget Content tab. Routes to the correct fields based on widget type.
// Writes into widgetStyle (which holds both style AND content fields).
import { useState, useRef, useEffect } from 'react'
import styles from '../EngagementBuilder.module.css'
import localStyles from './ContentTab.module.css'

export default function ContentTab({ widgetId, widgetStyle, setWidgetStyle, starterCount, setStarterCount, mobileStarterCount, setMobileStarterCount }) {
  const s = widgetStyle
  const set = (patch) => setWidgetStyle(prev => ({ ...prev, ...patch }))

  if (widgetId === 'starters-embedded' || widgetId === 'starters-floating' || widgetId === 'smart-banner') {
    return (
      <StartersContent
        s={s}
        set={set}
        starterCount={starterCount}
        setStarterCount={setStarterCount}
        mobileStarterCount={mobileStarterCount}
        setMobileStarterCount={setMobileStarterCount}
      />
    )
  }
  if (widgetId === 'classic') return <ClassicContent s={s} set={set} />
  if (widgetId === 'messaging') return <MessagingContent s={s} set={set} />
  if (widgetId === 'badge') return <BadgeContent />
  if (widgetId === 'custom') return <CustomContent s={s} set={set} />
  return null
}

/* ── Conversation starters / Smart banner ─────────────────────────── */
function StartersContent({ s, set, starterCount, setStarterCount, mobileStarterCount, setMobileStarterCount }) {
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [forbidden, setForbidden] = useState('')

  // Starter type per row (ai | manual). Persist in widgetStyle as `starterTypes`.
  const types = s.starterTypes ?? Array(5).fill('ai')
  const setType = (i, type) => {
    const next = [...types]
    next[i] = type
    set({ starterTypes: next })
  }

  return (
    <div className={styles.formBody}>
      <div className={localStyles.card}>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Product Knowledge Base</label>
          <select className={styles.formSelect}>
            <option>My product catalog</option>
            <option>Electronics catalog</option>
          </select>
          <p className={localStyles.hint}>
            Used by the AI to create conversation starters and responses, based on your product catalog content.
          </p>
        </div>

        <div className={styles.formSection}>
          <label className={styles.formLabel}>
            Header
            <span style={{ float: 'right', fontWeight: 600, color: 'var(--color-content-primary)', fontSize: 10 }}>
              {s.labelHeader.length}/80
            </span>
          </label>
          <input
            className={styles.formInput}
            type="text"
            value={s.labelHeader}
            onChange={e => set({ labelHeader: e.target.value })}
            maxLength={80}
          />
        </div>

        <div className={localStyles.countRow}>
          <div className={localStyles.countBlock}>
            <label className={styles.formLabel}>Number of conversation starters for desktop</label>
            <Segmented values={[2, 3, 4, 5]} value={starterCount} onChange={setStarterCount} />
          </div>
          <div className={localStyles.countBlock}>
            <label className={styles.formLabel}>Number of conversation starters for mobile</label>
            <Segmented values={[2, 3, 4]} value={mobileStarterCount} onChange={setMobileStarterCount} />
          </div>
        </div>

        <p className={localStyles.aiDesc}>
          <strong>AI generates (✦)</strong> conversation starters by default to help you <strong>engage faster</strong>
          —but you can also create your <strong>own manually (✎)</strong> with 50 characters max.
        </p>

        <div className={localStyles.startersList}>
          {Array.from({ length: starterCount }).map((_, i) => (
            <StarterRow
              key={i}
              type={types[i] ?? 'ai'}
              onTypeChange={(t) => setType(i, t)}
              question={s.labelStarters[i] ?? ''}
              onQuestionChange={(v) => {
                const next = [...s.labelStarters]
                next[i] = v
                set({ labelStarters: next })
              }}
            />
          ))}
        </div>

        <div className={styles.formSection}>
          <label className={styles.formLabel}>
            Label for button
            <span style={{ float: 'right', fontWeight: 600, color: 'var(--color-content-primary)', fontSize: 10 }}>
              {s.labelCta.length}/30
            </span>
          </label>
          <input
            className={styles.formInput}
            type="text"
            value={s.labelCta}
            onChange={e => set({ labelCta: e.target.value })}
            maxLength={30}
          />
        </div>
      </div>

      {/* Advanced settings collapse */}
      <button
        type="button"
        className={localStyles.advancedToggle}
        onClick={() => setAdvancedOpen(v => !v)}
      >
        Advanced settings
        <svg
          className={advancedOpen ? localStyles.chevOpen : ''}
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M2 4l3 3 3-3"/>
        </svg>
      </button>

      {advancedOpen && (
        <div className={localStyles.card}>
          <h3 className={localStyles.cardTitle}>Advanced settings</h3>
          <div className={styles.formSection}>
            <label className={styles.formLabel} style={{ textTransform: 'none', letterSpacing: 0 }}>
              Forbidden words or phrases
            </label>
            <textarea
              className={localStyles.textarea}
              placeholder="e.g.,&#10;Discount&#10;Price"
              value={forbidden}
              onChange={e => setForbidden(e.target.value)}
              rows={4}
            />
            <p className={localStyles.hint}>
              Write one word or phrase per line.<br />
              The AI won't use any of them in conversation starter questions.
            </p>
          </div>
          <div className={localStyles.clue}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="var(--color-info-text)" strokeWidth="1.2"/>
              <path d="M8 7v4M8 5v.5" stroke="var(--color-info-text)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p>This list applies to all your conversation starters. Editing it here will update every engagement.</p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Segmented control (count selector) ──────────────────────────── */
function Segmented({ values, value, onChange }) {
  return (
    <div className={localStyles.segmented}>
      {values.map(v => (
        <button
          key={v}
          type="button"
          className={`${localStyles.segBtn} ${value === v ? localStyles.segBtnActive : ''}`}
          onClick={() => onChange(v)}
        >
          {v}
        </button>
      ))}
    </div>
  )
}

/* ── Starter row with AI/Manual type dropdown ─────────────────────── */
function StarterRow({ type, onTypeChange, question, onQuestionChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  const isAI = type === 'ai'

  return (
    <div className={localStyles.starterRow}>
      <div className={localStyles.typeWrap} ref={ref}>
        <button
          type="button"
          className={localStyles.typePill}
          onClick={() => setOpen(v => !v)}
        >
          {isAI ? (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1l1.4 4.6L14 7l-4.6 1.4L8 13l-1.4-4.6L2 7l4.6-1.4L8 1z" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M2 14l1.5-1.5L11 5l2 2-7.5 7.5L4 16z"/>
              <path d="M9.5 6.5l2 2"/>
            </svg>
          )}
          {isAI ? 'AI question' : 'Manual question'}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M2 4l3 3 3-3"/>
          </svg>
        </button>
        {open && (
          <div className={localStyles.typeDropdown}>
            <button
              type="button"
              className={`${localStyles.typeOption} ${isAI ? localStyles.typeOptionActive : ''}`}
              onClick={() => { onTypeChange('ai'); setOpen(false) }}
            >
              <div className={localStyles.typeOptionTitle}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1l1.4 4.6L14 7l-4.6 1.4L8 13l-1.4-4.6L2 7l4.6-1.4L8 1z" fill="currentColor"/>
                </svg>
                AI question
                {isAI && (
                  <svg className={localStyles.typeCheck} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M3 7l3 3 5-6"/>
                  </svg>
                )}
              </div>
              <div className={localStyles.typeOptionDesc}>
                Question generated by AI based on the knowledge sources
              </div>
            </button>
            <button
              type="button"
              className={`${localStyles.typeOption} ${!isAI ? localStyles.typeOptionActive : ''}`}
              onClick={() => { onTypeChange('manual'); setOpen(false) }}
            >
              <div className={localStyles.typeOptionTitle}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 14l1.5-1.5L11 5l2 2-7.5 7.5L4 16z"/>
                  <path d="M9.5 6.5l2 2"/>
                </svg>
                Manual question
                {!isAI && (
                  <svg className={localStyles.typeCheck} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M3 7l3 3 5-6"/>
                  </svg>
                )}
              </div>
              <div className={localStyles.typeOptionDesc}>
                Write your own question to display across pages matching your selected conditions.
              </div>
            </button>
          </div>
        )}
      </div>

      {isAI ? (
        <div className={localStyles.questionPill}>{question}</div>
      ) : (
        <input
          className={localStyles.questionInput}
          type="text"
          value={question}
          onChange={e => onQuestionChange(e.target.value)}
          maxLength={50}
          placeholder="Type your question"
        />
      )}
    </div>
  )
}

/* ── Classic ──────────────────────────────────────────────────────── */
function ClassicContent({ s, set }) {
  return (
    <div className={styles.formBody}>
      <div className={localStyles.card}>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Agent routing</label>
          <select className={styles.formSelect}>
            <option>My agents</option>
            <option>Sales team</option>
          </select>
        </div>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Header</label>
          <input
            className={styles.formInput}
            type="text"
            value={s.classicHeader}
            onChange={e => set({ classicHeader: e.target.value })}
            maxLength={60}
          />
        </div>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Message</label>
          <textarea
            className={localStyles.textarea}
            value={s.classicBody}
            onChange={e => set({ classicBody: e.target.value })}
            maxLength={240}
            rows={3}
          />
        </div>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Label for button</label>
          <input
            className={styles.formInput}
            type="text"
            value={s.classicCta}
            onChange={e => set({ classicCta: e.target.value })}
            maxLength={36}
          />
        </div>
      </div>
    </div>
  )
}

/* ── Messaging ────────────────────────────────────────────────────── */
function MessagingContent({ s, set }) {
  return (
    <div className={styles.formBody}>
      <div className={localStyles.card}>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Agent routing</label>
          <select className={styles.formSelect}>
            <option>My agents</option>
            <option>Sales team</option>
          </select>
        </div>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Message</label>
          <textarea
            className={localStyles.textarea}
            value={s.messageText}
            onChange={e => set({ messageText: e.target.value })}
            maxLength={240}
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}

/* ── Badge (no content) ──────────────────────────────────────────── */
function BadgeContent() {
  return (
    <div className={styles.formBody}>
      <div className={localStyles.card}>
        <p className={styles.formHint}>
          The Badge widget is a minimalist avatar with no content configuration.
          Adjust its appearance in the Style tab.
        </p>
      </div>
    </div>
  )
}

/* ── Custom ──────────────────────────────────────────────────────── */
function CustomContent({ s, set }) {
  return (
    <div className={styles.formBody}>
      <div className={localStyles.card}>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Button label</label>
          <input
            className={styles.formInput}
            type="text"
            value={s.customLabel}
            onChange={e => set({ customLabel: e.target.value })}
            maxLength={36}
          />
        </div>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>CSS Selector</label>
          <p className={styles.formHint}>
            Enter the CSS selectors your engineering team configured for the three states of your fixed button:
            available, busy, or disconnected agents.
          </p>
        </div>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Selector — available agents</label>
          <input className={styles.formInput} type="text" defaultValue=".custom-btn.available" />
        </div>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Selector — busy agents</label>
          <input className={styles.formInput} type="text" defaultValue=".custom-btn.busy" />
        </div>
        <div className={styles.formSection}>
          <label className={styles.formLabel}>Selector — disconnected agents</label>
          <input className={styles.formInput} type="text" defaultValue=".custom-btn.disconnected" />
        </div>
      </div>
    </div>
  )
}
