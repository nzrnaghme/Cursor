import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ParticlesBackground from './ParticlesBackground'

type FilterType = 'all' | 'projects' | 'experiences'

interface Item {
  id: number
  type: 'project' | 'experience'
  title: string
  category: string
  year: string
  description: string
  details: string[]
  image?: string
  location?: string
  company?: string
  link?: string
  hoverEmoji?: string
  hoverVideo?: string
  hoverImage?: string
}

const Projects = () => {
  const [filter, setFilter] = useState<FilterType>('all')
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: itemsRef, inView: itemsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const items: Item[] = [
    // Projects
    {
      id: 1,
      type: 'project',
      title: 'Real-time Speech Emotion Recognition on FPGA',
      category: 'Research Project',
      year: '2024',
      description: 'Implemented a speech emotion recognition pipeline (MFCC + CNN) on Xilinx ZedBoard FPGA for real-time audio classification.',
      details: [
        'Optimized design through quantization and efficient mapping to LUTs, BRAMs, and DSP slices',
        'Reduced latency and power usage significantly',
        'Achieved ~89% accuracy while performing hardware-software trade-off analysis',
        'Analyzed throughput, latency, and resource utilization',
        'Manuscript in preparation',
        'Advisor: Prof. Shahnam Mirzaei'
      ],
      image: '/images/project-speech-emotion.png',
      hoverImage: '/images/project-speech-emotion.png',

    },
    {
      id: 2,
      type: 'project',
      title: 'COVID-19 Discourse Analysis',
      category: 'Research Project',
      year: '2023',
      description: 'Researched Iranian society\'s response to COVID-19 using social media data with large-scale sentiment analysis.',
      details: [
        'Conducted large-scale sentiment analysis on social media data related to COVID-19',
        'Showcased scalable data processing and natural language analysis',
        'Built NLP-based chatbot with Google Cloud',
        'Demo available on LinkedIn'
      ],
      hoverImage: '/images/project-covid-analysis.png',
      image: '/images/project-covid-analysis.png',
      link: 'https://www.linkedin.com/posts/naghme-nazar_machinelearning-nlp-datascience-ugcPost-7361228441074962434-s89Q?utm_source=share&utm_medium=member_desktop&rcm=ACoAACbyPb0Be82yiC7g1CitYj_zttwH1PBbPNM'
    },
    {
      id: 3,
      type: 'project',
      title: 'CCTV Chatbot',
      category: 'AI Application',
      year: '2022',
      description: 'Built an AI chatbot for a CCTV shopping platform to guide users in camera selection.',
      details: [
        'Integrated Dialogflow for NLP and Google Cloud for scalable infrastructure',
        'Reduced customer support load by 40%',
        'Technologies: Python, Dialogflow, Google Cloud',
        'GitHub: CCTV Chatbot'
      ],
      link: 'https://github.com/nzrnaghme/CCTV',
      hoverImage: '/images/project-cctv-chatbot.png',
      image: '/images/project-cctv-chatbot.png'
      // hoverVideo: './public/cctv-chatbot-video.mp4'
    },
    // Experiences
    {
      id: 4,
      type: 'experience',
      title: 'Senior Frontend Developer',
      company: 'Golrang Industrial Group',
      location: 'Tehran, Iran',
      category: 'Full-time',
      year: '2022 - 2024',
      description: 'Architected and developed cross-platform applications using React Native and PWA with React.js.',
      details: [
        'Delivered seamless experience for both iOS and Android users',
        'Implemented custom UI components and optimized caching/state management',
        'Reduced app load time by 40% and improved overall performance',
        'Led a team of 5; improved collaboration and code review processes',
        'Reduced bugs by 25% through better processes',
        'Migrated legacy systems to Vue.js, improving performance by 30%'
      ],
      hoverImage: '/images/experience-golrang.png',
      image: '/images/experience-golrang.png',
      link: 'https://www.kaman.io/',
    },
    {
      id: 5,
      type: 'experience',
      title: 'React Developer',
      company: 'Erole.ir',
      location: 'Tehran, Iran',
      category: 'Full-time',
      year: '2021 - 2022',
      description: 'Developed React applications with Redux state management and RESTful APIs.',
      details: [
        'Built custom UI components to enhance user interaction',
        'Implemented two-way communication (SignalR) between client and server for real-time updates',
        'Applied code-splitting and lazy loading, optimizing application performance',
        'Worked with modern React patterns and best practices'
      ],
      hoverImage: '/images/experience-erole.png',
      image: '/images/experience-erole.png'

    },
    {
      id: 6,
      type: 'experience',
      title: 'Front End Web Developer',
      company: 'Bahr Academy',
      location: 'Sari, Iran',
      category: 'Full-time',
      year: '2019 - 2021',
      description: 'Developed, designed and implemented responsive web applications using HTML, CSS, JavaScript.',
      details: [
        'Identified and fixed UI/UX bugs, improving site usability',
        'Integrated third-party APIs and developed automated test suites for front-end components',
        'Collaborated with UI/UX designers to ensure modern, intuitive designs',
        'Built responsive and accessible web applications'
      ],
      hoverImage: '/images/experience-bahr.png',
      image: '/images/experience-bahr.png',
      link: 'https://www.bahracademy.co.uk/',
    }
  ]

  const filteredItems = filter === 'all' 
    ? items 
    : filter === 'projects' 
    ? items.filter(item => item.type === 'project')
    : items.filter(item => item.type === 'experience')

  return (
    <section id="projects" className="py-20 px-6 min-h-screen flex items-center bg-gradient-to-b from-[#1a1a1a] to-[#252525] relative" ref={containerRef}>
      <ParticlesBackground className="opacity-50" />
      <motion.div 
        className="max-w-[1200px] mx-auto w-full relative z-10"
      >
        <motion.div 
          className="mb-8"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="flex justify-between items-start gap-6 flex-col md:flex-row">
            <div>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-light mb-3 tracking-[-0.02em] leading-tight text-white">Projects & Experience</h2>
              <p className="text-lg leading-relaxed text-gray-300 max-w-[600px] font-light">
                A selection of my research projects and professional experiences in AI/ML hardware-software engineering.
              </p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mt-6 mb-8">
            {(['all', 'projects', 'experiences'] as FilterType[]).map((filterType) => (
              <motion.button
                key={filterType}
                className={`px-6 py-2 text-sm font-medium uppercase tracking-wider rounded-full transition-all ${
                  filter === filterType
                    ? 'bg-[#6b8e23] text-white'
                    : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setFilter(filterType)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterType === 'all' ? 'All' : filterType === 'projects' ? 'Projects' : 'Experiences'}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="w-full"
          ref={itemsRef}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="wait">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative bg-[#2a2a2a] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all cursor-pointer border border-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-[#6b8e23] group"
                  initial={{ opacity: 0, y: 50 }}
                  animate={itemsInView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Image/Header Section */}
                  <div className={`h-[150px] sm:h-[180px] md:h-[200px] flex items-center justify-center relative overflow-hidden ${
                    index % 4 === 0 ? 'bg-gradient-to-br from-[#6b8e23] via-[#7b9e33] to-[#8bae43]' :
                    index % 4 === 1 ? 'bg-gradient-to-br from-[#4a5568] via-[#5a6578] to-[#6a7588]' :
                    index % 4 === 2 ? 'bg-gradient-to-br from-[#553c9a] via-[#6b4fb8] to-[#7b5fc8]' :
                    'bg-gradient-to-br from-[#2d5a87] via-[#3d6a97] to-[#4d7aa7]'
                  }`}>
                    {/* Background image - always visible with opacity 50 */}
                    {item.image && (
                      <img 
                        src={item.image.startsWith('/') ? item.image : `/${item.image}`}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
                        loading="lazy"
                        onError={(e) => {
                          // Don't hide, show gradient background instead
                          (e.target as HTMLImageElement).style.opacity = '0'
                        }}
                      />
                    )}
                    
                    {/* Hover content - emoji, video, or picture (desktop only) */}
                    <AnimatePresence mode="wait">
                      {hoveredItem === item.id ? (
                        <motion.div
                          key="hover-content"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm hidden md:flex z-10"
                        >
                          {item.hoverVideo ? (
                            <video 
                              src={item.hoverVideo} 
                              autoPlay 
                              loop 
                              muted 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLVideoElement).style.display = 'none'
                              }}
                            />
                          ) : item.hoverImage ? (
                            <img 
                              src={item.hoverImage.startsWith('/') ? item.hoverImage : `/${item.hoverImage}`}
                              alt={item.title}
                              className="w-full h-full object-cover opacity-100"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none'
                              }}
                            />
                          ) : item.hoverEmoji ? (
                            <div className="text-4xl md:text-6xl lg:text-8xl">{item.hoverEmoji}</div>
                          ) : null}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="title"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/20 md:bg-transparent z-10"
                        >
                          <div className="text-white text-base sm:text-lg font-semibold text-center px-4">{item.title}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">{item.category}</span>
                      <span className="text-xs text-gray-500 font-medium">{item.year}</span>
                    </div>
                    {item.company && (
                      <p className="text-sm text-[#6b8e23] mb-2">{item.company} {item.location && `• ${item.location}`}</p>
                    )}
                    <p className="text-sm leading-relaxed text-gray-300 mb-3">{item.description}</p>
                    
                    {/* Full Details on Hover */}
                    <AnimatePresence>
                      {hoveredItem === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pt-3 border-t border-white/10"
                        >
                          <ul className="space-y-2">
                            {item.details.map((detail, idx) => (
                              <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                                <span className="text-[#6b8e23] mt-1 shrink-0">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                          {item.link && (
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-block mt-3 text-xs text-[#6b8e23] hover:underline font-medium"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View {item.type === 'project' ? 'Project' : 'Details'} →
                            </a>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Projects
