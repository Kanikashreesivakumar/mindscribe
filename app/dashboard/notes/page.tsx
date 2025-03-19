"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Download, Edit, MoreHorizontal, Search, Trash } from "lucide-react"

// Mock data for saved thoughts
const mockThoughts = [
  {
    id: "1",
    title: "Project Ideas",
    content:
      "Analyzing neural signal patterns... Detecting brain wave frequencies and amplitudes... Identifying active regions in the prefrontal cortex... The neural patterns indicate moderate activity in the amygdala, suggesting some emotional processing.",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Meeting Notes",
    content:
      "Detecting increased activity in the hippocampus, which is associated with memory formation and recall. The temporal lobe shows patterns consistent with language processing and conceptual thinking. Analysis suggests the subject is experiencing a mix of curiosity and mild anticipation.",
    createdAt: "2023-05-14T14:45:00Z",
    updatedAt: "2023-05-14T15:20:00Z",
  },
  {
    id: "3",
    title: "Research Summary",
    content:
      "There appears to be focused attention on problem-solving or creative thinking. Neural patterns indicate the subject is likely formulating ideas or planning future actions. The overall brain state suggests a calm but engaged cognitive state.",
    createdAt: "2023-05-12T09:15:00Z",
    updatedAt: "2023-05-12T09:15:00Z",
  },
  {
    id: "4",
    title: "Personal Reflections",
    content:
      "Based on these patterns, the subject may be thinking about a project or concept they wish to develop. The predicted thought message would be: 'I'm considering how to approach this new project efficiently.'",
    createdAt: "2023-05-10T18:20:00Z",
    updatedAt: "2023-05-10T18:20:00Z",
  },
]

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedThought, setSelectedThought] = useState<(typeof mockThoughts)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredThoughts = mockThoughts.filter(
    (thought) =>
      thought.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thought.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleViewThought = (thought: (typeof mockThoughts)[0]) => {
    setSelectedThought(thought)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-white mb-2">Saved Thoughts</h1>
        <p className="text-gray-400">View and manage your saved thought analyses</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search thoughts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-gray-900/50 border-gray-800 text-white"
          />
        </div>
        <Button
          className="w-full sm:w-auto bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white"
          onClick={() => (window.location.href = "/dashboard/thought-processing")}
        >
          Process New Thought
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredThoughts.length > 0 ? (
          filteredThoughts.map((thought) => (
            <Card key={thought.id} className="cyberpunk-card overflow-hidden">
              <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                <CardTitle className="text-lg font-medium">{thought.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 bg-gray-900 border-gray-800">
                    <DropdownMenuItem
                      className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer"
                      onClick={() => handleViewThought(thought)}
                    >
                      <Edit className="mr-2 h-4 w-4 text-cyberpunk-neon-purple" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer">
                      <Download className="mr-2 h-4 w-4 text-cyberpunk-neon-purple" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer">
                      <Trash className="mr-2 h-4 w-4 text-red-500" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDate(thought.createdAt)}
                </div>
                <p className="text-sm text-gray-300 line-clamp-3">{thought.content}</p>
                <Button
                  variant="ghost"
                  className="mt-4 w-full justify-center text-cyberpunk-neon-purple hover:bg-gray-800 hover:text-cyberpunk-neon-purple"
                  onClick={() => handleViewThought(thought)}
                >
                  View Thought
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-900/50 p-4 mb-4">
              <Search className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-white">No thoughts found</h3>
            <p className="text-sm text-gray-400 mt-1">
              {searchQuery ? `No thoughts matching "${searchQuery}"` : "You haven't processed any thoughts yet"}
            </p>
          </div>
        )}
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedThought && (
          <DialogContent className="sm:max-w-2xl bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">{selectedThought.title}</DialogTitle>
              <DialogDescription className="text-gray-400 flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                {formatDate(selectedThought.createdAt)}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <textarea
                className="w-full min-h-[300px] p-4 rounded-md bg-gray-800 border border-gray-700 text-white resize-none focus:outline-none focus:ring-1 focus:ring-cyberpunk-neon-purple"
                defaultValue={selectedThought.content}
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white"
                onClick={() => setIsDialogOpen(false)}
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

