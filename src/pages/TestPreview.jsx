import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import styles from './TestPreview.module.css'

export default function TestPreview() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [url, setUrl] = useState(searchParams.get('url') || '')
  const [iframeSrc, setIframeSrc] = useState(searchParams.get('url') || '')
  const returnTo = searchParams.get('returnTo') || '/engagement/builder'
  const pickerMode = searchParams.get('picker') === '1'

  // Picker state: selected HTML element selector + insertion position.
  const [htmlElement, setHtmlElement] = useState('')
  const [position, setPosition] = useState('after')

  const handleGo = () => {
    let target = url.trim()
    if (!target) return
    if (!/^https?:\/\//i.test(target)) target = 'https://' + target
    setIframeSrc(target)
  }

  // When the user clicks the overlay, populate the HTML Element input with a
  // plausible selector. In a real implementation we'd inspect the iframe's DOM,
  // but this is cross-origin so we generate a mock selector from click coords.
  const handleOverlayClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.round(e.clientX - rect.left)
    const y = Math.round(e.clientY - rect.top)
    setHtmlElement(`#element-at-${x}-${y}`)
  }

  const handleValidate = () => {
    if (!pickerMode) return
    const params = new URLSearchParams()
    if (htmlElement.trim()) params.set('html_element', htmlElement.trim())
    params.set('position', position)
    navigate(`${returnTo}?${params.toString()}`)
  }

  return (
    <div className={styles.root}>
      {pickerMode ? (
        <PickerBanner
          htmlElement={htmlElement}
          setHtmlElement={setHtmlElement}
          position={position}
          setPosition={setPosition}
          onCancel={() => navigate(returnTo)}
          onValidate={handleValidate}
        />
      ) : (
        <TestBanner
          url={url}
          setUrl={setUrl}
          onGo={handleGo}
          onQuit={() => navigate(returnTo)}
        />
      )}

      <iframe
        className={`${styles.iframe} ${pickerMode ? styles.iframePicker : ''}`}
        src={iframeSrc}
        title="Website preview"
      />

      {pickerMode && (
        <div className={styles.pickerOverlay} onClick={handleOverlayClick} />
      )}
    </div>
  )
}

/* ── Test banner (URL input + Quit + View guidelines) ─────────────── */
function TestBanner({ url, setUrl, onGo, onQuit }) {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerLeft}>
        <div className={styles.bannerLogo}>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="4.5" fill="#0B3B37"/>
          </svg>
        </div>
        <div className={styles.bannerUrlWrap}>
          <input
            className={styles.bannerUrlInput}
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onGo()}
            placeholder="Enter URL..."
          />
          <button className={styles.bannerGo} onClick={onGo} title="Navigate">
            <svg viewBox="0 0 20 20" fill="none" stroke="#0B3B37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 10h12M10 4l6 6-6 6"/>
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.bannerActions}>
        <button className={styles.bannerBtn} onClick={onQuit}>Quit</button>
        <button className={`${styles.bannerBtn} ${styles.bannerBtnPrimary}`}>View guidelines</button>
      </div>
    </div>
  )
}

/* ── Picker banner (HTML Element + position radios + Cancel/Validate) */
function PickerBanner({ htmlElement, setHtmlElement, position, setPosition, onCancel, onValidate }) {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerLeft}>
        <div className={styles.bannerLogo}>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="4.5" fill="#0B3B37"/>
          </svg>
        </div>
        <input
          className={styles.pickerInput}
          type="text"
          value={htmlElement}
          onChange={e => setHtmlElement(e.target.value)}
          placeholder="HTML Element"
        />
        <div className={styles.pickerPositionBlock}>
          <span className={styles.pickerPositionLabel}>Position relative to selected reference</span>
          <div className={styles.pickerRadios}>
            {['before', 'inside', 'after'].map(p => (
              <label key={p} className={styles.pickerRadio}>
                <input
                  type="radio"
                  name="picker-position"
                  checked={position === p}
                  onChange={() => setPosition(p)}
                />
                <span className={`${styles.pickerRadioDot} ${position === p ? styles.pickerRadioDotOn : ''}`}>
                  {position === p && <span className={styles.pickerRadioInner} />}
                </span>
                <span className={styles.pickerRadioLabel}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bannerActions}>
        <button className={styles.bannerBtn} onClick={onCancel}>Cancel</button>
        <button className={styles.pickerValidate} onClick={onValidate}>Validate</button>
      </div>
    </div>
  )
}
