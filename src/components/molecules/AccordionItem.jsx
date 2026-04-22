import { useState } from 'react'
import styles from './AccordionItem.module.css'

export default function AccordionItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
      <button className={styles.trigger} onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className={styles.question}>{question}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="14" height="14" viewBox="0 0 16 16" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        >
          <path d="M4 6l4 4 4-4"/>
        </svg>
      </button>
      {open && <div className={styles.answer}>{answer}</div>}
    </div>
  )
}
