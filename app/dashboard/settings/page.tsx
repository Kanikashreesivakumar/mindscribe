"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Bell, Globe, Lock, Save, User } from "lucide-react"

export default function SettingsPage() {
  const [aiSensitivity, setAiSensitivity] = useState(70)
  const [emergencyContact, setEmergencyContact] = useState("")
  const [emergencyMessage, setEmergencyMessage] = useState(
    "I need assistance. This is an automated message sent from my Mindscribe app.",
  )

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Customize your Mindscribe experience</p>
      </motion.div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-900 border border-gray-800">
          <TabsTrigger value="profile" className="data-[state=active]:bg-cyberpunk-neon-purple/20">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-cyberpunk-neon-purple/20">
            <Globe className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-cyberpunk-neon-purple/20">
            <Bell className="mr-2 h-4 w-4" />
            AI Settings
          </TabsTrigger>
          <TabsTrigger value="emergency" className="data-[state=active]:bg-cyberpunk-neon-purple/20">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4 space-y-4">
          <Card className="cyberpunk-card">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" className="cyberpunk-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john.doe@example.com" className="cyberpunk-input" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="w-full min-h-[100px] p-3 rounded-md bg-cyberpunk-deep-blue/80 border border-cyberpunk-neon-purple/30 text-white resize-none focus:shadow-neon-glow focus:border-cyberpunk-neon-purple focus:outline-none"
                  placeholder="Tell us about yourself"
                  defaultValue="AI enthusiast and technology explorer."
                />
              </div>

              <Button className="bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card className="cyberpunk-card">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" className="cyberpunk-input" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" className="cyberpunk-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" className="cyberpunk-input" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="two-factor" />
                <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
              </div>

              <Button className="bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white">
                <Lock className="mr-2 h-4 w-4" />
                Update Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4 space-y-4">
          <Card className="cyberpunk-card">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how Mindscribe looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <RadioGroup defaultValue="dark" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                    <Label
                      htmlFor="theme-dark"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 bg-gray-950 p-4 hover:border-cyberpunk-neon-purple hover:bg-gray-900 peer-data-[state=checked]:border-cyberpunk-neon-purple [&:has([data-state=checked])]:border-cyberpunk-neon-purple"
                    >
                      <div className="mb-2 rounded-md bg-gray-800 p-2">
                        <div className="h-2 w-8 rounded-lg bg-cyberpunk-neon-purple" />
                      </div>
                      <span>Dark</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                    <Label
                      htmlFor="theme-light"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 bg-gray-950 p-4 hover:border-cyberpunk-neon-purple hover:bg-gray-900 peer-data-[state=checked]:border-cyberpunk-neon-purple [&:has([data-state=checked])]:border-cyberpunk-neon-purple"
                    >
                      <div className="mb-2 rounded-md bg-white p-2">
                        <div className="h-2 w-8 rounded-lg bg-cyberpunk-neon-purple" />
                      </div>
                      <span>Light</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                    <Label
                      htmlFor="theme-system"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 bg-gray-950 p-4 hover:border-cyberpunk-neon-purple hover:bg-gray-900 peer-data-[state=checked]:border-cyberpunk-neon-purple [&:has([data-state=checked])]:border-cyberpunk-neon-purple"
                    >
                      <div className="mb-2 rounded-md bg-gray-800 p-2">
                        <div className="flex space-x-1">
                          <div className="h-2 w-4 rounded-lg bg-gray-400" />
                          <div className="h-2 w-4 rounded-lg bg-cyberpunk-neon-purple" />
                        </div>
                      </div>
                      <span>System</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Font Size</Label>
                <RadioGroup defaultValue="medium" className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="small" id="font-small" className="peer sr-only" />
                    <Label
                      htmlFor="font-small"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 bg-gray-950 p-4 hover:border-cyberpunk-neon-purple hover:bg-gray-900 peer-data-[state=checked]:border-cyberpunk-neon-purple [&:has([data-state=checked])]:border-cyberpunk-neon-purple"
                    >
                      <span className="text-sm">Small</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="medium" id="font-medium" className="peer sr-only" />
                    <Label
                      htmlFor="font-medium"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 bg-gray-950 p-4 hover:border-cyberpunk-neon-purple hover:bg-gray-900 peer-data-[state=checked]:border-cyberpunk-neon-purple [&:has([data-state=checked])]:border-cyberpunk-neon-purple"
                    >
                      <span className="text-base">Medium</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="large" id="font-large" className="peer sr-only" />
                    <Label
                      htmlFor="font-large"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 bg-gray-950 p-4 hover:border-cyberpunk-neon-purple hover:bg-gray-900 peer-data-[state=checked]:border-cyberpunk-neon-purple [&:has([data-state=checked])]:border-cyberpunk-neon-purple"
                    >
                      <span className="text-lg">Large</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="cyberpunk-input">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white">
                Save Appearance Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-4 space-y-4">
          <Card className="cyberpunk-card">
            <CardHeader>
              <CardTitle>AI Settings</CardTitle>
              <CardDescription>Configure how the AI processes your neural network diagrams</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>AI Sensitivity</Label>
                  <span className="text-cyberpunk-neon-purple">{aiSensitivity}%</span>
                </div>
                <Slider
                  value={[aiSensitivity]}
                  onValueChange={(value) => setAiSensitivity(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="[&>span]:bg-cyberpunk-neon-purple"
                />
                <p className="text-xs text-gray-400">
                  Higher sensitivity means the AI will detect more details in neural network diagrams, but may include
                  more noise.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Processing Mode</Label>
                <RadioGroup defaultValue="balanced" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="speed" id="mode-speed" className="peer sr-only" />
                    <Label
                      htmlFor="mode-speed"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 bg-gray-950 p-4 hover:border-cyberpunk-neon-purple hover:bg-gray-900 peer-data-[state=checked]:border-cyberpunk-neon-purple [&:has([data-state=checked])]:border-cyberpunk-neon-purple"
                    >
                      <span>Speed</span>
                      <span className="text-xs text-gray-400 mt-1">Faster but less detailed</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="balanced" id="mode-balanced" className="peer sr-only" />
                    <Label
                      htmlFor="mode-balanced"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 bg-gray-950 p-4 hover:border-cyberpunk-neon-purple hover:bg-gray-900 peer-data-[state=checked]:border-cyberpunk-neon-purple [&:has([data-state=checked])]:border-cyberpunk-neon-purple"
                    >
                      <span>Balanced</span>
                      <span className="text-xs text-gray-400 mt-1">Recommended setting</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="accuracy" id="mode-accuracy" className="peer sr-only" />
                    <Label
                      htmlFor="mode-accuracy"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 bg-gray-950 p-4 hover:border-cyberpunk-neon-purple hover:bg-gray-900 peer-data-[state=checked]:border-cyberpunk-neon-purple [&:has([data-state=checked])]:border-cyberpunk-neon-purple"
                    >
                      <span>Accuracy</span>
                      <span className="text-xs text-gray-400 mt-1">Slower but more detailed</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save">Auto-Save Generated Text</Label>
                  <Switch id="auto-save" />
                </div>
                <p className="text-xs text-gray-400">Automatically save generated text every 5 minutes</p>
              </div>

              <Button className="bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white">
                Save AI Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="mt-4 space-y-4">
          <Card className="cyberpunk-card">
            <CardHeader>
              <CardTitle>Report Issues</CardTitle>
              <CardDescription>Configure how you can report issues with the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="emergency-contact">Support Contact Email</Label>
                <Input
                  id="emergency-contact"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="support@example.com"
                  className="cyberpunk-input"
                />
                <p className="text-xs text-gray-400">This contact will receive your issue reports</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency-message">Default Report Message</Label>
                <textarea
                  id="emergency-message"
                  value={emergencyMessage}
                  onChange={(e) => setEmergencyMessage(e.target.value)}
                  className="w-full min-h-[100px] p-3 rounded-md bg-cyberpunk-deep-blue/80 border border-cyberpunk-neon-purple/30 text-white resize-none focus:shadow-neon-glow focus:border-cyberpunk-neon-purple focus:outline-none"
                />
                <p className="text-xs text-gray-400">This message will be pre-filled when you report an issue</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emergency-button">Enable Report Button</Label>
                  <Switch id="emergency-button" defaultChecked />
                </div>
                <p className="text-xs text-gray-400">Shows a report button on the dashboard for quick access</p>
              </div>

              <Button className="w-full bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Test Report System
              </Button>

              <Button className="bg-cyberpunk-neon-purple hover:bg-cyberpunk-neon-purple/80 text-white">
                Save Report Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

