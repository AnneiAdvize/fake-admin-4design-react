import { useState, Fragment } from 'react'
import styles from './ConversationDetail.module.css'

export default function ConversationDetail({ conversation, onClose, onAction }) {
  if (!conversation) return null
  return (
    <AnswerAnalysisSidebar
      variant={conversation.variant}
      onClose={onClose}
    />
  )
}

/* ── Answer analysis sidebar ── */
function AnswerAnalysisSidebar({ variant, onClose }) {
  const [expandedKcards, setExpandedKcards] = useState(new Set())

  function toggleKcard(id) {
    setExpandedKcards(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className={styles.analysisSidebar}>
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarTitle}>Answer analysis</span>
        <button className={styles.sidebarClose} onClick={onClose} title="Close">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className={styles.sidebarBody}>
        {variant === 'faq-answer' && <VariantFaqAnswer expandedKcards={expandedKcards} toggleKcard={toggleKcard} />}
        {variant === 'hallucination' && <VariantHallucination expandedKcards={expandedKcards} toggleKcard={toggleKcard} />}
        {variant === 'missing-knowledge' && <VariantMissingKnowledge />}
        {variant === 'product-answer' && <VariantProductAnswer />}
        {variant === 'product-reco' && <VariantProductReco />}
      </div>
    </div>
  )
}

function SectionTitle({ icon, children }) {
  return (
    <div className={styles.sidebarSectionTitle}>
      <span className={styles.sidebarSectionIcon}>{icon}</span>
      {children}
    </div>
  )
}

const IcoInterpretation = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M9 1L3 9h5.5L7 15l7-9H8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
  </svg>
)

const IcoKnowledge = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="2" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M2 6v7a1 1 0 001 1h10a1 1 0 001-1V6" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M6 9h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

const IcoBehaviors = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-8 10a8 8 0 0112.38-6.68c-.24-.1-.512-.105-.76-.005L9.504 8.95a1.5 1.5 0 00-.94.94L6.064 16.63a1.5 1.5 0 00.048 1.12A8.007 8.007 0 014 12zm2.653 5.95A8 8 0 0020 12a8 8 0 00-2.08-5.38c.1.24.105.511.005.758l-2.86 7.083a1.5 1.5 0 01-.94.94l-7.13 2.888a1.5 1.5 0 01-.342.05zM10.24 11.65l2.107 2.112-3.543 1.435 1.435-3.547z" fill="currentColor"/>
  </svg>
)

const IcoProduct = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5 6h6M5 8.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

function KCard({ title, content, tags, editBtn, expandId, expandedKcards, toggleKcard, children }) {
  const isExpanded = expandedKcards?.has(expandId)
  return (
    <div className={styles.kcard}>
      {children}
      {title && <div className={styles.kcardTitle}>{title}</div>}
      {content && (
        <>
          <div className={`${styles.kcardContent} ${isExpanded ? styles.kcardContentExpanded : ''}`}>{content}</div>
          {expandId && (
            <button className={styles.kcardViewMore} onClick={() => toggleKcard(expandId)}>
              {isExpanded ? 'View less' : 'View more'}
            </button>
          )}
        </>
      )}
      {(tags || editBtn !== false) && (
        <div className={styles.kcardFooter}>
          <div className={styles.kcardTags}>
            {tags?.map((t, i) => <span key={i} className={`${styles.tag} ${styles[t.cls]}`}>{t.label}</span>)}
          </div>
          {editBtn !== false && (
            <button className={styles.btnSmOutline}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M8 1l3 3-6 6H2V7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function CustomBehaviorCard({ title, content }) {
  return (
    <div className={styles.kcard}>
      <div className={styles.kcardTitle}>{title}</div>
      <div className={styles.kcardContent} style={{ WebkitLineClamp: 'unset', display: 'block', overflow: 'visible' }}>{content}</div>
      <div className={styles.kcardFooter}>
        <div />
        <button className={styles.btnSmOutline}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M8 1l3 3-6 6H2V7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
          Edit
        </button>
      </div>
    </div>
  )
}

const FAQ_TAGS = [
  { label: 'Useful content', cls: 'tagNeutral' },
  { label: 'My FAQ', cls: 'tagInfo' },
]

function VariantFaqAnswer({ expandedKcards, toggleKcard }) {
  return (
    <>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoInterpretation}>Interpretation</SectionTitle>
        <p className={styles.interpText}>
          Your visitor wanted to <strong>know if the Barista Creations Chiaro capsules were compatible with their Original Line machine</strong>, and which format to choose for home lattes.
        </p>
      </div>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarSectionHd}>
          <SectionTitle icon={IcoKnowledge}>Used knowledge</SectionTitle>
          <button className={styles.btnSmOutline}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Add
          </button>
        </div>
        <div className={styles.knowledgeSubSec}>
          <KCard title="Do the Barista Creations capsules work with Original Line machines?" content="Yes — all Barista Creations capsules are compatible with Original Line machines. They are designed to work with the standard espresso extraction system used across the Original range." tags={FAQ_TAGS} expandId="faq-k1" expandedKcards={expandedKcards} toggleKcard={toggleKcard} />
          <KCard title="What are the best capsules for milk-based drinks?" content="For lattes and cappuccinos, we recommend the Barista Creations range: Chiaro (Intensity 6) for a lighter latte, Scuro (Intensity 8) for a bolder taste, and Corto (Intensity 11) for a ristretto-style base. All are optimised to blend perfectly with hot or cold milk, creating a velvety texture without bitterness." tags={FAQ_TAGS} expandId="faq-k2" expandedKcards={expandedKcards} toggleKcard={toggleKcard} />
          <button className={styles.viewAllLink}>View all knowledge used (+4)</button>
        </div>
      </div>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoBehaviors}>Custom behaviors</SectionTitle>
        <CustomBehaviorCard title="If the visitor asks about machine compatibility" content="Always confirm the machine line (Original vs. Vertuo) before suggesting capsules" />
      </div>
    </>
  )
}

function VariantHallucination({ expandedKcards, toggleKcard }) {
  return (
    <>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoInterpretation}>Interpretation</SectionTitle>
        <p className={styles.interpText}>The visitor ordered Chiaro capsules and wanted to <strong>know when the 10% promotional discount would be applied to their basket</strong>.</p>
        <div className={styles.halluAlert}>
          <div className={styles.halluTitle}>The assistant detected a risk of hallucination</div>
          <div className={styles.halluText}>The "apply within 24 hours" delay mentioned in the response is not in your knowledge base. The assistant generated this information.</div>
          <a className={styles.halluLink} href="#">See rejected answer</a>
        </div>
        <div className={styles.infoBanner}>
          <svg className={styles.infoBannerIcon} width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#2A78A8" strokeWidth="1.3"/><path d="M8 5v1M8 7.5v4" stroke="#2A78A8" strokeWidth="1.4" strokeLinecap="round"/></svg>
          <span className={styles.infoBannerText}>We are working to improve this behavior so that the correct parts of the response can still be used.</span>
        </div>
      </div>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarSectionHd}>
          <SectionTitle icon={IcoKnowledge}>Used knowledge</SectionTitle>
          <button className={styles.btnSmOutline}><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> Add</button>
        </div>
        <div className={styles.knowledgeSubSec}>
          <KCard title="Current promotions — 5+ boxes discount" content="Order 5 or more boxes of any Barista Creations capsules and receive 10% off your total. The discount is automatically applied at checkout with no promo code required." tags={FAQ_TAGS} expandId="hallu-k1" expandedKcards={expandedKcards} toggleKcard={toggleKcard} />
          <KCard title="What happens after receiving my returned package?" content="After receiving the package, the product is checked and the return is validated. After approval, the refund is activated within the standard processing window. No specific delay is guaranteed beyond the statutory maximum." tags={FAQ_TAGS} expandId="hallu-k2" expandedKcards={expandedKcards} toggleKcard={toggleKcard} />
        </div>
      </div>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoBehaviors}>Custom behaviors</SectionTitle>
        <CustomBehaviorCard title="If the automatic no-reply message is triggered" content="Transfer to a human agent" />
      </div>
    </>
  )
}

function VariantMissingKnowledge() {
  return (
    <>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoInterpretation}>Interpretation</SectionTitle>
        <div className={styles.interpText}>The AI assistant answered <strong>without any matching knowledge content</strong>. No FAQ entry or document was used to generate this response.</div>
      </div>
      <div className={styles.missingWarning}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><path d="M8 2L14.5 13.5H1.5L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M8 6.5v3M8 11v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
        <span className={styles.missingWarningText}>Missing knowledge — the bot answered without any grounded source</span>
      </div>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoKnowledge}>Used knowledge</SectionTitle>
        <div className={styles.knowledgeSubSec}>
          <div className={styles.missingEmptyNotice}>No knowledge content matched this conversation.</div>
          <div className={styles.missingActionText}>You can <a className={styles.missingActionLink} href="#">add new knowledge content</a> to cover this topic and prevent ungrounded answers.</div>
        </div>
      </div>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoBehaviors}>Custom behaviors</SectionTitle>
        <CustomBehaviorCard title="If the automatic no-reply message is triggered" content="Transfer to a human agent" />
      </div>
    </>
  )
}

function VariantProductAnswer() {
  return (
    <>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoInterpretation}>Interpretation</SectionTitle>
        <div className={styles.interpText}>The AI assistant identified <strong>1 matching product</strong> in the catalog and shared its details with the visitor.</div>
      </div>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoProduct}>Used product</SectionTitle>
        <div className={styles.knowledgeSubSec}>
          <div className={styles.kcard}>
            <div className={styles.matchBadgeRow}><span className={`${styles.tag} ${styles.tagSuccess}`}>Full match</span></div>
            <div className={styles.productRow}>
              <div className={styles.productThumb} style={{ background: 'linear-gradient(135deg,#E8C5A0,#C8956A)' }} />
              <div className={styles.productInfo}>
                <div className={styles.productName}>Roma</div>
                <div className={styles.productMeta}><span>SKU: OL-ROMA-10</span><span className={styles.productSep} /><span>£4.30</span><span className={styles.productSep} /><span className={styles.productStock}>218 in stock</span></div>
              </div>
            </div>
            <div className={styles.kcardFooter}>
              <div style={{ fontSize: '11px', color: 'var(--color-content-secondary)' }}>Intensity 8 · Original Line</div>
              <button className={styles.btnSmOutline}><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M7 1h4v4M11 1L5 7M9 7v4H1V3h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> See in catalog</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoBehaviors}>Custom behaviors</SectionTitle>
        <CustomBehaviorCard title="If the automatic no-reply message is triggered" content="Transfer to a human agent" />
      </div>
    </>
  )
}

function VariantProductReco() {
  const products = [
    { name: 'Ristretto Decaffeinato', meta: 'Intensity 10 · £4.30 · 87 in stock', bg: 'linear-gradient(135deg,#3D2B1F,#6B3A2A)', match: 'full' },
    { name: 'Roma', meta: 'Intensity 8 · £4.30 · 218 in stock', bg: 'linear-gradient(135deg,#E8C5A0,#C8956A)', match: 'full' },
    { name: 'Volluto', meta: 'Intensity 4 · £4.30 · 154 in stock', bg: 'linear-gradient(135deg,#F5E6C8,#D4B896)', match: 'partial' },
  ]
  return (
    <>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoInterpretation}>Interpretation</SectionTitle>
        <div className={styles.interpText}>The AI assistant recommended <strong>3 products</strong> from the catalog based on the visitor's request, with match scoring.</div>
      </div>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoProduct}>Product matches</SectionTitle>
        <div className={styles.knowledgeSubSec}>
          {products.map(p => (
            <div key={p.name} className={styles.kcard}>
              <div className={styles.matchBadgeRow}><span className={`${styles.tag} ${p.match === 'full' ? styles.tagSuccess : styles.tagWarning}`}>{p.match === 'full' ? 'Full match' : 'Partial match'}</span></div>
              <div className={styles.productRow}>
                <div className={styles.productThumb} style={{ background: p.bg }} />
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{p.name}</div>
                  <div className={styles.productMeta}>{p.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.sidebarSection}>
        <SectionTitle icon={IcoBehaviors}>Custom behaviors</SectionTitle>
        <CustomBehaviorCard title="If the automatic no-reply message is triggered" content="Transfer to a human agent" />
      </div>
    </>
  )
}
