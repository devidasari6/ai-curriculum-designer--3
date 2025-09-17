import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ArrowRight } from "lucide-react"

const templates = [
  {
    id: 1,
    title: "Cloud Computing Fundamentals",
    description: "Complete introduction to cloud technologies and services",
    duration: "8 weeks",
    level: "Beginner",
    topics: ["AWS", "Azure", "Docker", "Kubernetes"],
    students: 150,
  },
  {
    id: 2,
    title: "Machine Learning Bootcamp",
    description: "Hands-on ML course with Python and TensorFlow",
    duration: "12 weeks",
    level: "Intermediate",
    topics: ["Python", "TensorFlow", "Neural Networks", "Deep Learning"],
    students: 89,
  },
  {
    id: 3,
    title: "Web Development Mastery",
    description: "Full-stack development with modern frameworks",
    duration: "16 weeks",
    level: "Advanced",
    topics: ["React", "Node.js", "MongoDB", "TypeScript"],
    students: 67,
  },
]

export function CurriculumTemplates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Templates</CardTitle>
        <CardDescription>Pre-built curriculum templates you can customize</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {templates.map((template) => (
          <div key={template.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{template.title}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
              <Badge variant="outline">{template.level}</Badge>
            </div>

            <div className="flex flex-wrap gap-1">
              {template.topics.map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {template.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {template.students} students
                </div>
              </div>

              <Button variant="ghost" size="sm">
                Use Template
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
