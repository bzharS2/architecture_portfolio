import { motion } from 'framer-motion'

const previews = {
  about: (
    <svg viewBox="0 0 180 100" aria-hidden="true">
      <path d="M20 78h142M38 77V50l35-24 36 24v27M43 51h60M54 78V56h38v22M70 77V62h9v15M117 77V42h28v35M114 42h34M117 49h28M130 49v28" />
      <path d="M22 77c4-13 8-17 12 0m111 0c3-18 8-22 13 0M28 77l-7-10m7 10 8-13m104 13-4-12m4 12 8-10" />
      <circle cx="116" cy="65" r="2" /><path d="M116 67v7m0-5-3 3m3-3 3 2" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 180 100" aria-hidden="true">
      <path d="M28 77V37h47v40M75 37l22-13 42 16v37H75M97 24v53M75 50h69M40 48h22v20H40zM104 47h12v11h-12zM123 46h14v13h-14z" />
      <path d="M20 81h135M33 32V21h34v11M89 22l8-5 51 19M22 88h130M32 85v6m110-6v6" />
      <path d="M91 81v-8h12v8m25-1c3-15 8-16 12 0" />
    </svg>
  ),
  skills: (
    <svg viewBox="0 0 180 100" aria-hidden="true">
      <path d="M34 79V31l47-13 48 14v47M34 31l48 14 47-13M82 45v34M34 55l48 14 47-14M48 35v17m15-13v18m31-8v18m18-23v19M26 84h111M81 16v68M28 56l56-16 51 16" />
      <circle cx="82" cy="45" r="3" /><circle cx="34" cy="31" r="2" /><circle cx="129" cy="32" r="2" />
      <path d="M145 30h16m-16 8h10M145 46h16m-16 8h10" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 180 100" aria-hidden="true">
      <path d="M36 79V37l53-20 55 20v42M28 80h125M36 38l53 20 55-20M89 58v21M61 48v31h19V56m39-9v18h17V42M88 79V61h24v18" />
      <path d="M47 33V20h27v23m53-8v-9h12v14M26 87h132M40 84v7m102-7v7" />
      <circle cx="106" cy="70" r="1.5" />
    </svg>
  ),
}

export default function SectionBox({ section, index, onSelect }) {
  return (
    <motion.button
      className={`section-box section-box--${section.id}`}
      onClick={(event) => onSelect(section, event.currentTarget.getBoundingClientRect())}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.48 + index * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.035, transition: { duration: 0.28 } }}
      whileTap={{ scale: 0.99 }}
      aria-label={`Open ${section.title}`}
    >
      <div className="box-topline">
        <span>{section.number} / {section.kicker}</span>
        <span className="box-coordinates">40°43′N</span>
      </div>
      <div className="box-heading">
        <h2>{section.title}</h2>
        <span className="box-arrow" aria-hidden="true">↗</span>
      </div>
      <div className="box-preview">
        {previews[section.id]}
        <span className="preview-index">FIG. 0{index + 1}</span>
        <span className="preview-scale">N ↑ &nbsp; 1:100</span>
      </div>
      <div className="box-foot">
        <span>{section.code}</span>
        <span className="box-explore">EXPLORE <b>→</b></span>
      </div>
      <span className="box-corner box-corner--tl" />
      <span className="box-corner box-corner--br" />
    </motion.button>
  )
}
