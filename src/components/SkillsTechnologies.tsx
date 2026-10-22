import { skillGroups } from '../data/content'

const SkillsTechnologies = () => (
  <div className="w-full">
    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a9c66c] mb-5">
      Methods & technical foundation
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
      {skillGroups.map((group) => (
        <section key={group.id} aria-labelledby={`skills-${group.id}`}>
          <h4 id={`skills-${group.id}`} className="text-sm font-semibold text-white mb-1.5">
            {group.label}
          </h4>
          <p className="text-sm leading-relaxed text-gray-300">{group.skills.join(' · ')}</p>
        </section>
      ))}
    </div>
  </div>
)

export default SkillsTechnologies
