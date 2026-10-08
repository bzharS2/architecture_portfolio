import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Home from './sections/Home/Home.jsx'
import SectionPage from './sections/SectionPage.jsx'
import PageTransition from './components/PageTransition.jsx'

export default function App() {
  const [activeSection, setActiveSection] = useState(null)
  const [transitioningTo, setTransitioningTo] = useState(null)

  const enterSection = (section, bounds) => {
    if (transitioningTo || activeSection) return
    setTransitioningTo({ section, bounds })
  }

  const completeTransition = () => {
    setActiveSection(transitioningTo.section)
    setTransitioningTo(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const returnHome = () => {
    setActiveSection(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {activeSection ? (
          <SectionPage key={activeSection.id} section={activeSection} onBack={returnHome} />
        ) : (
          <Home key="home" onSelect={enterSection} />
        )}
      </AnimatePresence>
      <PageTransition section={transitioningTo?.section} bounds={transitioningTo?.bounds} onComplete={completeTransition} />
    </>
  )
}
