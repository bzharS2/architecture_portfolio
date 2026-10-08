import SectionBox from './SectionBox.jsx'
import { navigation } from '../data/navigation.js'

export default function NavigationBoxes({ onSelect }) {
  return (
    <div className="navigation-composition">
      {navigation.map((section, index) => (
        <SectionBox key={section.id} section={section} index={index} onSelect={onSelect} />
      ))}
    </div>
  )
}
