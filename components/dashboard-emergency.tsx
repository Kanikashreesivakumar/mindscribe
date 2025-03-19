"use client"

import { useState, useEffect } from "react"
import { EmergencyButton } from "./emergency-button"

export function DashboardEmergency() {
  const [isVisible, setIsVisible] = useState(false)
  const [contactInfo, setContactInfo] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    // In a real app, this would fetch from user settings
    const mockSettings = {
      enableEmergencyButton: true,
      emergencyContact: "emergency@example.com",
      emergencyMessage: "I need assistance. This is an automated message sent from my Mindscribe app.",
    }

    setIsVisible(mockSettings.enableEmergencyButton)
    setContactInfo(mockSettings.emergencyContact)
    setMessage(mockSettings.emergencyMessage)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <EmergencyButton contactInfo={contactInfo} message={message} className="shadow-neon-glow" />
    </div>
  )
}

