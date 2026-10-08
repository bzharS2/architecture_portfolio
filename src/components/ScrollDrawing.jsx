import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArchitecturalScene from './ArchitecturalScene.jsx'

gsap.registerPlugin(ScrollTrigger)

const drawingStages = [
  { index: 0, start: 0, duration: 0.2 },
  { index: 1, start: 0.16, duration: 0.27 },
  { index: 2, start: 0.39, duration: 0.26 },
  { index: 5, start: 0.56, duration: 0.2 },
  { index: 3, start: 0.66, duration: 0.23 },
  { index: 4, start: 0.82, duration: 0.18 },
]

export default function ScrollDrawing({ experienceRef }) {
  const sceneRef = useRef(null)
  const lastStage = useRef(-1)
  const [stageIndex, setStageIndex] = useState(0)
  const drawingLabels = ['OUTLINE', 'PEDESTAL', 'FIGURE', 'HAND + TORCH', 'DETAIL', 'COMPLETE']
  const stageThresholds = [0.16, 0.39, 0.56, 0.73, 0.91]

  useEffect(() => {
    const experience = experienceRef.current
    const scene = sceneRef.current
    if (!experience || !scene) return undefined

    const roughOutline = gsap.utils.toArray('.liberty-rough-outline path', scene)
    const paths = gsap.utils.toArray('.liberty-rough-outline path, [data-draw-path]', scene)
    const guides = gsap.utils.toArray('[data-draw-guide] path', scene)
    const lettering = gsap.utils.toArray('[data-draw-text]', scene)
    const faceFill = gsap.utils.toArray('[data-draw-face-fill]', scene)
    const pathLengths = paths.map((path) => path.getTotalLength())
    paths.forEach((path, index) => {
      path.style.strokeDasharray = `${pathLengths[index]} ${pathLengths[index]}`
      path.style.strokeDashoffset = pathLengths[index]
    })
    gsap.set(lettering, { opacity: 0 })
    gsap.set(faceFill, { fillOpacity: 0 })

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'none' } })
      timeline.to(roughOutline, { strokeDashoffset: 0, duration: 0.2 }, 0)
      drawingStages.forEach(({ index: stageIndex, start, duration }) => {
        const stagePaths = paths.filter((path) => Number(path.parentElement.dataset.drawStage) === stageIndex)
        const stagger = Math.min(0.018, (duration / Math.max(1, stagePaths.length - 1)) * 0.45)
        stagePaths.forEach((path, pathIndex) => {
          timeline.to(path, {
            strokeDashoffset: 0,
            duration: duration - stagger * (stagePaths.length - 1),
          }, start + stagger * pathIndex)
        })
        if (stageIndex === 1) {
          timeline.to(guides, { opacity: 0.16, duration: 0.1 }, start)
        }
      })

      ScrollTrigger.create({
        trigger: experience,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        animation: timeline,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          scene.style.setProperty('--progress', progress)
          gsap.set(lettering, { opacity: gsap.utils.clamp(0, 1, (progress - 0.56) / 0.1) })
          gsap.set(faceFill, { fillOpacity: gsap.utils.clamp(0, 0.9, (progress - 0.4) / 0.12 * 0.9) })
          const illustration = scene.querySelector('.architectural-scene')
          illustration?.style.setProperty('--progress', progress)
          illustration?.style.setProperty('--camera-scale', gsap.utils.interpolate(0.98, 1.04, progress))
          illustration?.style.setProperty('--camera-x', `${gsap.utils.interpolate(0, -1.2, progress)}%`)
          const readout = scene.querySelector('.blueprint-progress')
          if (readout) readout.textContent = `${Math.round(progress * 100).toString().padStart(2, '0')}% / DRAWING`
          const nextStage = stageThresholds.findIndex((threshold) => progress < threshold)
          const activeStage = nextStage === -1 ? drawingLabels.length - 1 : nextStage
          if (lastStage.current !== activeStage) {
            lastStage.current = activeStage
            setStageIndex(activeStage)
          }
        },
      })
    }, experience)

    ScrollTrigger.refresh()
    return () => {
      context.revert()
      lastStage.current = -1
    }
  }, [experienceRef])

  return (
    <div className="blueprint-stage" ref={sceneRef}>
      <ArchitecturalScene />
      <span className="blueprint-stage-note">SCROLL TO REVEAL ↓</span>
      <span className="blueprint-stage-label">{`0${stageIndex + 1} / ${drawingLabels[stageIndex]}`}</span>
    </div>
  )
}
