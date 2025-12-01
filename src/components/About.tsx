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
            I'm a graduate student in Computer Engineering at California State University Northridge, 
            specializing in hardware-accelerated machine learning, signal processing, 
            and real-time DSP/ML systems. My research centers on building and 
            optimizing low-latency emotion-recognition and sensorimotor-signal pipelines on FPGA platforms.
            </p>
            <p className="font-light">
            With 5+ years of software engineering experience and a growing focus on SoC/FPGA architectures,
            I work at the boundary between hardware and human-centered machine learning, developing systems
            that interpret embodied, real-world signals in real time.
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
                  <span className="text-sm text-gray-400">2024 - Present</span>
                </div>
                <ul className="mt-3 space-y-1 text-gray-300 text-sm">
                  <li>• Thesis: Real-Time Speech Emotion Recognition using DSP/ML pipelines optimized for FPGA acceleration (in progress)</li>
                  <li>• Areas: Embedded ML Systems, Sensorimotor Signal Processing, SoC Design</li>
                  <li>• Advisor: <a href="https://www.ecs.csun.edu/~smirzaei/" target="_blank" rel="noopener noreferrer" className="text-[#6b8e23] hover:underline">Prof. Shahnam Mirzaei</a></li>
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
            <h3 className="text-2xl font-light mb-4 text-white">Research Interests / Future Directions</h3>
            <div className="p-6 bg-[#2a2a2a] rounded-lg border border-white/10">
              <p className="text-lg text-gray-300 font-light leading-relaxed">
                Real-time embedded ML for sensorimotor cognition / affective computing / multimodal human signals
              </p>
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
              <h4 className="font-medium mb-3 text-lg">ML/DSP/Embedded ML</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2 opacity-90">Hardware-Accelerated ML & DSP</h5>
                  <p className="text-white/80">FPGA (Xilinx Vivado), Verilog/VHDL, SoC Design, Hardware-accelerated ML, DSP Pipelines, Embedded Systems, ASIC Design, Performance Modeling</p>
                </div>
                <div>
                  <h5 className="font-medium mb-2 opacity-90">ML & Signal Processing</h5>
                  <p className="text-white/80">Signal Processing (Librosa, MFCCs), CNN/RNN, Quantization & Pruning, TensorFlow, NumPy, Pandas, MATLAB</p>
                </div>
              </div>
            </div>

            {/* Sensorimotor / Cognitive Angle - Priority 2 */}
            <div className="mb-6 pt-4 border-t border-white/20">
              <h4 className="font-medium mb-3 text-lg">Sensorimotor / Cognitive Angle</h4>
              <p className="text-sm text-white/80">
                Real-time emotion recognition, sensorimotor signal processing, embodied cognition, 
                multimodal human signals (speech, gesture, physiological), affective computing, 
                human-centered ML systems
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
                  <p className="text-white/80">React.js, Next.js, Vue.js, React Native, Git, JIRA, VS Code, Google Cloud, Android Studio</p>
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
