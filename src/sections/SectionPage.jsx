import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { chapters } from '../data/content.js'
import { contact } from '../data/contact.js'
import { projects } from '../data/projects.js'
import { skills } from '../data/skills.js'
import ScrollDrawing from '../components/ScrollDrawing.jsx'
import ProjectBlueprint from '../components/ProjectBlueprint.jsx'

function ChapterDetail({ chapter }) {
  const { id } = chapter
  if (id === 'projects') {
    return (
      <div className="chapter-projects">
        {projects.map((project) => (
          <article className="chapter-project" key={project.number}>
            <div className="project-drawing">
              <ProjectBlueprint type={project.drawing} />
            </div>
            <div className="chapter-project-copy">
              <span className="chapter-kicker">{project.number} / {project.type}</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <span className="chapter-project-meta">{project.studio} &nbsp;·&nbsp; {project.location} &nbsp;·&nbsp; {project.year}</span>
            </div>
          </article>
        ))}
      </div>
    )
  }

  if (id === 'skills') {
    return (
      <div className="chapter-skills">
        {skills.map((skill, index) => (
          <div className="chapter-skill" key={skill.number}>
            <span>{skill.number}</span>
            <b>{skill.title}</b>
            <i style={{ '--skill-line': `${38 + ((index * 17) % 43)}%` }} />
          </div>
        ))}
      </div>
    )
  }

  if (id === 'contact') {
    return (
      <div className="chapter-contact">
        <a href={`mailto:${contact.email}`}>{contact.email} <span>↗</span></a>
        {contact.links.map((link) => (
          <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label} <span>↗</span></a>
        ))}
        <span className="chapter-contact-meta">{contact.studio}<br />{contact.location}<br />{contact.availability}</span>
      </div>
    )
  }

  return (
    <div className="chapter-about-details">
      {chapter.details.map((detail) => (
        <div className="chapter-about-detail" key={detail.label}>
          <span>{detail.label}</span>
          <strong>{detail.description}</strong>
        </div>
      ))}
    </div>
  )
}

export default function SectionPage({ section, onBack }) {
  const experienceRef = useRef(null)

  useLayoutEffect(() => {
    const target = document.getElementById(section.id)
    if (!target) return
    const headerHeight = document.querySelector('.experience-header')?.getBoundingClientRect().height ?? 68
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - headerHeight,
      behavior: 'instant',
    })
  }, [section.id])

  return (
    <motion.main className="section-page experience-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.48 }}>
      <header className="section-header experience-header">
        <button className="back-to-board" onClick={onBack} aria-label="Return to the portfolio board"><span>←</span><b>PORTFOLIO BOARD</b></button>
        <span className="section-header-title">{contact.name.toUpperCase()} <i /> ARCHITECTURE / 2026</span>
        <nav className="chapter-nav" aria-label="Portfolio sections">
          {chapters.map((chapter) => (
            <a key={chapter.id} href={`#${chapter.id}`}>{chapter.number} <span>{chapter.title}</span></a>
          ))}
        </nav>
      </header>
      <div className="experience-canvas" ref={experienceRef}>
        <ScrollDrawing experienceRef={experienceRef} />
        {chapters.map((chapter) => (
          <section className={`experience-chapter experience-chapter--${chapter.id}`} id={chapter.id} key={chapter.id}>
            <div className="chapter-copy">
              <span className="chapter-eyebrow">{chapter.eyebrow}</span>
              <h1>{chapter.heading}</h1>
              {chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {chapter.quote && <blockquote>“{chapter.quote}”</blockquote>}
              {chapter.note && <span className="chapter-note">{chapter.note}</span>}
              <ChapterDetail chapter={chapter} />
            </div>
            <span className="chapter-index">{chapter.number} <i /> 04</span>
          </section>
        ))}
        <footer className="experience-footer">
          <span>END OF PRESENTATION · LIBERTY STUDY SERIES</span>
          <span>DRAWN & COMPOSED BY {contact.name.toUpperCase()}</span>
          <button onClick={onBack}>RETURN TO THE BOARD ↑</button>
        </footer>
      </div>
    </motion.main>
  )
}
