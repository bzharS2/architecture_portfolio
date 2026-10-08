import { motion } from 'framer-motion'
import BlueprintBackground from '../../components/BlueprintBackground.jsx'
import NavigationBoxes from '../../components/NavigationBoxes.jsx'

export default function Home({ onSelect }) {
  return (
    <motion.main className="home-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.42 }}>
      <BlueprintBackground />
      <header className="home-header">
        <div className="brand-mark"><span>ME</span><i /></div>
        <div className="home-brand">
          <span>MIRA ELLERY</span>
          <small>ARCHITECTURE / 2026</small>
        </div>
        <div className="header-location">NEW YORK, NY <i /> PORTFOLIO Nº 01</div>
      </header>
      <div className="home-intro">
        <span className="eyebrow">ARCHITECTURAL PORTFOLIO · SELECTED WORK 2022—26</span>
        <h1>Spaces for<br /><em>the in-between.</em></h1>
        <p>A study of place, material and the everyday.</p>
        <div className="intro-rule"><span>40°43′ N / 73°59′ W</span><i /><span>MOVE THROUGH THE DRAWING</span></div>
      </div>
      <NavigationBoxes onSelect={onSelect} />
      <footer className="home-footer">
        <span>DESIGN & ARCHITECTURE / ME</span>
        <span>ISSUED 07.26 &nbsp;—&nbsp; REV. 01</span>
        <span>SCROLL / SELECT A DRAWING <b>↘</b></span>
      </footer>
      <div className="home-stamp">A—01</div>
    </motion.main>
  )
}
