import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ParticlesBackground from './ParticlesBackground'

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="about" className="py-20 px-6 min-h-screen flex items-center bg-gradient-to-b from-[#252525] to-[#1a1a1a] relative overflow-hidden" ref={containerRef}>
      <ParticlesBackground className="opacity-50" />
      <motion.div 
        className="max-w-[1200px] mx-auto w-full relative z-10"
      >
        <motion.div 
          className="max-w-[800px]"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <motion.h2 
            className="text-[clamp(2rem,5vw,4rem)] font-light mb-6 tracking-[-0.02em] leading-tight text-white"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            About Me
          </motion.h2>

          <motion.div 
            className="text-lg leading-relaxed text-gray-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="mb-4 font-light">
            I'm a graduate student in Computer Engineering at California State University Northridge, specializing in Speech Emotion Recognition, affective computing, and real-time ML systems. My research focuses on building deployable models that classify human emotional states from speech — investigating the gap between acted speech corpora and real-world performance.

            </p>
            <p className="font-light">
           With 5+ years of software engineering experience, I bring an end-to-end perspective to ML research: from signal processing and model design to live inference and deployment.
            </p>
          </motion.div>

          {/* Education Section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h3 className="text-2xl font-light mb-4 text-white">Education</h3>
            <div className="space-y-6">
              <div className="p-6 bg-[#2a2a2a] rounded-lg border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-medium text-white mb-1">Master, Computer Engineering</h4>
                    <p className="text-[#6b8e23]">California State University Northridge</p>
                  </div>
                  <span className="text-sm text-gray-400">Aug 2024 - May 2026</span>
                </div>
                <ul className="mt-3 space-y-1 text-gray-300 text-sm">
                  <li>• Thesis: Real-Time Speech Emotion Recognition Using Optimized Deep Residual Networks </li>
                  <li>• Areas: Speech Emotion Recognition, Affective Computing, Deep Learning, Signal Processing </li>
                  <li>• Key Results: 80% validation accuracy on RAVDESS+TESS (~4,900 samples); 
                  real-time inference under 200ms per segment on CPU </li>
                  <li>• Manuscript in preparation — May 2026 </li>
                  <li>• Advisor: <a href="https://www.ecs.csun.edu/~smirzaei/" target="_blank" rel="noopener noreferrer" className="text-[#6b8e23] hover:underline">Prof. Shahnam Mirzaei</a></li>
                  <li>• Presented at: 40th Annual CSU Research Competition </li>
                </ul>
              </div>

              <div className="p-6 bg-[#2a2a2a] rounded-lg border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-medium text-white mb-1">Bachelor, Science Computer Software</h4>
                    <p className="text-[#6b8e23]">University of Science & Technology of Mazandaran</p>
                  </div>
                  <span className="text-sm text-gray-400">Aug 2016 - Mar 2021</span>
                </div>
                <ul className="mt-3 space-y-1 text-gray-300 text-sm">
                  <li>• Areas: Machine Learning, Artificial Intelligence, Signals & Systems, Data Structures, Algorithms</li>
                  <li>• GPA: 3.6 / 4.0</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Research Interests / Future Directions */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h3 className="text-2xl font-light mb-4 text-white">Research Interests</h3>
            <div className="p-6 bg-[#2a2a2a] rounded-lg border border-white/10">
              <ul className="space-y-2 text-lg text-gray-300 font-light leading-relaxed">
              <li className="flex items-start gap-2">
                  <span className="text-[#6b8e23] mt-1 shrink-0">•</span>
                  <span>Speech Emotion Recognition & Affective Computing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6b8e23] mt-1 shrink-0">•</span>
                  <span>Real-time embedded ML</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6b8e23] mt-1 shrink-0">•</span>
                  <span>Affective computing / cognition modeling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6b8e23] mt-1 shrink-0">•</span>
                  <span>DSP pipelines & hardware acceleration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6b8e23] mt-1 shrink-0">•</span>
                  <span>Multimodal human-signal understanding</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Technical Skills - Reorganized by Priority */}
          <motion.div 
            className="mt-8 p-8 bg-gradient-to-br from-[#6b8e23] to-[#556b2f] text-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <h3 className="text-2xl font-light mb-4">Technical Skills</h3>
            
            {/* ML/DSP/Embedded ML - Priority 1 */}
            <div className="mb-6">
              <h4 className="font-medium mb-3 text-lg">ML & Speech Processing</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2 opacity-90">Deep Learning & Audio ML</h5>
                  <p className="text-white/80">Deep Learning (ResNet, CNN/RNN), Mel-Spectrogram Feature Extraction, Speech Signal Processing, Audio Preprocessing, TensorFlow, Keras, Real-Time Inference</p>
                </div>
                <div>
                  <h5 className="font-medium mb-2 opacity-90">ML & Signal Processing</h5>
                  <p className="text-white/80">Signal Processing (Librosa, MFCCs), TensorFlow, NumPy, Pandas, MATLAB, Quantization & Pruning</p>
                </div>
              </div>
            </div>

            {/* Sensorimotor / Cognitive Angle - Priority 2 */}
            <div className="mb-6 pt-4 border-t border-white/20">
              <h4 className="font-medium mb-3 text-lg">Affective Computing & Human-Centered ML</h4>
              <p className="text-sm text-white/80">
              Speech emotion recognition, affective computing, human-centered AI systems, behavioral signal modeling, multimodal emotion analysis
              </p>
            </div>

            {/* Software / Web Skills - Priority 3 */}
            <div className="pt-4 border-t border-white/20">
              <h4 className="font-medium mb-3 text-lg">Skills (Software, Web)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2 opacity-90">Programming Languages</h5>
                  <p className="text-white/80">Python, C++, JavaScript, TypeScript</p>
                </div>
                <div>
                  <h5 className="font-medium mb-2 opacity-90">Web & Tools</h5>
                  <p className="text-white/80">React.js, Next.js, Vue.js, React Native, n8n, Create AI Agent (n8n), Git, JIRA, VS Code, Google Cloud, Android Studio</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
