import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, Users, TrendingUp } from "lucide-react"

export function StatsOverview() {
  const stats = [
    {
      title: "Documents Processed",
      value: "24",
      description: "Educational materials analyzed",
      icon: FileText,
      trend: "+12% from last month",
    },
    {
      title: "Curricula Generated",
      value: "8",
      description: "Complete course structures created",
      icon: BookOpen,
      trend: "+3 this week",
    },
    {
      title: "Active Courses",
      value: "5",
      description: "Currently running curricula",
      icon: Users,
      trend: "2 starting next week",
    },
    {
      title: "Success Rate",
      value: "94%",
      description: "Student completion rate",
      icon: TrendingUp,
      trend: "+2% improvement",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            <p className="text-xs text-primary mt-1">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
