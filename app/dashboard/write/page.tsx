"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Copy, Download, Pause, Play, Save, Trash } from "lucide-react"

// Mock AI service to simulate thought-to-text generation
const mockThoughtToTextService = {
  generateText: async (callback: (text: string, isDone: boolean) => void) => {
    const sentences = [
      "The neural interface is establishing connection with your thought patterns.",
      "I'm beginning to process your cognitive signals and convert them to text.",
      "Your brain activity suggests you're thinking about a new project or idea.",
      "The concept appears to involve innovative technology solutions for everyday problems.",
      "You're considering how AI can be integrated into daily workflows to enhance productivity.",
      "There's a focus on user experience and accessibility in your thought patterns.",
      "You're weighing the pros and cons of different implementation approaches.",
      "The data indicates you're leaning towards a modular, scalable architecture.",
      "Your thoughts are now shifting towards potential market applications.",
      "I detect consideration of ethical implications and privacy concerns.",
      "You're mentally outlining next steps and development milestones.",
      "There's a clear vision forming for how this solution could transform its industry.",
    ]

    for (let i = 0; i < sentences.length; i++) {
      const words = sentences[i].split(" ")
      for (let j = 0; j < words.length; j++) {
        const partialSentence = words.slice(0, j + 1).join(" ")
        callback(i === 0 && j === 0 ? partialSentence : sentences.slice(0, i).join(" ") + " " + partialSentence, false)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      if (i < sentences.length - 1) {
        callback(sentences.slice(0, i + 1).join(" ") + " ", false)
      } else {
        callback(sentences.join(" "), true)
      }
    }
  },
}

export default function WritePage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [generatedText, setGeneratedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const startProcessing = async () => {
    setIsProcessing(true)
    setIsComplete(false)
    setGeneratedText("")

    await mockThoughtToTextService.generateText((text, isDone) => {
      setGeneratedText(text)
      if (isDone) {
        setIsProcessing(false)
        setIsComplete(true)
      }
    })
  }

  const pauseProcessing = () => {
    setIsPaused(!isPaused)
    // In a real app, this would pause the AI processing
  }

  const resetProcessing = () => {
    setIsProcessing(false)
    setIsPaused(false)
    setGeneratedText("")
    setIsComplete(false)
  }

  const copyToClipboard = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText)
      // In a real app, you would show a toast notification here
    }
  }

  const saveNote = () => {
    // In a real app, this would save the note to the database
    // For now, we'll just simulate a successful save
    setIsComplete(true)
    // In a real app, you would show a toast notification here
  }

  const downloadNote = () => {
    if (generatedText) {
      const blob = new Blob([generatedText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `mindscribe-note-${new Date().toISOString().slice(0, 10)}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  useEffect(() => {
    if (textareaRef.current && generatedText) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight
    }
  }, [generatedText])

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-white mb-2">Thought-to-Text</h1>
        <p className="text-gray-400">Convert your thoughts into text using our AI-powered technology</p>
      </motion.div>

      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-900 border border-gray-800">
          <TabsTrigger value="write" className="data-[state=active]:bg-cyberpunk-neon-purple/20">
            Write
          </TabsTrigger>
          <TabsTrigger value="edit" className="data-[state=active]:bg-cyberpunk-neon-purple/20">
            Edit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="write" className="mt-4">
          <Card className="cyberpunk-card">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-cyberpunk-neon-purple" />
                  <h3 className="text-lg font-medium text-white">Brain-to-Text Processor</h3>
                </div>
                {isProcessing && (
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-cyberpunk-neon-purple animate-pulse"></div>
                    <span className="text-sm text-cyberpunk-neon-purple">Processing thoughts...</span>
                  </div>
                )}
              </div>

              <div className="relative mb-4">
                <Textarea
                  ref={textareaRef}
                  value={generatedText}
                  onChange={(e) => setGeneratedText(e.target.value)}
                  placeholder="Your thoughts will appear here..."
                  className="min-h-[300px] bg-gray-900/50 border-gray-800 text-white resize-none"
                  readOnly={isProcessing && !isPaused}
                />
                {isProcessing && !isPaused && (
                  <div className="absolute bottom-4 right-4 flex items-center">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-cyberpunk-neon-purple animate-pulse delay-0"></div>
                      <div className="h-2 w-2 rounded-full bg-cyberpunk-neon-purple animate-pulse delay-150"></div>
                      <div className="h-2 w-2 rounded-full bg-cyberpunk-neon-purple animate-pulse delay-300"></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {!isProcessing && !isComplete ? (
                  <Button
                    onClick={startProcessing}
                    className="bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Writing
                  </Button>
                ) : isProcessing ? (
                  <>
                    <Button
                      onClick={pauseProcessing}
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      {isPaused ? (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Resume
                        </>
                      ) : (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause
                        </>
                      )}
                    </Button>
                    <Button onClick={resetProcessing} variant="destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Stop
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={startProcessing}
                      className="bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      New Session
                    </Button>
                    <Button
                      onClick={resetProcessing}
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                  </>
                )}

                {generatedText && (
                  <>
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button
                      onClick={saveNote}
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button
                      onClick={downloadNote}
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="mt-4">
          <Card className="cyberpunk-card">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-white mb-2">Edit Generated Text</h3>
                <p className="text-sm text-gray-400">Refine and edit the text generated from your thoughts</p>
              </div>

              <Textarea
                value={generatedText}
                onChange={(e) => setGeneratedText(e.target.value)}
                placeholder="No text to edit yet. Start a writing session first."
                className="min-h-[300px] mb-4 bg-gray-900/50 border-gray-800 text-white"
              />

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={saveNote}
                  className="bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white"
                  disabled={!generatedText}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  disabled={!generatedText}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button
                  onClick={downloadNote}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  disabled={!generatedText}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

