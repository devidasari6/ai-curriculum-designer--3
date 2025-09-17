"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Loader2, FileText, Brain, CheckCircle, AlertCircle } from "lucide-react"

interface DocumentAnalysis {
  fileName: string
  wordCount: number
  readingTime: number
  concepts: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  suggestedDuration: string
  keyTopics: string[]
  learningObjectives: string[]
  assessmentSuggestions: string[]
}

interface DocumentProcessorProps {
  files: Array<{
    id: string
    name: string
    content?: string
    type?: string
  }>
}

export function DocumentProcessor({ files }: DocumentProcessorProps) {
  const [processing, setProcessing] = useState(false)
  const [analyses, setAnalyses] = useState<DocumentAnalysis[]>([])
  const [progress, setProgress] = useState(0)
  const [processedFileIds, setProcessedFileIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const newFiles = files.filter((file) => !processedFileIds.has(file.id))
    if (newFiles.length > 0 && !processing) {
      processDocuments(newFiles)
    }
  }, [files, processedFileIds, processing])

  const processDocuments = async (filesToProcess = files) => {
    if (filesToProcess.length === 0) return

    setProcessing(true)
    setProgress(0)
    const newAnalyses: DocumentAnalysis[] = []

    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i]

      try {
        const mockAnalysis: DocumentAnalysis = {
          fileName: file.name,
          wordCount: Math.floor(Math.random() * 5000) + 1000,
          readingTime: Math.floor(Math.random() * 30) + 5,
          concepts: generateConcepts(file.name),
          difficulty: generateDifficulty(file.name),
          suggestedDuration: generateDuration(file.name),
          keyTopics: generateKeyTopics(file.name),
          learningObjectives: generateLearningObjectives(file.name),
          assessmentSuggestions: generateAssessments(file.name),
        }

        newAnalyses.push(mockAnalysis)

        setProcessedFileIds((prev) => new Set([...prev, file.id]))

        setProgress(((i + 1) / filesToProcess.length) * 100)

        await new Promise((resolve) => setTimeout(resolve, 500))
      } catch (error) {
        console.error("Error processing file:", file.name, error)
      }
    }

    setAnalyses((prev) => [...prev, ...newAnalyses])
    setProcessing(false)
  }

  const generateConcepts = (filename: string): string[] => {
    const name = filename.toLowerCase()
    if (name.includes("cloud")) return ["Virtualization", "Scalability", "Distributed Systems"]
    if (name.includes("machine") || name.includes("ml")) return ["Algorithms", "Statistics", "Pattern Recognition"]
    if (name.includes("database")) return ["Normalization", "Indexing", "Query Optimization"]
    return ["Fundamentals", "Best Practices", "Implementation"]
  }

  const generateDifficulty = (filename: string): "Beginner" | "Intermediate" | "Advanced" => {
    const difficulties: ("Beginner" | "Intermediate" | "Advanced")[] = ["Beginner", "Intermediate", "Advanced"]
    return difficulties[Math.floor(Math.random() * difficulties.length)]
  }

  const generateDuration = (filename: string): string => {
    const durations = ["2-3 weeks", "4-6 weeks", "6-8 weeks", "8-12 weeks"]
    return durations[Math.floor(Math.random() * durations.length)]
  }

  const generateKeyTopics = (filename: string): string[] => {
    const name = filename.toLowerCase()
    if (name.includes("cloud")) return ["AWS Services", "Cloud Architecture", "DevOps", "Security"]
    if (name.includes("machine")) return ["Neural Networks", "Deep Learning", "Python", "TensorFlow"]
    if (name.includes("database")) return ["SQL", "NoSQL", "Database Design", "Performance"]
    return ["Core Concepts", "Practical Applications", "Industry Standards"]
  }

  const generateLearningObjectives = (filename: string): string[] => {
    return [
      "Understand fundamental concepts and principles",
      "Apply theoretical knowledge to practical scenarios",
      "Analyze complex problems and develop solutions",
      "Evaluate different approaches and methodologies",
    ]
  }

  const generateAssessments = (filename: string): string[] => {
    return [
      "Multiple choice quiz on key concepts",
      "Hands-on project implementation",
      "Case study analysis and presentation",
      "Final comprehensive examination",
    ]
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Document Analysis
        </CardTitle>
        <CardDescription>AI-powered analysis of uploaded educational materials</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {files.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">No documents to analyze</p>
            <p className="text-sm text-muted-foreground">Upload documents to see AI-powered content analysis</p>
          </div>
        ) : (
          <>
            {files.length > 0 && (
              <div className="space-y-4">
                <Button
                  onClick={() => processDocuments()}
                  disabled={processing}
                  className="w-full"
                  variant={analyses.length > 0 ? "outline" : "default"}
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing Documents...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      {analyses.length > 0 ? "Re-analyze Documents" : `Analyze Documents (${files.length})`}
                    </>
                  )}
                </Button>

                {processing && (
                  <div className="space-y-2">
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground text-center">{Math.round(progress)}% complete</p>
                  </div>
                )}
              </div>
            )}

            {analyses.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Analysis Complete ({analyses.length} documents)</span>
                </div>

                {analyses.map((analysis, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">{analysis.fileName}</span>
                      </div>
                      <Badge className={getDifficultyColor(analysis.difficulty)}>{analysis.difficulty}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Word Count:</span>
                        <span className="ml-2 font-medium">{analysis.wordCount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reading Time:</span>
                        <span className="ml-2 font-medium">{analysis.readingTime} min</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Suggested Duration:</span>
                        <span className="ml-2 font-medium">{analysis.suggestedDuration}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Key Topics:</span>
                        <span className="ml-2 font-medium">{analysis.keyTopics.length}</span>
                      </div>
                    </div>

                    {analysis.keyTopics.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Key Topics:</p>
                        <div className="flex flex-wrap gap-1">
                          {analysis.keyTopics.map((topic, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {analysis.learningObjectives.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Learning Objectives:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {analysis.learningObjectives.slice(0, 3).map((objective, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
