"use client"

import { useState, useCallback, useEffect } from "react"
import mockThoughtService, {
  type AIThoughtResponse,
  type EmotionData,
  type ThoughtIntention,
} from "@/lib/mock-thought-service"

interface ThoughtProcessingOptions {
  sensitivity?: number
  mode?: "speed" | "balanced" | "accuracy"
  autoSave?: boolean
}

export function useThoughtProcessing(options: ThoughtProcessingOptions = {}) {
  const { sensitivity = 70, mode = "balanced", autoSave = false } = options

  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [text, setText] = useState("")
  const [emotions, setEmotions] = useState<EmotionData[]>([])
  const [intentions, setIntentions] = useState<ThoughtIntention[]>([])
  const [predictedMessage, setPredictedMessage] = useState<string | undefined>(undefined)
  const [confidence, setConfidence] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Handle image selection
  const handleImageSelect = useCallback((file: File | null) => {
    if (file) {
      setSelectedImage(file)

      // Create a preview URL for the selected image
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setSelectedImage(null)
      setPreviewUrl(null)
    }
  }, [])

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // Auto-save functionality
  useEffect(() => {
    let saveInterval: NodeJS.Timeout

    if (autoSave && isProcessing && text && !isPaused) {
      saveInterval = setInterval(
        () => {
          console.log("Auto-saving thought:", text)
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
    if (!selectedImage) return

    setIsProcessing(true)
    setIsPaused(false)
    setIsComplete(false)
    setText("")
    setEmotions([])
    setIntentions([])
    setPredictedMessage(undefined)

    mockThoughtService.processThought(
      selectedImage,
      (response: AIThoughtResponse, isDone: boolean) => {
        setText(response.text)
        setEmotions(response.emotions)
        setIntentions(response.intentions)
        setPredictedMessage(response.predictedMessage)
        setConfidence(response.confidence)

        if (isDone) {
          setIsProcessing(false)
          setIsComplete(true)
        }
      },
      sensitivity,
      mode,
    )
  }, [selectedImage, sensitivity, mode])

  const pauseProcessing = useCallback(() => {
    setIsPaused(!isPaused)
    // In a real app, this would pause the AI processing
  }, [isPaused])

  const stopProcessing = useCallback(() => {
    mockThoughtService.stopProcessing()
    setIsProcessing(false)
    setIsPaused(false)
    setIsComplete(false)
  }, [])

  const resetProcessing = useCallback(() => {
    mockThoughtService.stopProcessing()
    setIsProcessing(false)
    setIsPaused(false)
    setText("")
    setEmotions([])
    setIntentions([])
    setPredictedMessage(undefined)
    setConfidence(0)
    setIsComplete(false)
    setSelectedImage(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }, [previewUrl])

  return {
    isProcessing,
    isPaused,
    text,
    emotions,
    intentions,
    predictedMessage,
    confidence,
    isComplete,
    selectedImage,
    previewUrl,
    handleImageSelect,
    startProcessing,
    pauseProcessing,
    stopProcessing,
    resetProcessing,
    setText,
  }
}

