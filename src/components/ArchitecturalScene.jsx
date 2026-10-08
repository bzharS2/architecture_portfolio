import LibertyBlueprint from './LibertyBlueprint.jsx'

export default function ArchitecturalScene() {
  return (
    <div className="architectural-scene">
      <div className="blueprint-image-stack">
        <LibertyBlueprint />
      </div>
      <div className="scene-coordinate scene-coordinate--top">LIBERTY STUDY / ELEVATION</div>
      <div className="scene-coordinate scene-coordinate--side">STATUE + PEDESTAL / 1886</div>
      <span className="blueprint-progress">00% / DRAWING</span>
    </div>
  )
}
