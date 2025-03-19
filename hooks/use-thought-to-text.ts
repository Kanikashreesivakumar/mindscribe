"use client"

import { useState, useCallback, useEffect } from "react"
import mockAIService, { type AIResponse } from "@/lib/mock-ai-service"

interface ThoughtToTextOptions {
  sensitivity?: number
  mode?: "speed" | "balanced" | "accuracy"
  autoSave?: boolean
}

export function useThoughtToText(options: ThoughtToTextOptions = {}) {
  const { sensitivity = 70, mode = "balanced", autoSave = false } = options

  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [text, setText] = useState("")
  const [confidence, setConfidence] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Auto-save functionality
  useEffect(() => {
    let saveInterval: NodeJS.Timeout

    if (autoSave && isProcessing && text && !isPaused) {
      saveInterval = setInterval(
        () => {
          console.log("Auto-saving text:", text)
          // In a real app, this would save to a database
        },
        5 * 60 * 1000,
      ) // 5 minutes
    }

    return () => {
      if (saveInterval) clearInterval(saveInterval)
    }
  }, [autoSave, isProcessing, isPaused, text])

  const startProcessing = useCallback(() => {
    setIsProcessing(true)
    setIsPaused(false)
    setIsComplete(false)
    setText("")

    mockAIService.startProcessing(
      (response: AIResponse, isDone: boolean) => {
        setText(response.text)
        setConfidence(response.confidence)

        if (isDone) {
          setIsProcessing(false)
          setIsComplete(true)
        }
      },
      sensitivity,
      mode,
    )
  }, [sensitivity, mode])

  const pauseProcessing = useCallback(() => {
    setIsPaused(!isPaused)
    // In a real app, this would pause the AI processing
  }, [isPaused])

  const stopProcessing = useCallback(() => {
    mockAIService.stopProcessing()
    setIsProcessing(false)
    setIsPaused(false)
    setIsComplete(false)
  }, [])

  const resetProcessing = useCallback(() => {
    mockAIService.stopProcessing()
    setIsProcessing(false)
    setIsPaused(false)
    setText("")
    setConfidence(0)
    setIsComplete(false)
  }, [])

  return {
    isProcessing,
    isPaused,
    text,
    confidence,
    isComplete,
    startProcessing,
    pauseProcessing,
    stopProcessing,
    resetProcessing,
    setText,
  }
}

