import Badge from '../atoms/Badge'

const VARIANT_MAP = {
  active:   'success',
  inactive: 'neutral',
  pending:  'warning',
  error:    'danger',
  online:   'success',
  offline:  'neutral',
}

export default function StatusBadge({ status, label }) {
  const variant = VARIANT_MAP[status?.toLowerCase()] ?? 'neutral'
  return <Badge variant={variant} label={label ?? status} />
}
