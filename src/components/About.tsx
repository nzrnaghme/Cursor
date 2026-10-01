import { motion } from 'framer-motion'
import { education, identity } from '../data/content'
import SectionShell from './SectionShell'
import SkillsTechnologies from './SkillsTechnologies'
import AnimatedCard from './AnimatedCard'
import { fadeUp, staggerContainer } from '../utils/motion'

const About = () => (
  <SectionShell id="about" title="About" subtitle={identity.extendedBio}>
    <motion.div
      className="space-y-8"
      variants={staggerContainer(0.1, 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <motion.div variants={fadeUp}>
        <AnimatedCard className="p-6 bg-[#2a2a2a] rounded-xl border border-white/10 text-gray-300 font-light leading-relaxed" hover={false}>
          <p>{identity.bio}</p>
        </AnimatedCard>
      </motion.div>

      <motion.div variants={fadeUp}>
        <h3 className="text-xl font-light text-white mb-4">Education</h3>
        <div className="space-y-4">
          {education.map((entry, index) => (
            <AnimatedCard
              key={entry.degree}
              className="p-6 bg-[#2a2a2a] rounded-xl border border-white/10 hover:border-[#6b8e23]/25"
              delay={index * 0.08}
            >
              <div className="flex flex-wrap justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-lg font-medium text-white">{entry.degree}</h4>
                  <p className="text-[#a9c66c] text-sm">{entry.school}</p>
                </div>
                <span className="text-sm text-gray-400">{entry.dates}</span>
              </div>
              <ul className="mt-3 space-y-1 text-gray-300 text-sm">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="text-[#a9c66c] shrink-0">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
                {'advisor' in entry && entry.advisor && (
                  <li className="flex gap-2">
                    <span className="text-[#a9c66c] shrink-0">•</span>
                    <span>
                      Advisor:{' '}
                      <a
                        href={entry.advisorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#a9c66c] hover:underline"
                      >
                        {entry.advisor}
                      </a>
                    </span>
                  </li>
                )}
              </ul>
            </AnimatedCard>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="p-6 sm:p-8 bg-[#1e1e1e] rounded-xl border border-white/10">
          <SkillsTechnologies />
        </div>
      </motion.div>
    </motion.div>
  </SectionShell>
)

export default About
