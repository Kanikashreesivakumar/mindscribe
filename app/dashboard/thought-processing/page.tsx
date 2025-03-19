"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, Copy, Download, ImageIcon, Pause, Play, Save, Trash, Upload } from "lucide-react"
import { useThoughtProcessing } from "@/hooks/use-thought-processing"

export default function ThoughtProcessingPage() {
  const {
    isProcessing,
    isPaused,
    text: generatedText,
    emotions,
    intentions,
    predictedMessage,
    isComplete,
    selectedImage,
    previewUrl,
    handleImageSelect,
    startProcessing,
    pauseProcessing,
    resetProcessing,
    setText,
  } = useThoughtProcessing()

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleImageSelect(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const copyToClipboard = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText)
      // In a real app, you would show a toast notification here
    }
  }

  const saveThought = () => {
    // In a real app, this would save the thought to the database
    // For now, we'll just simulate a successful save
    // In a real app, you would show a toast notification here
  }

  const downloadThought = () => {
    if (generatedText) {
      const blob = new Blob([generatedText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `mindscribe-thought-${new Date().toISOString().slice(0, 10)}.txt`
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

  const getEmotionClass = (type: string) => {
    switch (type) {
      case "happy":
        return "emotion-tag-happy"
      case "sad":
        return "emotion-tag-sad"
      case "anxious":
        return "emotion-tag-anxious"
      case "excited":
        return "bg-purple-500/20 text-purple-400 border border-purple-500/30"
      case "neutral":
        return "emotion-tag-neutral"
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-white mb-2">Thought Processing</h1>
        <p className="text-gray-400">Convert neural signal patterns into detailed thought analysis using our AI</p>
      </motion.div>

      <Tabs defaultValue="process" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-900 border border-gray-800">
          <TabsTrigger value="process" className="data-[state=active]:bg-cyberpunk-neon-purple/20">
            Process
          </TabsTrigger>
          <TabsTrigger value="edit" className="data-[state=active]:bg-cyberpunk-neon-purple/20">
            Edit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="process" className="mt-4">
          <Card className="cyberpunk-card">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-cyberpunk-neon-purple" />
                  <h3 className="text-lg font-medium text-white">Neural Thought Processor</h3>
                </div>
                {isProcessing && (
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-cyberpunk-neon-purple animate-pulse"></div>
                    <span className="text-sm text-cyberpunk-neon-purple">Processing thoughts...</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center min-h-[200px] transition-all ${
                      selectedImage
                        ? "border-cyberpunk-neon-purple/50"
                        : "border-gray-700 hover:border-cyberpunk-neon-purple/30"
                    } ${isProcessing ? "animate-upload-pulse" : ""}`}
                    onClick={!isProcessing && !selectedImage ? triggerFileInput : undefined}
                    style={{ cursor: !isProcessing && !selectedImage ? "pointer" : "default" }}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      disabled={isProcessing}
                    />

                    {previewUrl ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Selected neural signal pattern"
                          className="max-h-[200px] max-w-full object-contain rounded"
                        />
                        {!isProcessing && (
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleImageSelect(null)
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="h-16 w-16 text-gray-500 mb-4" />
                        <p className="text-gray-400 text-center mb-2">Drag & drop a neural signal pattern here</p>
                        <p className="text-gray-500 text-center text-sm">or click to browse files</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                          onClick={triggerFileInput}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {!isProcessing && !isComplete ? (
                      <Button
                        onClick={startProcessing}
                        className="bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white"
                        disabled={!selectedImage}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Start Thought Processing
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
                          onClick={() => {
                            handleImageSelect(null)
                            resetProcessing()
                          }}
                          className="bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          New Image
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
                  </div>
                </div>

                <div className="relative">
                  <Textarea
                    ref={textareaRef}
                    value={generatedText}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="AI-generated thought analysis will appear here..."
                    className="min-h-[250px] bg-gray-900/50 border-gray-800 text-white resize-none"
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

                  {generatedText && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <Button
                        onClick={saveThought}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                      <Button
                        onClick={downloadThought}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Emotions and Intentions Section */}
              {(emotions.length > 0 || intentions.length > 0 || predictedMessage) && (
                <div className="mt-6 space-y-4 p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                  <h4 className="text-lg font-medium text-white">Thought Analysis</h4>

                  {emotions.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-400 mb-2">Detected Emotions:</h5>
                      <div className="flex flex-wrap gap-2">
                        {emotions.map((emotion, index) => (
                          <Badge key={index} variant="outline" className={`${getEmotionClass(emotion.type)}`}>
                            {emotion.type} ({Math.round(emotion.confidence * 100)}%)
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {intentions.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-400 mb-2">Thought Intentions:</h5>
                      <div className="space-y-2">
                        {intentions.map((intention, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Badge
                              variant="outline"
                              className="bg-cyberpunk-neon-purple/20 text-cyberpunk-neon-purple border border-cyberpunk-neon-purple/30"
                            >
                              {intention.type}
                            </Badge>
                            <span className="text-sm text-gray-300">{intention.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictedMessage && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-400 mb-2">Predicted Thought Message:</h5>
                      <div className="thought-bubble">
                        <p className="text-white">{predictedMessage}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="mt-4">
          <Card className="cyberpunk-card">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-white mb-2">Edit Thought Analysis</h3>
                <p className="text-sm text-gray-400">
                  Refine and edit the text generated from your neural signal patterns
                </p>
              </div>

              <Textarea
                value={generatedText}
                onChange={(e) => setText(e.target.value)}
                placeholder="No thought analysis to edit yet. Start a processing session first."
                className="min-h-[300px] mb-4 bg-gray-900/50 border-gray-800 text-white"
              />

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={saveThought}
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
                  onClick={downloadThought}
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

