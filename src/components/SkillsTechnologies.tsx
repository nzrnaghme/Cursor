import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Skill = {
  name: string
  icon: string
  color?: string
}

type SkillCategory = {
  id: string
  label: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    label: 'AI & ML',
    skills: [
      { name: 'TensorFlow', icon: 'tensorflow', color: 'FF6F00' },
      { name: 'Keras', icon: 'keras', color: 'D00000' },
      { name: 'NumPy', icon: 'numpy', color: '013243' },
      { name: 'Pandas', icon: 'pandas', color: '150458' },
      { name: 'Python', icon: 'python', color: '3776AB' },
      { name: 'MATLAB', icon: 'mathworks', color: '0076A8' },
      { name: 'Librosa', icon: 'python', color: '3776AB' },
      { name: 'scikit-learn', icon: 'scikitlearn', color: 'F7931E' },
    ],
  },
  {
    id: 'speech-dsp',
    label: 'Speech & DSP',
    skills: [
      { name: 'Mel-Spectrogram', icon: 'python', color: '3776AB' },
      { name: 'Librosa', icon: 'python', color: '3776AB' },
      { name: 'MFCC', icon: 'numpy', color: '013243' },
      { name: 'ResNet', icon: 'pytorch', color: 'EE4C2C' },
      { name: 'CNN / RNN', icon: 'tensorflow', color: 'FF6F00' },
      { name: 'Real-Time Inference', icon: 'docker', color: '2496ED' },
      { name: 'Signal Processing', icon: 'gnuplot', color: 'F0E442' },
      { name: 'Quantization', icon: 'onnx', color: '005CED' },
    ],
  },
  {
    id: 'software',
    label: 'Software & Web',
    skills: [
      { name: 'React', icon: 'react', color: '61DAFB' },
      { name: 'Next.js', icon: 'nextdotjs', color: '000000' },
      { name: 'Vue.js', icon: 'vuedotjs', color: '4FC08D' },
      { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
      { name: 'JavaScript', icon: 'javascript', color: 'F7DF1E' },
      { name: 'React Native', icon: 'react', color: '61DAFB' },
      { name: 'C++', icon: 'cplusplus', color: '00599C' },
      { name: 'n8n', icon: 'n8n', color: 'EA4B71' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    skills: [
      { name: 'Git', icon: 'git', color: 'F05032' },
      { name: 'VS Code', icon: 'visualstudiocode', color: '007ACC' },
      { name: 'Google Cloud', icon: 'googlecloud', color: '4285F4' },
      { name: 'Android Studio', icon: 'androidstudio', color: '3DDC84' },
      { name: 'JIRA', icon: 'jira', color: '0052CC' },
      { name: 'Dialogflow', icon: 'googlecloud', color: '4285F4' },
      { name: 'Airtable', icon: 'airtable', color: '18BFFF' },
      { name: 'OpenAI', icon: 'openai', color: '412991' },
    ],
  },
]

const iconUrl = (icon: string, color?: string) =>
  `https://cdn.simpleicons.org/${icon}/${color ?? 'FFFFFF'}`

const SkillIcon = ({
  name,
  icon,
  color,
}: {
  name: string
  icon: string
  color?: string
}) => {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="w-7 h-7 shrink-0 rounded-md bg-[#6b8e23]/20 text-[#6b8e23] text-xs font-bold flex items-center justify-center">
        {name.charAt(0)}
      </span>
    )
  }

  return (
    <img
      src={iconUrl(icon, color)}
      alt=""
      className="w-7 h-7 shrink-0 object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

const SkillsTechnologies = () => {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id)
  const [showAll, setShowAll] = useState(false)

  const activeCategory =
    skillCategories.find((c) => c.id === activeTab) ?? skillCategories[0]

  const displayedSkills = showAll
    ? skillCategories.flatMap((c) =>
        c.skills.map((skill) => ({ ...skill, key: `${c.id}-${skill.name}` }))
      )
    : activeCategory.skills.map((skill) => ({
        ...skill,
        key: `${activeCategory.id}-${skill.name}`,
      }))

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6b8e23] mb-5">
        Skills & Technologies
      </h3>

      {!showAll && (
        <div className="flex flex-wrap gap-2 mb-6">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveTab(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === category.id
                  ? 'bg-[#6b8e23] text-white shadow-md'
                  : 'bg-[#2a2a2a] text-gray-300 border border-white/10 hover:border-[#6b8e23]/50 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={showAll ? 'all' : activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {displayedSkills.map((skill) => (
            <div
              key={skill.key}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#2a2a2a] border border-white/5 hover:border-[#6b8e23]/30 transition-colors"
            >
              <SkillIcon name={skill.name} icon={skill.icon} color={skill.color} />
              <span className="text-sm text-gray-200 font-medium truncate">
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setShowAll((prev) => !prev)}
        className="mt-6 text-sm font-medium text-[#6b8e23] hover:text-[#8bae43] transition-colors"
      >
        {showAll ? 'Show by Category ←' : 'View All Skills →'}
      </button>
    </div>
  )
}

export default SkillsTechnologies
