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
    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6b8e23] mb-3">{title}</h3>
    <div className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">{children}</div>
  </AnimatedCard>
)

const Research = () => (
  <SectionShell
    id="research"
    title="Research"
    subtitle="Thesis case study: speech emotion recognition with speaker-aware evaluation and honest reporting of validation vs. held-out test performance."
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatedCard className="p-5 sm:p-6 bg-[#243040] rounded-xl border border-[#3d5a6e]/30" delay={0.1}>
          <p className="text-xs uppercase tracking-wider text-[#7eb8c9] mb-1">Peak validation accuracy</p>
          <motion.p
            className="text-3xl font-light text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {thesisCaseStudy.results.peakValidation}
          </motion.p>
          <p className="text-xs text-gray-400 mt-2">Speaker-aware validation split</p>
        </AnimatedCard>
        <AnimatedCard className="p-5 sm:p-6 bg-[#243040] rounded-xl border border-[#3d5a6e]/30" delay={0.15}>
          <p className="text-xs uppercase tracking-wider text-[#7eb8c9] mb-1">Held-out mixed-test accuracy</p>
          <motion.p
            className="text-3xl font-light text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {thesisCaseStudy.results.heldOutMixedTest}
          </motion.p>
          <p className="text-xs text-gray-400 mt-2">Separate held-out evaluation</p>
        </AnimatedCard>
      </div>

      <CaseBlock title="Error analysis" delay={0.1}>
        <ul className="space-y-2">
          {thesisCaseStudy.errorAnalysis.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[#6b8e23] shrink-0">•</span>
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
              <span className="text-[#6b8e23]">•</span>
              <span>{step.label}</span>
              <StatusBadge>{step.status}</StatusBadge>
            </li>
          ))}
        </ul>
      </CaseBlock>

      <motion.figure
        className="rounded-xl overflow-hidden border border-white/10 bg-[#2a2a2a]"
        variants={scaleIn}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={thesisCaseStudy.image}
          alt={thesisCaseStudy.imageAlt}
          className="w-full max-h-[420px] object-contain bg-[#1e1e1e] transition-opacity duration-300 hover:opacity-95"
          loading="lazy"
        />
        <figcaption className="p-4 text-sm text-gray-400 border-t border-white/10">
          {thesisCaseStudy.figurePlaceholder}
        </figcaption>
      </motion.figure>
    </motion.div>
  </SectionShell>
)

export default Research
