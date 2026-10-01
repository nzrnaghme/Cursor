import { motion } from 'framer-motion'
import { experience } from '../data/content'
import SectionShell from './SectionShell'
import { fadeUp, staggerContainer, cardHoverLift, easeSmooth } from '../utils/motion'

const Experience = () => (
  <SectionShell
    id="experience"
    title="Experience"
    subtitle="Professional software engineering roles that support reproducible implementation, APIs, real-time features, and maintainable systems."
    className="bg-gradient-to-b from-[#252525] to-[#1a1a1a]"
  >
    <motion.div
      className="space-y-6"
      variants={staggerContainer(0.12, 0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {experience.map((role, index) => (
        <motion.article
          key={role.id}
          className="p-6 bg-[#2a2a2a] rounded-xl border border-white/10 flex flex-col sm:flex-row gap-6 transition-colors hover:border-[#6b8e23]/25"
          variants={{ ...fadeUp, ...cardHoverLift }}
          whileHover="hover"
          initial="rest"
          transition={{ delay: index * 0.1, ease: easeSmooth }}
        >
          {role.image && (
            <motion.img
              src={role.image}
              alt={role.imageAlt}
              className="w-full sm:w-32 h-24 object-cover rounded-lg opacity-80 shrink-0"
              loading="lazy"
              whileHover={{ scale: 1.03, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xl font-medium text-white">{role.title}</h3>
                <p className="text-[#a9c66c] text-sm">
                  {role.company} · {role.location}
                </p>
              </div>
              <span className="text-sm text-gray-400 shrink-0">{role.dates}</span>
            </div>
            <p className="text-gray-300 font-light text-sm mb-3">{role.description}</p>
            <ul className="space-y-1 text-sm text-gray-400">
              {role.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-[#a9c66c]">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            {'link' in role && role.link && (
              <motion.a
                href={role.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-[#a9c66c] hover:underline"
                whileHover={{ x: 4 }}
              >
                Visit {role.company} →
              </motion.a>
            )}
          </div>
        </motion.article>
      ))}
    </motion.div>
  </SectionShell>
)

export default Experience
