import { motion } from 'framer-motion'
import { publications } from '../data/content'
import SectionShell from './SectionShell'
import { fadeUp, staggerContainer, cardHoverLift, easeSmooth } from '../utils/motion'

const statusStyles: Record<string, string> = {
  'Research manuscript': 'bg-amber-900/30 text-amber-200 border-amber-700/40',
  Presentation: 'bg-[#2a3441] text-[#7eb8c9] border-[#3d5a6e]/40',
}

const Publications = () => (
  <SectionShell
    id="publications"
    title="Publications & Presentations"
    subtitle="Research manuscripts and presentations."
  >
    <motion.ul
      className="space-y-4"
      variants={staggerContainer(0.1, 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {publications.map((item, index) => (
        <motion.li
          key={item.title}
          className="p-6 bg-[#2a2a2a] rounded-xl border border-white/10 transition-colors hover:border-[#6b8e23]/25"
          variants={{ ...fadeUp, ...cardHoverLift }}
          whileHover="hover"
          initial="rest"
          transition={{ delay: index * 0.1, ease: easeSmooth }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full border ${statusStyles[item.status]}`}
            >
              {item.status}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wider">{item.venue}</span>
          </div>
          <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
          <p className="text-gray-300 font-light">{item.detail}</p>
          {item.note && <p className="text-sm text-gray-400 mt-2 italic">{item.note}</p>}
        </motion.li>
      ))}
    </motion.ul>
  </SectionShell>
)

export default Publications
