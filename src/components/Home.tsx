import { motion, useReducedMotion } from 'framer-motion'
import { identity, getAccessibleCvHref, researchSnapshot } from '../data/content'
import { fadeUp, staggerContainer, easeSmooth } from '../utils/motion'
import ParticlesBackground from './ParticlesBackground'

const Home = () => {
  const reduceMotion = useReducedMotion()
  const accessibleCvHref = getAccessibleCvHref()

  return (
    <section
      id="home"
      tabIndex={-1}
      className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#15212d] text-white"
      aria-label="Introduction"
    >
      <div className="absolute inset-0" aria-hidden>
        <ParticlesBackground />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_24%,rgba(126,184,201,0.13),transparent_34%),radial-gradient(circle_at_82%_68%,rgba(107,142,35,0.13),transparent_32%)]" />
        <div className="absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1120px] w-full mx-auto px-6 pt-28 pb-16 sm:pt-32">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_240px] lg:grid-cols-[minmax(0,1fr)_290px] gap-10 lg:gap-16 items-start"
          variants={staggerContainer(0.07, 0.05)}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
        >
          <div className="min-w-0">
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#6b8e23]/50 bg-[#29361f]/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#c9e58d]">
                <span className="h-2 w-2 rounded-full bg-[#a9c66c]" aria-hidden />
                Open to Fall 2027 PhD opportunities
              </span>
            </motion.div>

            <motion.p variants={fadeUp} className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#9fd1df] mb-4">
              {identity.eyebrow}
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-[clamp(2.2rem,6vw,4.25rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-white">
              {identity.displayName}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-[clamp(1.1rem,2.4vw,1.45rem)] leading-snug text-[#bddb80] font-medium max-w-[760px]">
              {identity.headline}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5 text-base sm:text-lg leading-[1.7] text-gray-200 max-w-[720px]">
              {identity.bio}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
              <motion.a
                href="#research"
                className="min-h-11 px-5 py-3 text-sm font-semibold bg-[#526d1d] text-white hover:bg-[#607e25] rounded-md inline-flex items-center"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                View research experience
              </motion.a>
              <motion.a
                href="/Naghmeh_Nazar_CV.pdf"
                download="Naghmeh_Nazar_CV.pdf"
                className="min-h-11 px-5 py-3 text-sm font-semibold text-white border border-white/30 hover:border-[#a9c66c] hover:bg-white/5 rounded-md inline-flex items-center"
                aria-label="Download CV as a PDF"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Download CV
              </motion.a>
              <a
                href={`mailto:${identity.email}?subject=Fall%202027%20PhD%20research%20inquiry`}
                className="min-h-11 px-3 py-3 text-sm font-semibold text-[#9fd1df] hover:text-white inline-flex items-center underline underline-offset-4 decoration-[#4f7182]"
              >
                Email me
              </a>
            </motion.div>

            <motion.dl variants={fadeUp} className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[820px]" aria-label="Research snapshot">
              {researchSnapshot.map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <dt className="mt-1 text-xs leading-relaxed text-gray-400">{item.label}</dt>
                  <dd className="mt-2 text-xl font-semibold text-white">{item.value}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.nav variants={fadeUp} className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Profile links">
              {[
                { label: 'GitHub', href: 'https://github.com/nzrnaghme' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/YOUR-PROFILE' },
                { label: 'Accessible HTML CV ↗', href: accessibleCvHref },
              ].map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center text-gray-300 hover:text-[#bddb80]">
                  {link.label}
                </a>
              ))}
            </motion.nav>
          </div>

          <motion.aside
            className="hidden md:block justify-self-end pt-14"
            variants={fadeUp}
            aria-label="Portrait"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl border border-[#7eb8c9]/20 bg-[#7eb8c9]/5" aria-hidden />
              <motion.img
                src="/images/profile-photo.png"
                alt="Portrait of Naghmeh (Melody) Nazar"
                width={832}
                height={1248}
                className="relative w-[180px] sm:w-[220px] lg:w-[280px] h-auto object-contain rounded-xl drop-shadow-2xl"
                loading="eager"
                transition={{ duration: 0.3, ease: easeSmooth }}
              />
            </div>
            <p className="mt-5 text-center md:text-left text-sm leading-relaxed text-gray-400 max-w-[280px]">
              Los Angeles · M.S. Computer Engineering
            </p>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  )
}

export default Home
