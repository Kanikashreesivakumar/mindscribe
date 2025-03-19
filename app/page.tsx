"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { BrainLogo } from "@/components/brain-logo"

export default function SplashScreen() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Auto-redirect to login after 3 seconds
    const timer = setTimeout(() => {
      router.push("/login")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-cyberpunk-grid bg-[length:50px_50px] opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyberpunk-neon-purple/5 to-transparent"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center z-10"
      >
        <BrainLogo size="xl" animated={true} className="mb-8 animate-float" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold mb-4 text-white text-glow"
        >
          Mind<span className="text-cyberpunk-neon-purple">scribe</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-300 text-center max-w-md"
        >
          Think. Write. Create.
          <span className="block mt-1 text-cyberpunk-neon-purple text-glow">The Future of Thought-to-Text.</span>
        </motion.p>
      </motion.div>

      {/* Animated dots */}
      <div className="absolute bottom-10 flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            className="w-3 h-3 rounded-full bg-cyberpunk-neon-purple"
          />
        ))}
      </div>
    </div>
  )
}

