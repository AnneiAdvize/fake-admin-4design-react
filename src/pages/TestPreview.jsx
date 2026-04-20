import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import styles from './TestPreview.module.css'

export default function TestPreview() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [url, setUrl] = useState(searchParams.get('url') || '')
  const [iframeSrc, setIframeSrc] = useState(searchParams.get('url') || '')
  const returnTo = searchParams.get('returnTo') || '/engagement/builder'

  const handleGo = () => {
    let target = url.trim()
    if (!target) return
    if (!/^https?:\/\//i.test(target)) target = 'https://' + target
    setIframeSrc(target)
  }

  return (
    <div className={styles.root}>
      <div className={styles.banner}>
        <div className={styles.bannerLogo}>
          <svg viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="2"/>
            <path d="M10 7v1M10 11v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className={styles.bannerUrlWrap}>
          <input
            className={styles.bannerUrlInput}
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGo()}
            placeholder="Enter URL..."
          />
          <button className={styles.bannerGo} onClick={handleGo} title="Navigate">
            <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </button>
        </div>
        <div className={styles.bannerActions}>
          <button className={styles.bannerBtn} onClick={() => navigate(returnTo)}>Quit</button>
          <button className={styles.bannerBtn}>View guidelines</button>
        </div>
      </div>
      <iframe className={styles.iframe} src={iframeSrc} title="Website preview" />
    </div>
  )
}
