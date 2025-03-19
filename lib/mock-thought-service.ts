// This is a mock service to simulate the AI thought-to-text functionality
// In a real application, this would connect to the DeepSeek RI API

export interface EmotionData {
  type: "happy" | "sad" | "anxious" | "excited" | "neutral"
  confidence: number
}

export interface ThoughtIntention {
  type: "memory" | "decision" | "focus" | "creative" | "analytical"
  description: string
}

export interface AIThoughtResponse {
  text: string
  emotions: EmotionData[]
  intentions: ThoughtIntention[]
  predictedMessage?: string
  confidence: number
}

export class MockThoughtService {
  private static instance: MockThoughtService
  private isProcessing = false

  private constructor() {}

  public static getInstance(): MockThoughtService {
    if (!MockThoughtService.instance) {
      MockThoughtService.instance = new MockThoughtService()
    }
    return MockThoughtService.instance
  }

  public processThought(
    imageFile: File | null,
    callback: (response: AIThoughtResponse, isDone: boolean) => void,
    sensitivity = 70,
    mode: "speed" | "balanced" | "accuracy" = "balanced",
  ): void {
    if (this.isProcessing || !imageFile) {
      return
    }

    this.isProcessing = true

    // Sample thought analysis that would be detected by the AI
    const thoughtAnalysis = [
      "Analyzing neural signal patterns...",
      "Detecting brain wave frequencies and amplitudes...",
      "Identifying active regions in the prefrontal cortex...",
      "The neural patterns indicate moderate activity in the amygdala, suggesting some emotional processing.",
      "Detecting increased activity in the hippocampus, which is associated with memory formation and recall.",
      "The temporal lobe shows patterns consistent with language processing and conceptual thinking.",
      "Analysis suggests the subject is experiencing a mix of curiosity and mild anticipation.",
      "There appears to be focused attention on problem-solving or creative thinking.",
      "Neural patterns indicate the subject is likely formulating ideas or planning future actions.",
      "The overall brain state suggests a calm but engaged cognitive state.",
      "Based on these patterns, the subject may be thinking about a project or concept they wish to develop.",
      "The predicted thought message would be: 'I'm considering how to approach this new project efficiently.'",
    ]

    // Emotions that would be detected throughout the analysis
    const emotions: EmotionData[] = [
      { type: "excited", confidence: 0.65 },
      { type: "anxious", confidence: 0.25 },
      { type: "neutral", confidence: 0.45 },
    ]

    // Intentions that would be detected
    const intentions: ThoughtIntention[] = [
      {
        type: "creative",
        description: "Generating new ideas or approaches",
      },
      {
        type: "analytical",
        description: "Evaluating options and considering outcomes",
      },
      {
        type: "decision",
        description: "Moving toward a choice or action plan",
      },
    ]

    // Adjust delay based on processing mode
    const wordDelay = mode === "speed" ? 50 : mode === "balanced" ? 100 : 150

    // Process each analysis line
    let currentText = ""
    let lineIndex = 0
    const currentEmotions: EmotionData[] = []
    const currentIntentions: ThoughtIntention[] = []
    let predictedMessage: string | undefined = undefined

    const processNextLine = () => {
      if (lineIndex >= thoughtAnalysis.length) {
        this.isProcessing = false
        callback(
          {
            text: currentText,
            emotions: emotions,
            intentions: intentions,
            predictedMessage: "I'm considering how to approach this new project efficiently.",
            confidence: 0.92,
          },
          true,
        )
        return
      }

      const line = thoughtAnalysis[lineIndex]
      const words = line.split(" ")

      // Add emotions and intentions progressively
      if (lineIndex === 3) {
        currentEmotions.push(emotions[0])
      } else if (lineIndex === 6) {
        currentEmotions.push(emotions[1])
        currentIntentions.push(intentions[0])
      } else if (lineIndex === 9) {
        currentEmotions.push(emotions[2])
        currentIntentions.push(intentions[1])
      } else if (lineIndex === 10) {
        currentIntentions.push(intentions[2])
      } else if (lineIndex === 11) {
        predictedMessage = "I'm considering how to approach this new project efficiently."
      }

      let wordIndex = 0

      const processNextWord = () => {
        if (wordIndex >= words.length) {
          lineIndex++
          currentText += " "
          setTimeout(processNextLine, 300)
          return
        }

        currentText += (wordIndex === 0 && lineIndex === 0 ? "" : " ") + words[wordIndex]

        // Calculate confidence based on sensitivity
        // Higher sensitivity means more variation in confidence
        const baseConfidence = 0.7 + Math.random() * 0.2
        const confidenceVariation = (sensitivity / 100) * 0.3
        const confidence = baseConfidence + Math.random() * confidenceVariation

        callback(
          {
            text: currentText,
            emotions: currentEmotions,
            intentions: currentIntentions,
            predictedMessage,
            confidence,
          },
          false,
        )

        wordIndex++
        setTimeout(processNextWord, wordDelay)
      }

      processNextWord()
    }

    // Simulate image processing delay
    setTimeout(() => {
      processNextLine()
    }, 2000)
  }

  public stopProcessing(): void {
    this.isProcessing = false
  }
}

export default MockThoughtService.getInstance()

