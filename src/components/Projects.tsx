import { motion } from 'framer-motion'
import { projects, type ProjectStatus } from '../data/content'
import SectionShell from './SectionShell'
import { fadeUp, staggerContainer } from '../utils/motion'

const statusColors: Record<ProjectStatus, string> = {
  Research: 'bg-[#2a3441] text-[#7eb8c9] border-[#3d5a6e]/40',
  Prototype: 'bg-amber-900/30 text-amber-200 border-amber-700/40',
  'Software Project': 'bg-[#2a2a2a] text-gray-300 border-white/20',
}

const Projects = () => (
  <SectionShell
    id="projects"
    title="Selected Engineering Work"
    subtitle="Selected systems that reflect my experience building practical ML and software workflows."
    className="bg-gradient-to-b from-[#1a1a1a] to-[#252525]"
  >
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      variants={staggerContainer(0.12, 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {projects.slice(0, 2).map((project, index) => (
        <motion.article
          key={project.id}
          className="flex flex-col bg-[#2a2a2a] rounded-xl border border-white/10 overflow-hidden"
          variants={fadeUp}
          custom={index}
          transition={{ delay: index * 0.08 }}
        >
          {project.image && (
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={project.imageAlt}
                className="w-full h-44 object-cover opacity-70"
                loading="lazy"
              />
            </div>
          )}
          <div className="p-6 flex flex-col flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`text-xs uppercase tracking-wider px-2 py-1 rounded border ${statusColors[project.status]}`}
              >
                {project.status}
              </span>
              <span className="text-xs text-gray-400">{project.year}</span>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{project.title}</h3>
            <p className="text-sm text-gray-300 mb-4 flex-1 leading-relaxed">{project.description}</p>
            <dl className="text-xs text-gray-400 space-y-2 mb-4">
              <div>
                <dt className="text-gray-400 uppercase tracking-wider mb-0.5">Problem</dt>
                <dd>{project.problem}</dd>
              </div>
              <div>
                <dt className="text-gray-400 uppercase tracking-wider mb-0.5">Contribution</dt>
                <dd>{project.contribution}</dd>
              </div>
              <div>
                <dt className="text-gray-400 uppercase tracking-wider mb-0.5">Stack</dt>
                <dd>{project.stack}</dd>
              </div>
            </dl>
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#a9c66c] mt-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b8e23] rounded-sm w-fit inline-flex items-center gap-1"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {project.linkLabel} →
              </motion.a>
            )}
          </div>
        </motion.article>
      ))}
    </motion.div>
  </SectionShell>
)

export default Projects
