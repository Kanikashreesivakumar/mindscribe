"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"

interface EmergencyButtonProps {
  contactInfo?: string
  message?: string
  className?: string
}

export function EmergencyButton({
  contactInfo = "",
  message = "I need assistance. This is an automated message sent from my Mindscribe app.",
  className = "",
}: EmergencyButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleEmergency = async () => {
    setIsSending(true)

    // Simulate sending emergency message
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSending(false)
    setIsSent(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSent(false)
      setIsDialogOpen(false)
    }, 3000)
  }

  return (
    <>
      <Button
        variant="destructive"
        size="lg"
        className={`flex items-center gap-2 bg-red-600 hover:bg-red-700 ${className}`}
        onClick={() => setIsDialogOpen(true)}
      >
        <AlertTriangle className="h-5 w-5" />
        Emergency
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Emergency Communication
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              This will send an emergency message to your designated contact.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="mb-4 text-white">Are you sure you want to send the following emergency message?</p>
            <div className="rounded-md bg-gray-800 p-3 border border-gray-700">
              <p className="text-sm text-gray-300">
                <strong>To:</strong> {contactInfo || "No contact set"}
              </p>
              <p className="text-sm text-gray-300 mt-2">
                <strong>Message:</strong> {message}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              disabled={isSending || isSent}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleEmergency}
              disabled={isSending || isSent || !contactInfo}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSending ? "Sending..." : isSent ? "Sent!" : "Send Emergency Message"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

