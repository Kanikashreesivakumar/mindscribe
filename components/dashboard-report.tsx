"use client"

import { useState, useEffect } from "react"
import { ReportButton } from "./report-button"

export function DashboardReport() {
  const [isVisible, setIsVisible] = useState(false)
  const [contactInfo, setContactInfo] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    // In a real app, this would fetch from user settings
    const mockSettings = {
      enableReportButton: true,
      reportContact: "support@mindscribe.com",
      reportMessage: "I'd like to report an issue with the Mindscribe app.",
    }

    setIsVisible(mockSettings.enableReportButton)
    setContactInfo(mockSettings.reportContact)
    setMessage(mockSettings.reportMessage)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ReportButton contactInfo={contactInfo} message={message} className="shadow-neon-glow" />
    </div>
  )
}

