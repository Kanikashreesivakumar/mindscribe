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

interface ReportButtonProps {
  contactInfo?: string
  message?: string
  className?: string
}

export function ReportButton({
  contactInfo = "",
  message = "I'd like to report an issue with the Mindscribe app.",
  className = "",
}: ReportButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleReport = async () => {
    setIsSending(true)

    // Simulate sending report message
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
        variant="outline"
        size="lg"
        className={`flex items-center gap-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white ${className}`}
        onClick={() => setIsDialogOpen(true)}
      >
        <AlertTriangle className="h-5 w-5" />
        Report Issue
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Report an Issue
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Submit a report about any issues you're experiencing with the app.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="mb-4 text-white">Please describe the issue you're experiencing:</p>
            <textarea
              className="w-full min-h-[100px] p-3 rounded-md bg-gray-800 border border-gray-700 text-white resize-none focus:outline-none focus:ring-1 focus:ring-cyberpunk-neon-purple"
              placeholder="Describe the issue in detail..."
              defaultValue={message}
            />
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
              onClick={handleReport}
              disabled={isSending || isSent}
              className="bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white"
            >
              {isSending ? "Sending..." : isSent ? "Sent!" : "Submit Report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

