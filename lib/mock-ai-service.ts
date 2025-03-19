// This is a mock service to simulate the AI thought-to-text functionality
// In a real application, this would connect to the DeepSeek RI API

export interface AIResponse {
  text: string
  confidence: number
}

export class MockAIService {
  private static instance: MockAIService
  private isProcessing = false

  private constructor() {}

  public static getInstance(): MockAIService {
    if (!MockAIService.instance) {
      MockAIService.instance = new MockAIService()
    }
    return MockAIService.instance
  }

  public startProcessing(
    callback: (response: AIResponse, isDone: boolean) => void,
    sensitivity = 70,
    mode: "speed" | "balanced" | "accuracy" = "balanced",
  ): void {
    if (this.isProcessing) {
      return
    }

    this.isProcessing = true

    // Sample thought patterns that would be detected by the AI
    const thoughtPatterns = [
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

    // Adjust delay based on processing mode
    const wordDelay = mode === "speed" ? 50 : mode === "balanced" ? 100 : 150

    // Process each thought pattern
    let currentText = ""
    let patternIndex = 0

    const processNextPattern = () => {
      if (patternIndex >= thoughtPatterns.length) {
        this.isProcessing = false
        callback({ text: currentText, confidence: 0.95 }, true)
        return
      }

      const pattern = thoughtPatterns[patternIndex]
      const words = pattern.split(" ")

      let wordIndex = 0

      const processNextWord = () => {
        if (wordIndex >= words.length) {
          patternIndex++
          currentText += " "
          setTimeout(processNextPattern, 300)
          return
        }

        currentText += (wordIndex === 0 && patternIndex === 0 ? "" : " ") + words[wordIndex]

        // Calculate confidence based on sensitivity
        // Higher sensitivity means more variation in confidence
        const baseConfidence = 0.7 + Math.random() * 0.2
        const confidenceVariation = (sensitivity / 100) * 0.3
        const confidence = baseConfidence + Math.random() * confidenceVariation

        callback({ text: currentText, confidence }, false)

        wordIndex++
        setTimeout(processNextWord, wordDelay)
      }

      processNextWord()
    }

    processNextPattern()
  }

  public stopProcessing(): void {
    this.isProcessing = false
  }
}

export default MockAIService.getInstance()

