"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BrainLogo } from "@/components/brain-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FaGoogle } from "react-icons/fa"
import { loginUser } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    const result = await loginUser(email, password);

    // For demo purposes, we'll just redirect to dashboard
    router.push("/dashboard")
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, we'll just redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-cyberpunk-grid bg-[length:50px_50px] opacity-20 z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="cyberpunk-card w-full max-w-md p-8 z-10"
      >
        <div className="flex flex-col items-center mb-6">
          <BrainLogo size="md" className="mb-4" />
          <h1 className="text-3xl font-bold text-white text-glow">
            Mind<span className="text-cyberpunk-neon-purple">scribe</span>
          </h1>
          <p className="text-gray-400 mt-2 text-center">Sign in to access your thought-to-text workspace</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="cyberpunk-input"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password" className="text-sm text-gray-300">
                Password
              </Label>
              <Link
                href="#"
                className="text-xs text-cyberpunk-neon-purple hover:text-cyberpunk-glow-purple transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="cyberpunk-input"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="relative my-6">
          <Separator className="bg-gray-700" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyberpunk-dark-purple px-2 text-xs text-gray-400">
            OR
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full border-gray-700 hover:bg-gray-800 text-white"
        >
          <FaGoogle className="mr-2 text-cyberpunk-neon-purple" />
          Sign in with Google
        </Button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-cyberpunk-neon-purple hover:text-cyberpunk-glow-purple transition-colors"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

