import SettingsSection from '../components/organisms/SettingsSection'

export default function Settings({ section = 'pagetypes' }) {
  return (
    <div>
      <SettingsSection section={section} />
    </div>
  )
}
