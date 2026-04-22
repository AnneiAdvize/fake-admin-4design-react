import styles from './BuilderTemplate.module.css'
import Button from '../atoms/Button'

export default function BuilderTemplate({ configPanel, previewPanel, onSave, onCancel, isSaving, footerSlot, previewWidth }) {
  const footer = footerSlot !== undefined ? footerSlot : (
    <>
      <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      <Button variant="primary" onClick={onSave} loading={isSaving}>Save</Button>
    </>
  )

  return (
    <div className={styles.layout} style={previewWidth ? { gridTemplateColumns: `1fr ${previewWidth}` } : undefined}>
      <aside className={styles.configPanel}>
        <div className={styles.configContent}>
          {configPanel}
        </div>
        {footer && <footer className={styles.actionBar}>{footer}</footer>}
      </aside>
      <main className={styles.previewPanel}>
        {previewPanel}
      </main>
    </div>
  )
}
