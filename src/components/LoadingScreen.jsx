import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg dark:bg-bg-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink dark:bg-ink-dark"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-heading text-lg font-bold text-bg dark:text-bg-dark">AB</span>
            </motion.div>
            <div className="h-[0.125rem] w-32 overflow-hidden rounded-full bg-border dark:bg-border-dark">
              <motion.div
                className="h-full w-full origin-left bg-accent dark:bg-accent-dark"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
