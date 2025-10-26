import { motion } from "motion/react";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({
  message = "Finding recipes...",
}: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 bg-white flex items-center justify-center z-50"
    >
      <div className="text-center space-y-6">
        {/* Animated Dots */}
        <div className="relative w-32 h-32 mx-auto">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 1, 0.3],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              style={{
                left: `${i * 35}px`,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <div className="w-12 h-12 rounded-full bg-green-500" />
            </motion.div>
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-900 mb-2">{message}</p>
          <motion.p
            className="text-gray-400"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Searching the web for real recipes...
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
