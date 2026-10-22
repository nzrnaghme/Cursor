import { motion } from 'framer-motion'
import { researchDirections } from '../data/content'
import SectionShell from './SectionShell'
import { fadeUp, staggerContainer, easeSmooth } from '../utils/motion'

const ResearchDirections = () => (
  <SectionShell
    id="directions"
    title="PhD Research Agenda"
    subtitle="Questions I hope to pursue in doctoral research, informed by my independent exploration of agent security and my completed work in speech ML."
    className="bg-gradient-to-b from-[#1a1a1a] to-[#252525]"
  >
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      variants={staggerContainer(0.1, 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {researchDirections.map((track, index) => (
        <motion.article
          key={track.title}
          className="p-6 bg-[#2a2a2a] rounded-xl border border-white/10 h-full"
          variants={fadeUp}
          transition={{ delay: index * 0.1, ease: easeSmooth }}
        >
          <h3 className="text-lg font-medium text-white mb-4">{track.title}</h3>
          <ul className="space-y-2 text-gray-300 font-light text-sm">
            {track.items.map((item) => (
              <li
                key={item}
                className="flex gap-2"
              >
                <span className="text-[#a9c66c] shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </motion.div>
  </SectionShell>
)

export default ResearchDirections
