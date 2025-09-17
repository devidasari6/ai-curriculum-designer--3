"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Calendar, Users, Clock, Eye, Edit, Share, Download } from "lucide-react"

const sampleCurricula = [
  {
    id: "1",
    title: "Cloud Computing Fundamentals",
    description: "Complete introduction to cloud technologies and services",
    subject: "Cloud Computing",
    level: "Beginner",
    duration: "8 weeks",
    status: "Active",
    createdDate: "2024-01-15",
    lastModified: "2024-01-20",
    enrolledStudents: 45,
    completionRate: 87,
    modules: 8,
    totalHours: 32,
  },
  {
    id: "2",
    title: "Machine Learning Bootcamp",
    description: "Hands-on ML course with Python and TensorFlow",
    subject: "Machine Learning",
    level: "Intermediate",
    duration: "12 weeks",
    status: "Draft",
    createdDate: "2024-01-12",
    lastModified: "2024-01-18",
    enrolledStudents: 0,
    completionRate: 0,
    modules: 12,
    totalHours: 48,
  },
  {
    id: "3",
    title: "Web Development Mastery",
    description: "Full-stack development with modern frameworks",
    subject: "Web Development",
    level: "Advanced",
    duration: "16 weeks",
    status: "Completed",
    createdDate: "2023-12-01",
    lastModified: "2024-01-10",
    enrolledStudents: 32,
    completionRate: 94,
    modules: 16,
    totalHours: 64,
  },
]

export function CurriculumManager() {
  const [curricula, setCurricula] = useState(sampleCurricula)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLevel, setFilterLevel] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredCurricula = curricula.filter((curriculum) => {
    const matchesSearch =
      curriculum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curriculum.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = filterLevel === "all" || curriculum.level === filterLevel
    const matchesStatus = filterStatus === "all" || curriculum.status === filterStatus

    return matchesSearch && matchesLevel && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Curriculum Management</CardTitle>
          <CardDescription>Manage and track your generated curricula</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search curricula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Curricula Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCurricula.map((curriculum) => (
              <Card key={curriculum.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <Badge className={getStatusColor(curriculum.status)}>{curriculum.status}</Badge>
                    </div>
                    <Badge className={getLevelColor(curriculum.level)}>{curriculum.level}</Badge>
                  </div>
                  <CardTitle className="text-lg">{curriculum.title}</CardTitle>
                  <CardDescription>{curriculum.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{curriculum.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{curriculum.enrolledStudents} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{curriculum.modules} modules</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{curriculum.totalHours}h total</span>
                    </div>
                  </div>

                  {curriculum.status === "Active" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion Rate</span>
                        <span>{curriculum.completionRate}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${curriculum.completionRate}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-muted-foreground">Modified {curriculum.lastModified}</div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCurricula.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No curricula found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
