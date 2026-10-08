import { AnimatePresence, motion } from 'framer-motion'

export default function PageTransition({ section, bounds, onComplete }) {
  const initialClip = bounds
    ? `inset(${bounds.top}px ${window.innerWidth - bounds.right}px ${window.innerHeight - bounds.bottom}px ${bounds.left}px round 1px)`
    : 'inset(37% 36% 37% 36% round 1px)'

  return (
    <AnimatePresence>
      {section && (
        <motion.div
          className="page-transition"
          key={section.id}
          variants={{
            zoomInFromBounds: { clipPath: initialClip, opacity: 1, backgroundColor: '#071a2d' },
            zoomIn: {
              clipPath: ['inset(-4% -4% -4% -4% round 0px)', 'inset(-4% -4% -4% -4% round 0px)'],
              backgroundColor: ['#071a2d', '#092a50', '#063e7a'],
              transition: {
                duration: 1.35,
                ease: [0.76, 0, 0.24, 1],
                clipPath: { duration: 1.05, ease: [0.76, 0, 0.24, 1] },
                backgroundColor: { duration: 1.35, times: [0, 0.48, 1], ease: 'linear' },
              },
            },
            fadeOut: { opacity: 0 },
          }}
          initial="zoomInFromBounds"
          animate="zoomIn"
          exit="fadeOut"
          transition={{ duration: 0.4, ease: 'linear' }}
          onAnimationComplete={(animation) => {
            if (animation === 'zoomIn') onComplete()
          }}
        >
          <div className="transition-blueprint">
            <span>{section.number} / {section.kicker}</span>
            <strong>{section.title}</strong>
            <span className="transition-drawing-note">REFERENCE STUDY / ORIGINAL LINEWORK</span>
            <span>MOSSLINE ATELIER · PORTFOLIO 01</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
