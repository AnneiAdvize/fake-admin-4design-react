import { useNavigate } from 'react-router-dom'
import styles from './KnowledgeCatalog.module.css'

const PRODUCTS = [
  { title: 'Double Flower Ring - Gold',          date: '12/11/2023', id: 'RNG-DFG-001', group: 'RNG-FLOWER', desc: 'Elegant double flower ring in gold-plated recycled brass. Adjustable size, suitable for most finger sizes. Tarnish-resistant coating.', link: 'kiabi.fr/bijoux/bague-double-fleur-or', price: '19,99 €' },
  { title: 'Gold Recycled Brass Ring',            date: '12/11/2023', id: 'RNG-GRB-002', group: 'RNG-BRASS',  desc: 'Minimalist ring crafted from 100% recycled brass with a warm gold finish. Thin band, stackable design. Eco-conscious jewellery.', link: 'kiabi.fr/bijoux/bague-laiton-recycle-or', price: '14,99 €' },
  { title: 'Flower Ring - Violet',                date: '12/10/2023', id: 'RNG-FLV-003', group: 'RNG-FLOWER', desc: 'Delicate flower-shaped ring with violet enamel petals and silver-tone base. A feminine statement piece for everyday wear.', link: 'kiabi.fr/bijoux/bague-fleur-violet', price: '12,99 €' },
  { title: 'Ornate Stone Ring',                   date: '12/09/2023', id: 'RNG-OST-004', group: 'RNG-STONE',  desc: 'Statement ring with ornate filigree setting and a semi-precious stone centre. Available in multiple stone colours. Gold-plated finish.', link: 'kiabi.fr/bijoux/bague-pierre-ornee', price: '24,99 €' },
  { title: 'Natural Stone Ring',                  date: '12/08/2023', id: 'RNG-NST-005', group: 'RNG-STONE',  desc: 'Simple band with a natural raw stone setting. Each piece is unique due to the organic nature of the stone. Hypoallergenic metal base.', link: 'kiabi.fr/bijoux/bague-pierre-naturelle', price: '17,99 €' },
  { title: 'Rhinestone and Enamel Ring',           date: '12/07/2023', id: 'RNG-RNE-006', group: 'RNG-ENAMEL', desc: 'Cocktail ring combining sparkling rhinestones with pastel enamel inlays. Bold design perfect for special occasions. Silver-tone setting.', link: 'kiabi.fr/bijoux/bague-strass-email', price: '15,99 €' },
  { title: 'Twisted Rope Ring - Silver',           date: '12/06/2023', id: 'RNG-TRS-007', group: 'RNG-SILVER', desc: 'Classic twisted rope-pattern ring in sterling silver tone. Versatile everyday accessory that pairs well with other band rings.', link: 'kiabi.fr/bijoux/bague-torsade-argent', price: '11,99 €' },
  { title: 'Pearl Cluster Ring',                   date: '12/05/2023', id: 'RNG-PCL-008', group: 'RNG-PEARL',  desc: 'Elegant cluster ring featuring faux freshwater pearls in a dome arrangement. Gold-tone base, adds a sophisticated touch to any outfit.', link: 'kiabi.fr/bijoux/bague-grappe-perles', price: '16,99 €' },
  { title: 'Signet Ring - Engraved Initials',      date: '12/04/2023', id: 'RNG-SIG-009', group: 'RNG-SIGNET', desc: 'Personalised signet ring with engraved initials plate. Available in gold and silver tones. A timeless gift option, adjustable band.', link: 'kiabi.fr/bijoux/chevaliere-initiales', price: '22,99 €' },
]

export default function KnowledgeCatalog() {
  const navigate = useNavigate()

  return (
    <div>
      <div className={styles.explorerBar}>
        <button className={styles.backBtn} title="Back to Knowledge" onClick={() => navigate('/knowledge')}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M10 3L5 8l5 5"/>
          </svg>
        </button>
        <h1 className={styles.explorerTitle}>Product catalog export</h1>
        <div className={styles.explorerBarRight}>
          <div className={styles.explorerSearch}>
            <span className={styles.searchIcon}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="6" cy="6" r="4"/><path d="M9 9l2.5 2.5" strokeLinecap="round"/>
              </svg>
            </span>
            <input type="text" placeholder="Search" />
          </div>
          <span className={styles.countBadge}>320 products</span>
          <span className={styles.importDate}>Last import: 12/12/2023</span>
        </div>
      </div>

      <div className={styles.catalogSection}>
        <div className={styles.catalogScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={`${styles.th} ${styles.colTitle}`}>Title <span className={styles.sortArrow}>↕</span></th>
                <th className={`${styles.th} ${styles.colChanges}`}>Latest changes <span className={styles.sortArrow}>↕</span></th>
                <th className={`${styles.th} ${styles.colId}`}>ID <span className={styles.sortArrow}>↕</span></th>
                <th className={`${styles.th} ${styles.colGroup}`}>Item group ID <span className={styles.sortArrow}>↕</span></th>
                <th className={`${styles.th} ${styles.colDesc}`}>Description <span className={styles.sortArrow}>↕</span></th>
                <th className={`${styles.th} ${styles.colLink}`}>Link <span className={styles.sortArrow}>↕</span></th>
                <th className={`${styles.th} ${styles.colAvail}`}>Availability <span className={styles.sortArrow}>↕</span></th>
                <th className={`${styles.th} ${styles.colPrice}`}>Price <span className={styles.sortArrow}>↕</span></th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p, i) => (
                <tr key={i} className={styles.tr}>
                  <td className={`${styles.td} ${styles.tdTitle}`}>
                    {p.title}
                    <div><span className={styles.detailsBadge}>Product details</span></div>
                  </td>
                  <td className={styles.td}>{p.date}</td>
                  <td className={styles.td}>{p.id}</td>
                  <td className={styles.td}>{p.group}</td>
                  <td className={styles.td}><span className={styles.descText}>{p.desc}</span></td>
                  <td className={styles.td}><a href="#" className={styles.catalogLink}>{p.link}</a></td>
                  <td className={styles.td}><span className={styles.availBadge}>in stock</span></td>
                  <td className={styles.td}>{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
