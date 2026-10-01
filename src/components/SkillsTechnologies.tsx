import { useRef, useState, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillGroups } from '../data/content'
import { fadeUp, staggerContainer, easeSmooth } from '../utils/motion'

type SkillIconMeta = { icon: string; color?: string }

/** Simple Icons slugs — https://simpleicons.org */
const skillIconMap: Record<string, SkillIconMeta> = {
  Python: { icon: 'python', color: '3776AB' },
  TensorFlow: { icon: 'tensorflow', color: 'FF6F00' },
  Keras: { icon: 'keras', color: 'D00000' },
  'scikit-learn': { icon: 'scikitlearn', color: 'F7931E' },
  NumPy: { icon: 'numpy', color: '013243' },
  Pandas: { icon: 'pandas', color: '150458' },
  CNNs: { icon: 'pytorch', color: 'EE4C2C' },
  ResNet: { icon: 'pytorch', color: 'EE4C2C' },
  'GRU/RNN': { icon: 'pytorch', color: 'EE4C2C' },
  Evaluation: { icon: 'googlecolab', color: 'F9AB00' },
  'Audio preprocessing': { icon: 'audacity', color: '0000CC' },
  'Mel-spectrograms': { icon: 'python', color: '3776AB' },
  MFCCs: { icon: 'numpy', color: '013243' },
  'Time-frequency analysis': { icon: 'scipy', color: '8CAAE6' },
  NLP: { icon: 'huggingface', color: 'FFD21E' },
  'Topic modeling': { icon: 'python', color: '3776AB' },
  SciPy: { icon: 'scipy', color: '8CAAE6' },
  Librosa: { icon: 'python', color: '3776AB' },
  Jupyter: { icon: 'jupyter', color: 'F37626' },
  'Google Colab': { icon: 'googlecolab', color: 'F9AB00' },
  Git: { icon: 'git', color: 'F05032' },
  Linux: { icon: 'linux', color: 'FCC624' },
  'C++': { icon: 'cplusplus', color: '00599C' },
  JavaScript: { icon: 'javascript', color: 'F7DF1E' },
  TypeScript: { icon: 'typescript', color: '3178C6' },
  React: { icon: 'react', color: '61DAFB' },
  'Vue.js': { icon: 'vuedotjs', color: '4FC08D' },
  'Node.js': { icon: 'nodedotjs', color: '339933' },
  'REST APIs': { icon: 'openapiinitiative', color: '6BA539' },
  'Real-time inference': { icon: 'docker', color: '2496ED' },
  'SoC coursework': { icon: 'intel', color: '0071C5' },
  'FPGA/SoC familiarity (not deployed)': { icon: 'amd', color: 'ED1C24' },
}

const iconUrl = (icon: string, color?: string) =>
  `https://cdn.simpleicons.org/${icon}/${color ?? 'FFFFFF'}`

const SkillIcon = ({ name }: { name: string }) => {
  const [failed, setFailed] = useState(false)
  const meta = skillIconMap[name]

  if (!meta || failed) {
    return (
      <span
        className="w-6 h-6 shrink-0 rounded-md bg-[#6b8e23]/20 text-[#a9c66c] text-[10px] font-bold flex items-center justify-center"
        aria-hidden
      >
        {name.charAt(0)}
      </span>
    )
  }

  return (
    <img
      src={iconUrl(meta.icon, meta.color)}
      alt=""
      className="w-6 h-6 shrink-0 object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

const SkillsTechnologies = () => {
  const [activeTab, setActiveTab] = useState<string>(skillGroups[0].id)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number
    switch (event.key) {
      case 'ArrowRight': nextIndex = (index + 1) % skillGroups.length; break
      case 'ArrowLeft': nextIndex = (index - 1 + skillGroups.length) % skillGroups.length; break
      case 'Home': nextIndex = 0; break
      case 'End': nextIndex = skillGroups.length - 1; break
      default: return
    }
    event.preventDefault()
    setActiveTab(skillGroups[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  const activeGroup = skillGroups.find((g) => g.id === activeTab) ?? skillGroups[0]

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a9c66c] mb-5">
        Skills & Technologies
      </h3>

      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Skill categories">
        {skillGroups.map((group, index) => (
          <motion.button
            key={group.id}
            type="button"
            ref={(element) => { tabRefs.current[index] = element }}
            tabIndex={activeTab === group.id ? 0 : -1}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            role="tab"
            aria-selected={activeTab === group.id}
            aria-controls="skills-panel"
            id={`tab-${group.id}`}
            onClick={() => setActiveTab(group.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b8e23] ${
              activeTab === group.id
                ? 'bg-[#526d1d] text-white shadow-md'
                : 'bg-[#2a2a2a] text-gray-300 border border-white/10 hover:border-[#6b8e23]/50 hover:text-white'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            {group.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          id="skills-panel"
          tabIndex={0}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: easeSmooth }}
          variants={staggerContainer(0.04, 0.05)}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        >
          {activeGroup.skills.map((skill, index) => (
            <motion.div
              key={skill}
              variants={fadeUp}
              custom={index}
              transition={{ delay: index * 0.03 }}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-200 bg-[#2a2a2a] border border-white/10 rounded-lg hover:border-[#6b8e23]/40 transition-colors"
              whileHover={{ y: -3, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <SkillIcon name={skill} />
              <span className="truncate">{skill}</span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default SkillsTechnologies
