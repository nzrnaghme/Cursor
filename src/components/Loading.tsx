import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center gap-8">
        <motion.div
          className="text-[#6b8e23] flex items-center justify-center"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="8" height="8" fill="currentColor" />
            <rect x="10" y="22" width="8" height="8" fill="currentColor" />
            <rect x="22" y="22" width="8" height="8" fill="currentColor" />
          </svg>
        </motion.div>
        <motion.p
          className="text-[#6b8e23] text-base font-medium uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading
        </motion.p>
      </div>
    </motion.div>
  )
}

export default Loading
