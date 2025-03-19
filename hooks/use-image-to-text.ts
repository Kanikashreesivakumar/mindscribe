"use client"

import { useState, useCallback, useEffect } from "react"
import mockImageService, { type AIImageResponse } from "@/lib/mock-image-service"

interface ImageToTextOptions {
  sensitivity?: number
  mode?: "speed" | "balanced" | "accuracy"
  autoSave?: boolean
}

export function useImageToText(options: ImageToTextOptions = {}) {
  const { sensitivity = 70, mode = "balanced", autoSave = false } = options

  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [text, setText] = useState("")
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
    if (!selectedImage) return

    setIsProcessing(true)
    setIsPaused(false)
    setIsComplete(false)
    setText("")

    mockImageService.processImage(
      selectedImage,
      (response: AIImageResponse, isDone: boolean) => {
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
  }, [selectedImage, sensitivity, mode])

  const pauseProcessing = useCallback(() => {
    setIsPaused(!isPaused)
    // In a real app, this would pause the AI processing
  }, [isPaused])

  const stopProcessing = useCallback(() => {
    mockImageService.stopProcessing()
    setIsProcessing(false)
    setIsPaused(false)
    setIsComplete(false)
  }, [])

  const resetProcessing = useCallback(() => {
    mockImageService.stopProcessing()
    setIsProcessing(false)
    setIsPaused(false)
    setText("")
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

