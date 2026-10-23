import { motion } from 'framer-motion'
import { identity, publications } from '../data/content'
import SectionShell from './SectionShell'
import { fadeUp, staggerContainer, easeSmooth } from '../utils/motion'

const statusStyles: Record<string, string> = {
  Thesis: 'bg-[#29361f] text-[#bddb80] border-[#6b8e23]/45',
  Presentation: 'bg-[#2a3441] text-[#7eb8c9] border-[#3d5a6e]/40',
}

const Publications = () => (
  <SectionShell
    id="publications"
    title="Research Outputs & Presentations"
    subtitle="Completed academic work and materials available for faculty review."
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
          className="p-6 bg-[#2a2a2a] rounded-xl border border-white/10"
          variants={fadeUp}
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
          {'manuscript' in item && item.manuscript && (
            <p className="text-sm text-gray-300 mt-2">{item.manuscript}</p>
          )}
          {item.note && <p className="text-sm text-gray-400 mt-2 italic">{item.note}</p>}
          <a
            href={`mailto:${identity.email}?subject=${encodeURIComponent(`Request: ${item.title}`)}`}
            className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[#bddb80] hover:text-white underline decoration-[#6b8e23] underline-offset-4 rounded-sm"
          >
            Request materials
          </a>
        </motion.li>
      ))}
    </motion.ul>
  </SectionShell>
)

export default Publications
