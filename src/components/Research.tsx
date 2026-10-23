import { motion } from 'framer-motion'
import { agentSecurityResearch, thesisCaseStudy } from '../data/content'
import SectionShell from './SectionShell'
import { fadeUp, staggerContainer } from '../utils/motion'

const StatusBadge = ({ children, tone = 'blue' }: { children: string; tone?: 'blue' | 'green' | 'amber' }) => {
  const tones = {
    blue: 'bg-[#263747] text-[#9fd1df] border-[#4f7182]/50',
    green: 'bg-[#29361f] text-[#bddb80] border-[#6b8e23]/45',
    amber: 'bg-amber-950/40 text-amber-200 border-amber-700/40',
  }

  return (
    <span className={`inline-flex px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] rounded-full border ${tones[tone]}`}>
      {children}
    </span>
  )
}

const EvidenceBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="p-5 rounded-lg border border-white/10 bg-white/[0.025]">
    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a9c66c] mb-2">{title}</h4>
    <div className="text-gray-200 leading-relaxed">{children}</div>
  </div>
)

const Research = () => (
  <SectionShell
    id="research"
    title="Research Experience"
    subtitle="My completed M.S. thesis examined speech emotion recognition with a ResNet-inspired model and explicit reporting of evaluation limits."
    className="bg-gradient-to-b from-[#15212d] to-[#1a1a1a]"
  >
    <motion.div
      className="space-y-10"
      variants={staggerContainer(0.08, 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <motion.article
        id="speech-ml"
        className="scroll-mt-28 rounded-2xl border border-white/10 bg-[#232323] p-6 sm:p-8"
        variants={fadeUp}
        aria-labelledby="speech-research-title"
      >
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <StatusBadge tone="green">M.S. thesis · completed</StatusBadge>
          <StatusBadge>{thesisCaseStudy.status}</StatusBadge>
        </div>

        <h3 id="speech-research-title" className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-white max-w-[820px]">
          {thesisCaseStudy.title}
        </h3>
        <p className="mt-4 text-gray-200 leading-relaxed max-w-[820px]">{thesisCaseStudy.question}</p>

        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7" aria-label="Speech emotion recognition results">
          <div className="p-5 rounded-lg bg-[#18212a] border border-[#4f7182]/35">
            <dt className="text-xs uppercase tracking-[0.14em] text-gray-400">Validation accuracy</dt>
            <dd className="mt-2 text-3xl font-semibold text-white">80.36%</dd>
          </div>
          <div className="p-5 rounded-lg bg-[#18212a] border border-[#4f7182]/35">
            <dt className="text-xs uppercase tracking-[0.14em] text-gray-400">Held-out mixed test</dt>
            <dd className="mt-2 text-3xl font-semibold text-white">74.4%</dd>
          </div>
          <div className="p-5 rounded-lg bg-[#18212a] border border-[#4f7182]/35">
            <dt className="text-xs uppercase tracking-[0.14em] text-gray-400">Output labels</dt>
            <dd className="mt-2 text-3xl font-semibold text-white">4</dd>
          </div>
        </dl>
        <p className="mt-3 text-sm text-gray-400 leading-relaxed">
          These figures describe the current split and held-out mixed test set; they do not establish speaker-independent or cross-corpus generalization.
        </p>

        <details className="group mt-5 rounded-lg border border-white/10 bg-white/[0.025]">
          <summary className="cursor-pointer min-h-11 px-5 py-4 text-sm font-semibold text-[#bddb80] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a9c66c]">
            Review methodology, limitations, diagram & next steps
          </summary>
          <div className="px-5 pb-5 border-t border-white/10 pt-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <EvidenceBlock title="Data">{thesisCaseStudy.data.summary}</EvidenceBlock>
              <EvidenceBlock title="Model">{thesisCaseStudy.model}</EvidenceBlock>
              <EvidenceBlock title="Training">{thesisCaseStudy.training}</EvidenceBlock>
              <EvidenceBlock title="Evaluation">{thesisCaseStudy.evaluation}</EvidenceBlock>
              <EvidenceBlock title="Evaluation questions">
                <ul className="space-y-2">
                  {thesisCaseStudy.errorAnalysis.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#a9c66c]" aria-hidden>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </EvidenceBlock>
              <EvidenceBlock title="Limitations">
                <ul className="space-y-2">
                  {thesisCaseStudy.limitations.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-amber-300/90" aria-hidden>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </EvidenceBlock>
            </div>

            <div className="mt-4 p-5 rounded-lg border border-white/10 text-gray-200 leading-relaxed">
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a9c66c] mb-2">Prototype & next steps</h4>
              <p>{thesisCaseStudy.prototype}</p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {thesisCaseStudy.nextSteps.map((step) => (
                  <li key={step.label} className="flex gap-2">
                    <span className="text-[#a9c66c]" aria-hidden>•</span>
                    <span>{step.label} <span className="text-gray-400">({step.status})</span></span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-400">{thesisCaseStudy.codeAvailability}</p>
            </div>

            <figure className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e]">
              <a href={thesisCaseStudy.image} target="_blank" rel="noopener noreferrer" aria-label="Open full-size speech emotion recognition pipeline diagram">
                <img
                  src={thesisCaseStudy.image}
                  alt={thesisCaseStudy.imageAlt}
                  width="1100"
                  height="300"
                  className="w-full aspect-[11/3] object-contain"
                  loading="lazy"
                />
              </a>
              <figcaption className="p-4 text-sm text-gray-400 border-t border-white/10">
                {thesisCaseStudy.figureCaption} Open for the full-size diagram.
              </figcaption>
            </figure>
          </div>
        </details>
      </motion.article>

      <motion.article
        id="agent-security-research"
        className="scroll-mt-28 rounded-2xl border border-white/10 bg-[#232323] p-6 sm:p-8"
        variants={fadeUp}
        aria-labelledby="agent-security-research-title"
      >
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <StatusBadge tone="amber">{agentSecurityResearch.status}</StatusBadge>
        </div>
        <h3 id="agent-security-research-title" className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-white max-w-[820px]">
          {agentSecurityResearch.title}
        </h3>
        <p className="mt-4 text-gray-200 leading-relaxed max-w-[900px]">
          {agentSecurityResearch.text}
        </p>
      </motion.article>
    </motion.div>
  </SectionShell>
)

export default Research
