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
import { Checkbox } from "@/components/ui/checkbox"
import { FaGoogle } from "react-icons/fa"
import { registerUser } from "@/lib/api"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    const result = await registerUser(email, password);

    // For demo purposes, we'll just redirect to dashboard
    router.push("/dashboard")
  }

  const handleGoogleSignup = async () => {
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
          <p className="text-gray-400 mt-2 text-center">Create your account to start using thought-to-text</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-gray-300">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="cyberpunk-input"
            />
          </div>

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
            <Label htmlFor="password" className="text-sm text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="cyberpunk-input"
            />
            <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              required
              className="border-cyberpunk-neon-purple data-[state=checked]:bg-cyberpunk-neon-purple"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link href="#" className="text-cyberpunk-neon-purple hover:text-cyberpunk-glow-purple transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-cyberpunk-neon-purple hover:text-cyberpunk-glow-purple transition-colors">
                Privacy Policy
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !agreedToTerms}
            className="w-full bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white"
          >
            {isLoading ? "Creating account..." : "Create account"}
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
          onClick={handleGoogleSignup}
          disabled={isLoading}
          className="w-full border-gray-700 hover:bg-gray-800 text-white"
        >
          <FaGoogle className="mr-2 text-cyberpunk-neon-purple" />
          Sign up with Google
        </Button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-cyberpunk-neon-purple hover:text-cyberpunk-glow-purple transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

