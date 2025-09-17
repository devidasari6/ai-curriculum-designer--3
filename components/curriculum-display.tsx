"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Clock, Target, Share, ExternalLink } from "lucide-react"
import { ExportDialog } from "./export-dialog"

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

interface CurriculumDisplayProps {
  curriculum: CurriculumData
}

export function CurriculumDisplay({ curriculum }: CurriculumDisplayProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: curriculum.title,
          text: curriculum.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="space-y-6">
      {/* Curriculum Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{curriculum.title}</CardTitle>
              <CardDescription className="text-base">{curriculum.description}</CardDescription>
            </div>
            <div className="flex gap-2">
              <ExportDialog curriculum={curriculum} />
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {curriculum.duration}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {curriculum.skillLevel}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {curriculum.totalWeeks} Weeks
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Course Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Learning Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {curriculum.overallObjectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  {objective}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Prerequisites</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {curriculum.prerequisites.map((prerequisite, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  {prerequisite}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Modules */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Curriculum</CardTitle>
          <CardDescription>Detailed breakdown of topics, objectives, and assessments for each week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {curriculum.modules.map((module, index) => (
            <div key={module.week} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {module.week}
                </div>
                <h3 className="text-lg font-semibold">{module.title}</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ml-11">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">TOPICS</h4>
                    <div className="flex flex-wrap gap-1">
                      {module.topics.map((topic, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">LEARNING OBJECTIVES</h4>
                    <ul className="space-y-1">
                      {module.learningObjectives.map((objective, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">RESOURCES</h4>
                    <ul className="space-y-1">
                      {module.resources.slice(0, 3).map((resource, i) => {
                        const urlMatch = resource.match(/- (https?:\/\/[^\s]+)$/)
                        const hasUrl = urlMatch && urlMatch[1]

                        if (hasUrl) {
                          const url = urlMatch[1]
                          const title = resource.replace(` - ${url}`, "")
                          return (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-1"
                              >
                                {title}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </li>
                          )
                        }

                        return (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {resource}
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">EXERCISES</h4>
                    <ul className="space-y-1">
                      {module.exercises.map((exercise, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {exercise}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {module.assessments.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">ASSESSMENTS</h4>
                      <ul className="space-y-1">
                        {module.assessments.map((assessment, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {assessment}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {index < curriculum.modules.length - 1 && <Separator className="ml-11" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Final Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Final Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{curriculum.finalAssessment}</p>
        </CardContent>
      </Card>
    </div>
  )
}

function generateCurriculumText(curriculum: CurriculumData): string {
  let text = `# ${curriculum.title}\n\n`
  text += `${curriculum.description}\n\n`
  text += `**Duration:** ${curriculum.duration}\n`
  text += `**Skill Level:** ${curriculum.skillLevel}\n`
  text += `**Total Weeks:** ${curriculum.totalWeeks}\n\n`

  text += `## Learning Objectives\n\n`
  curriculum.overallObjectives.forEach((obj) => {
    text += `- ${obj}\n`
  })

  text += `\n## Prerequisites\n\n`
  curriculum.prerequisites.forEach((prereq) => {
    text += `- ${prereq}\n`
  })

  text += `\n## Weekly Curriculum\n\n`
  curriculum.modules.forEach((module) => {
    text += `### Week ${module.week}: ${module.title}\n\n`
    text += `**Topics:** ${module.topics.join(", ")}\n\n`
    text += `**Learning Objectives:**\n`
    module.learningObjectives.forEach((obj) => {
      text += `- ${obj}\n`
    })
    text += `\n**Resources:**\n`
    module.resources.forEach((resource) => {
      text += `- ${resource}\n`
    })
    text += `\n**Exercises:**\n`
    module.exercises.forEach((exercise) => {
      text += `- ${exercise}\n`
    })
    if (module.assessments.length > 0) {
      text += `\n**Assessments:**\n`
      module.assessments.forEach((assessment) => {
        text += `- ${assessment}\n`
      })
    }
    text += `\n---\n\n`
  })

  text += `## Final Assessment\n\n`
  text += `${curriculum.finalAssessment}\n`

  return text
}
