"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Clock, FileText, Zap } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to Mindscribe</h1>
        <p className="text-gray-400">Transform your thoughts into text with our AI-powered platform</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <Card className="cyberpunk-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Brain className="mr-2 h-5 w-5 text-cyberpunk-neon-purple" />
              Start Thought Processing
            </CardTitle>
            <CardDescription>Begin a new neural thought analysis session</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              Our AI will analyze neural network patterns and extract your thoughts, feelings, and intentions.
            </p>
            <Button asChild className="w-full bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white">
              <Link href="/dashboard/thought-processing">
                <Zap className="mr-2 h-4 w-4" />
                Start Now
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="cyberpunk-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <FileText className="mr-2 h-5 w-5 text-cyberpunk-neon-purple" />
              Saved Thoughts
            </CardTitle>
            <CardDescription>Access your previously saved thoughts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">View, edit, and manage all your saved AI-processed thoughts.</p>
            <Button
              asChild
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Link href="/dashboard/notes">View Thoughts</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="cyberpunk-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="mr-2 h-5 w-5 text-cyberpunk-neon-purple" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your recent thought processing sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-300">Project Ideas</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-300">Meeting Notes</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-300">Research Summary</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="cyberpunk-card">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your thought processing activity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col space-y-1.5">
                <span className="text-sm font-medium text-gray-400">Total Thoughts</span>
                <span className="text-3xl font-bold text-cyberpunk-neon-purple">12</span>
              </div>
              <div className="flex flex-col space-y-1.5">
                <span className="text-sm font-medium text-gray-400">Words Generated</span>
                <span className="text-3xl font-bold text-cyberpunk-neon-purple">4,328</span>
              </div>
              <div className="flex flex-col space-y-1.5">
                <span className="text-sm font-medium text-gray-400">Time Saved</span>
                <span className="text-3xl font-bold text-cyberpunk-neon-purple">3.5 hrs</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

