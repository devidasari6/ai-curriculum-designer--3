import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, BookOpen, Sparkles } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "document",
    title: "Cloud Computing Fundamentals.pdf",
    description: "Document uploaded and processed",
    timestamp: "2 hours ago",
    icon: FileText,
    status: "completed",
  },
  {
    id: 2,
    type: "curriculum",
    title: "Machine Learning Course",
    description: "Curriculum generated for 8-week course",
    timestamp: "4 hours ago",
    icon: BookOpen,
    status: "completed",
  },
  {
    id: 3,
    type: "analysis",
    title: "Database Design Notes.txt",
    description: "AI analysis completed",
    timestamp: "1 day ago",
    icon: Sparkles,
    status: "completed",
  },
  {
    id: 4,
    type: "curriculum",
    title: "Web Development Bootcamp",
    description: "Curriculum generation in progress",
    timestamp: "2 days ago",
    icon: BookOpen,
    status: "processing",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and generated content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <activity.icon className="h-4 w-4 text-primary" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.title}</p>
                <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="text-xs">
                  {activity.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{activity.description}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {activity.timestamp}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
