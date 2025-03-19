// This is a mock service to simulate the AI image-to-text functionality
// In a real application, this would connect to the DeepSeek RI API

export interface AIImageResponse {
  text: string
  confidence: number
}

export class MockImageService {
  private static instance: MockImageService
  private isProcessing = false

  private constructor() {}

  public static getInstance(): MockImageService {
    if (!MockImageService.instance) {
      MockImageService.instance = new MockImageService()
    }
    return MockImageService.instance
  }

  public processImage(
    imageFile: File | null,
    callback: (response: AIImageResponse, isDone: boolean) => void,
    sensitivity = 70,
    mode: "speed" | "balanced" | "accuracy" = "balanced",
  ): void {
    if (this.isProcessing || !imageFile) {
      return
    }

    this.isProcessing = true

    // Sample neural network analysis that would be detected by the AI
    const neuralNetworkAnalysis = [
      "Analyzing the uploaded neural network diagram...",
      "The diagram appears to be a convolutional neural network (CNN) architecture.",
      "I can identify an input layer with dimensions suggesting image processing capabilities.",
      "The network contains multiple convolutional layers with varying filter sizes.",
      "There are several pooling layers interspersed between convolutional operations.",
      "The architecture includes skip connections, indicating a ResNet-like design.",
      "The fully connected layers at the end suggest a classification task.",
      "Based on the output layer, this network appears designed for multi-class classification.",
      "The network depth and parameter count indicate a moderately complex model.",
      "This architecture would be suitable for computer vision tasks like image recognition.",
      "The design incorporates batch normalization layers for training stability.",
      "Overall, this appears to be a well-structured CNN with modern architectural elements.",
    ]

    // Adjust delay based on processing mode
    const wordDelay = mode === "speed" ? 50 : mode === "balanced" ? 100 : 150

    // Process each analysis line
    let currentText = ""
    let lineIndex = 0

    const processNextLine = () => {
      if (lineIndex >= neuralNetworkAnalysis.length) {
        this.isProcessing = false
        callback({ text: currentText, confidence: 0.95 }, true)
        return
      }

      const line = neuralNetworkAnalysis[lineIndex]
      const words = line.split(" ")

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

        callback({ text: currentText, confidence }, false)

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

export default MockImageService.getInstance()

