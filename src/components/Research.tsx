import { motion } from 'framer-motion'
import { thesisCaseStudy } from '../data/content'
import SectionShell from './SectionShell'
import AnimatedCard from './AnimatedCard'
import { fadeUp, scaleIn, staggerContainer } from '../utils/motion'

const StatusBadge = ({ children }: { children: string }) => (
  <motion.span
    className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full bg-[#2a3441] text-[#7eb8c9] border border-[#3d5a6e]/40"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.span>
)

const CaseBlock = ({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) => (
  <AnimatedCard
    className="p-5 sm:p-6 bg-[#2a2a2a] rounded-xl border border-white/10 transition-colors hover:border-[#6b8e23]/30"
    delay={delay}
  >
    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a9c66c] mb-3">{title}</h3>
    <div className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">{children}</div>
  </AnimatedCard>
)

const Research = () => (
  <SectionShell
    id="research"
    title="Research"
    subtitle="Speech emotion recognition with residual neural networks, from audio preprocessing to reproducible evaluation."
    className="bg-gradient-to-b from-[#1a2332] to-[#1a1a1a]"
  >
    <motion.div
      className="space-y-6"
      variants={staggerContainer(0.07, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.div className="flex flex-wrap items-center gap-3" variants={fadeUp}>
        <StatusBadge>Research</StatusBadge>
        <StatusBadge>{thesisCaseStudy.status}</StatusBadge>
      </motion.div>

      <motion.h3
        className="text-xl sm:text-2xl font-light text-white leading-snug"
        variants={fadeUp}
      >
        {thesisCaseStudy.title}
      </motion.h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CaseBlock title="Question" delay={0.05}>{thesisCaseStudy.question}</CaseBlock>
        <CaseBlock title="Data" delay={0.1}>{thesisCaseStudy.data.summary}</CaseBlock>
        <CaseBlock title="Model" delay={0.15}>{thesisCaseStudy.model}</CaseBlock>
        <CaseBlock title="Training" delay={0.2}>{thesisCaseStudy.training}</CaseBlock>
      </div>

      <CaseBlock title="Evaluation" delay={0.1}>{thesisCaseStudy.evaluation}</CaseBlock>

      <CaseBlock title="Evaluation questions" delay={0.1}>
        <ul className="space-y-2">
          {thesisCaseStudy.errorAnalysis.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[#a9c66c] shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CaseBlock>

      <CaseBlock title="Prototype" delay={0.12}>{thesisCaseStudy.prototype}</CaseBlock>

      <CaseBlock title="Limitations" delay={0.14}>
        <ul className="space-y-2">
          {thesisCaseStudy.limitations.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-amber-400/80 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CaseBlock>

      <CaseBlock title="Next steps (planned / future work)" delay={0.16}>
        <ul className="space-y-3">
          {thesisCaseStudy.nextSteps.map((step) => (
            <li key={step.label} className="flex flex-wrap items-center gap-2">
              <span className="text-[#a9c66c]">•</span>
              <span>{step.label}</span>
              <StatusBadge>{step.status}</StatusBadge>
            </li>
          ))}
        </ul>
      </CaseBlock>

      <CaseBlock title="Code availability" delay={0.18}>{thesisCaseStudy.codeAvailability}</CaseBlock>

      <motion.figure
        className="rounded-xl overflow-hidden border border-white/10 bg-[#2a2a2a]"
        variants={scaleIn}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <a href={thesisCaseStudy.image} target="_blank" rel="noopener noreferrer" aria-label="Open full-size speech emotion recognition pipeline diagram">
        <img
          src={thesisCaseStudy.image}
          alt={thesisCaseStudy.imageAlt}
          className="w-full max-h-[420px] object-contain bg-[#1e1e1e] transition-opacity duration-300 hover:opacity-95"
          loading="lazy"
        />
        </a>
        <figcaption className="p-4 text-sm text-gray-400 border-t border-white/10">
          {thesisCaseStudy.figureCaption} Open the image for the full-size diagram.
        </figcaption>
      </motion.figure>
    </motion.div>
  </SectionShell>
)

export default Research
