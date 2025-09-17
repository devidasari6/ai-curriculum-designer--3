"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, BookOpen, Clock, Target, CheckCircle } from "lucide-react"
import { CurriculumDisplay } from "./curriculum-display"

interface CurriculumData {
  title: string
  description: string
  duration: string
  skillLevel: string
  totalWeeks: number
  modules: Array<{
    week: number
    title: string
    topics: string[]
    learningObjectives: string[]
    resources: string[]
    exercises: string[]
    assessments: string[]
  }>
  overallObjectives: string[]
  prerequisites: string[]
  finalAssessment: string
}

export function CurriculumGenerator() {
  const [formData, setFormData] = useState({
    subject: "",
    duration: "",
    skillLevel: "",
    customRequirements: "",
    includeWebResources: true,
  })
  const [generating, setGenerating] = useState(false)
  const [curriculum, setCurriculum] = useState<CurriculumData | null>(null)
  const [searchProgress, setSearchProgress] = useState("")

  const handleGenerate = async () => {
    if (!formData.subject || !formData.duration || !formData.skillLevel) {
      return
    }

    setGenerating(true)
    setSearchProgress("Searching for relevant educational resources...")

    try {
      const response = await fetch("/api/curriculum/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: formData.subject,
          duration: formData.duration,
          skillLevel: formData.skillLevel,
          documents: [
            {
              name: "Sample Document.pdf",
              topics: ["fundamentals", "advanced concepts", "practical applications"],
            },
          ],
          customRequirements: formData.customRequirements,
          includeWebResources: formData.includeWebResources,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setCurriculum(result.curriculum)
        setSearchProgress("")
      }
    } catch (error) {
      console.error("Error generating curriculum:", error)
      setSearchProgress("")
    } finally {
      setGenerating(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Curriculum Generator
          </CardTitle>
          <CardDescription>
            Generate structured learning curricula based on your educational materials and requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Course Subject</Label>
              <Input
                id="subject"
                placeholder="e.g., Cloud Computing, Machine Learning"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Course Duration</Label>
              <Select onValueChange={(value) => handleInputChange("duration", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4 weeks">4 Weeks</SelectItem>
                  <SelectItem value="6 weeks">6 Weeks</SelectItem>
                  <SelectItem value="8 weeks">8 Weeks</SelectItem>
                  <SelectItem value="12 weeks">12 Weeks</SelectItem>
                  <SelectItem value="16 weeks">16 Weeks (Full Semester)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skillLevel">Skill Level</Label>
            <Select onValueChange={(value) => handleInputChange("skillLevel", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select skill level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Custom Requirements (Optional)</Label>
            <Textarea
              id="requirements"
              placeholder="Any specific learning outcomes, constraints, or focus areas..."
              value={formData.customRequirements}
              onChange={(e) => handleInputChange("customRequirements", e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="webResources"
              checked={formData.includeWebResources}
              onChange={(e) => handleInputChange("includeWebResources", e.target.checked.toString())}
              className="rounded border-gray-300"
            />
            <Label htmlFor="webResources" className="text-sm">
              Include additional resources from web search (recommended)
            </Label>
          </div>

          {generating && searchProgress && (
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin" />
              {searchProgress}
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={generating || !formData.subject || !formData.duration || !formData.skillLevel}
            className="w-full"
            size="lg"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {searchProgress ? "Finding Resources..." : "Generating Curriculum..."}
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Curriculum with Web Resources
              </>
            )}
          </Button>

          {formData.subject && formData.duration && formData.skillLevel && (
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {formData.subject}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formData.duration}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                {formData.skillLevel}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {curriculum && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Curriculum Generated Successfully!</span>
          </div>
          <CurriculumDisplay curriculum={curriculum} />
        </div>
      )}
    </div>
  )
}
