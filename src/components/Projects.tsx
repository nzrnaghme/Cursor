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
      title: 'Real-Time Speech Emotion Recognition Using Optimized Deep Residual Networks',
      category: 'Research Project',
      year: '2024',
      description: 'Designed and implemented a real-time SER system achieving 80% validation accuracy on RAVDESS+TESS (~4,900 samples), with a live desktop application running inference under 200ms per segment. Resolved training instability through gradient clipping and adaptive LR scheduling. Manuscript in preparation, May 2026',
      details: [
        "Problem: Traditional SER systems are trained on acted, studio-controlled speech corpora that don't generalize to real-world spontaneous conditions, limiting their clinical and practical utility.",
        'Method: Built an end-to-end pipeline converting raw 16kHz audio into 128×128 Mel-spectrograms, classified by an optimized ResNet into 4 emotional states (Neutral, Happy, Sad, Angry). Resolved training instability via gradient clipping (norm=1.0) and adaptive LR scheduling (10⁻³→10⁻⁷). Evaluated on combined RAVDESS+TESS corpus with speaker-aware 80/20 split.',
        'Contribution: Achieved 80% validation accuracy with 81.1% recall on Angry and 78.7% on Neutral. Built a real-time desktop application with sub-200ms inference. Systematic confusion analysis revealed Happy/Sad overlap consistent with SER literature — confirming the model learned genuine acoustic emotion structure.',
        'Next Step/Research Value: Extending to spontaneous speech corpora (IEMOCAP, PRIORI) for cross-corpus validation. Future work includes multimodal fusion, model compression for edge deployment, and clinical mental health monitoring applications.'
      ],
      image: '/images/project-speech-emotion.png',
      hoverImage: '/images/project-speech-emotion.png',
    },
    {
      id: 2,
      type: 'project',
      title: 'Large-scale Analysis of Emotional and Linguistic Shifts in Iranian Social Media during COVID-19',
      category: 'Research Project',
      year: '2021 - 2023',
      description: 'Analyzed Iranian society\'s response to COVID-19 by measuring emotional and linguistic shifts across millions of Persian social media posts using advanced NLP techniques.',
      details: [
        'Problem: Crisis-driven social behavior changes are hard to measure at population scale, making it difficult to understand how communities respond to unprecedented events',
        'Method: Built comprehensive pipelines for sentiment classification, topic modeling, and temporal behavior tracking across millions of Persian posts from Iranian social media. Developed NLP-based chatbot with Google Cloud for scalable data processing',
        'Contribution: Identified emotional cycles and linguistic drift patterns that emerged during the pandemic. Mapped behavioral responses as a function of crisis timeline, revealing how public sentiment evolved over time',
        'Next Step/Research Value: Strengthened expertise in human-centered data modeling and large-scale social media analysis. Foundation for understanding multimodal human signals in crisis contexts'
      ],
      hoverImage: '/images/project-covid-analysis.png',
      image: '/images/project-covid-analysis.png',
      link: 'https://www.linkedin.com/posts/naghme-nazar_machinelearning-nlp-datascience-ugcPost-7361228441074962434-s89Q?utm_source=share&utm_medium=member_desktop&rcm=ACoAACbyPb0Be82yiC7g1CitYj_zttwH1PBbPNM'
    },
    {
      id: 3,
      type: 'project',
      title: 'CCTV Chatbot - Intent-based Assistant',
      category: 'AI Application',
      year: '2022',
      description: 'Designed an intent-based assistant to guide users through CCTV selection for a shopping platform, reducing customer support load while strengthening practical ML deployment skills.',
      details: [
        'Problem: Users need personalized guidance for CCTV camera selection, but traditional support methods are resource-intensive and cannot scale effectively',
        'Method: Built an AI chatbot using Dialogflow for NLP and Google Cloud for scalable infrastructure, implementing intent classification and dialogue logic to understand user needs',
        'Contribution: Reduced customer support load by 40% through automated intelligent assistance. Gained practical experience with real-world ML deployment constraints and production-level considerations',
        'Next Step/Research Value: Although applied, this project strengthened expertise in human behavior modeling (query patterns, user needs) and intent classification for conversational AI systems. Foundation for understanding user intent in sensorimotor interaction contexts'
      ],
      link: 'https://github.com/nzrnaghme/CCTV',
      hoverImage: '/images/project-cctv-chatbot.png',
      image: '/images/project-cctv-chatbot.png'
      // hoverVideo: './public/cctv-chatbot-video.mp4'
    },
    {
      id: 7,
      type: 'project',
      title: 'AI Email Agent',
      category: 'AI Application',
      year: '2026',
      description: 'Designed and implemented an AI-powered email automation agent to classify, prioritize, and respond to incoming Gmail messages while maintaining structured logs.',
      details: [
        'Problem: Manual email handling is time-consuming and inconsistent, often causing delayed replies and poor prioritization.',
        'Method: Built an automation workflow using n8n, integrating OpenAI, Gmail API, and Airtable. The agent performs email classification, priority detection, reply generation, dynamic labeling, and structured data logging.',
        'Contribution: Reduced manual email workload through intelligent automation and demonstrated real-world integration of LLM-based decision systems.',
        'Next Step/Research Value: Provides a foundation for autonomous communication agents, with future expansion toward sentiment analysis, calendar automation, and adaptive priority scoring.'
      ],
      image: '/images/project-ai-email-agent.png',
      hoverImage: '/images/project-ai-email-agent.png',
      link: 'https://github.com/nzrnaghme/RespondEmailAgent'
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
                Exploring how real-time DSP/ML systems can model human affect, sensorimotor signals, and embodied cognition.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
            <AnimatePresence mode="wait">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative bg-[#2a2a2a] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all cursor-pointer border border-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-[#6b8e23] group flex flex-col"
                  initial={{ opacity: 0, y: 50 }}
                  animate={itemsInView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.01 }}
                  onMouseEnter={() => {
                    // Set only this specific card as hovered
                    setHoveredItem(item.id)
                  }}
                  onMouseLeave={() => {
                    // Only clear if this is the currently hovered card
                    if (hoveredItem === item.id) {
                      setHoveredItem(null)
                    }
                  }}
                >
                  {/* Image/Header Section */}
                  <div className={`h-[200px] flex items-center justify-center relative overflow-hidden ${
                    index % 4 === 0 ? 'bg-gradient-to-br from-[#6b8e23] via-[#7b9e33] to-[#8bae43]' :
                    index % 4 === 1 ? 'bg-gradient-to-br from-[#4a5568] via-[#5a6578] to-[#6a7588]' :
                    index % 4 === 2 ? 'bg-gradient-to-br from-[#553c9a] via-[#6b4fb8] to-[#7b5fc8]' :
                    index % 4 === 3 ? 'bg-gradient-to-br from-[#e94b716e] via-[#e94b716e] to-[#e94b716e]' :
                    'bg-gradient-to-br from-[#2d5a87] via-[#3d6a97] to-[#4d7aa7]'
                  }`}>
                    {/* Background image - little opacity when not hovering, full on hover (same as previous items) */}
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
                    <AnimatePresence mode="wait">
                      {hoveredItem === item.id && (
                        <motion.div
                          key={`details-${item.id}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pt-3 border-t border-white/10"
                        >
                          <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            <ul className="space-y-2">
                            {item.details.map((detail, idx) => {
                              const isProblemMethodOrContribution = detail.startsWith('Problem:') || detail.startsWith('Method:') || detail.startsWith('Contribution:') || detail.startsWith('Research Value:') || detail.startsWith('Next Step/Research Value:');
                              let parts = null;
                              if (isProblemMethodOrContribution) {
                                // Handle "Next Step/Research Value:" which has a colon after a slash
                                if (detail.startsWith('Next Step/Research Value:')) {
                                  parts = ['Next Step/Research Value', detail.substring('Next Step/Research Value: '.length)];
                                } else {
                                  parts = detail.split(': ');
                                }
                              }
                              
                              return (
                                <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                                  <span className="text-[#6b8e23] mt-1 shrink-0">•</span>
                                  <span>
                                    {parts ? (
                                      <>
                                        <strong className="font-bold text-white">{parts[0]}:</strong> {parts[1]}
                                      </>
                                    ) : (
                                      detail
                                    )}
                                  </span>
                                </li>
                              );
                            })}
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
                          </div>
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
