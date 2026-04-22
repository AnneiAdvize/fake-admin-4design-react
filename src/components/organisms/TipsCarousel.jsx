import { useState } from 'react'
import styles from './TipsCarousel.module.css'

export default function TipsCarousel({ tips = [] }) {
  const [current, setCurrent] = useState(0)

  function prev() { setCurrent(i => (i - 1 + tips.length) % tips.length) }
  function next() { setCurrent(i => (i + 1) % tips.length) }

  if (!tips.length) return null
  const tip = tips[current]

  return (
    <div className={styles.carousel}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.title}>Optimize your Copilot</span>
          <span className={styles.counter}>— Tip {current + 1}/{tips.length}</span>
        </div>
      </div>
      <div className={styles.body}>
        <button className={styles.arrow} onClick={prev} style={{ left: 'var(--sp-4)' }}>‹</button>
        <div className={styles.tipContent}>
          {tip.title && <div className={styles.tipTitle}>{tip.title}</div>}
          {tip.content}
        </div>
        <button className={styles.arrow} onClick={next} style={{ right: 'var(--sp-4)' }}>›</button>
      </div>
      <div className={styles.dots}>
        {tips.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Tip ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
