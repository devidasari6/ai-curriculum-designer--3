"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Search, Download, Trash2, Eye, Edit } from "lucide-react"

const sampleDocuments = [
  {
    id: "1",
    name: "Cloud Computing Fundamentals.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    lastModified: "2024-01-15",
    status: "Processed",
    topics: ["AWS", "Azure", "Cloud Architecture"],
    wordCount: 12500,
    pages: 45,
  },
  {
    id: "2",
    name: "Machine Learning Syllabus.docx",
    type: "DOCX",
    size: "856 KB",
    uploadDate: "2024-01-12",
    lastModified: "2024-01-14",
    status: "Processed",
    topics: ["Neural Networks", "Deep Learning", "Python"],
    wordCount: 8200,
    pages: 12,
  },
  {
    id: "3",
    name: "Database Design Notes.txt",
    type: "TXT",
    size: "124 KB",
    uploadDate: "2024-01-10",
    lastModified: "2024-01-10",
    status: "Processing",
    topics: ["SQL", "NoSQL", "Database Modeling"],
    wordCount: 3400,
    pages: 8,
  },
  {
    id: "4",
    name: "Web Development Guide.pdf",
    type: "PDF",
    size: "3.1 MB",
    uploadDate: "2024-01-08",
    lastModified: "2024-01-09",
    status: "Processed",
    topics: ["React", "JavaScript", "HTML/CSS"],
    wordCount: 15600,
    pages: 62,
  },
]

export function DocumentManager() {
  const [documents, setDocuments] = useState(sampleDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType === "all" || doc.type === filterType
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processed":
        return "bg-green-100 text-green-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
          <CardDescription>Manage and organize your educational documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="DOCX">DOCX</SelectItem>
                <SelectItem value="TXT">TXT</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Processed">Processed</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Documents Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Topics</TableHead>
                  <TableHead>Modified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.wordCount.toLocaleString()} words • {doc.pages} pages
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.type}</Badge>
                    </TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {doc.topics.slice(0, 2).map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {doc.topics.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{doc.topics.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{doc.lastModified}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No documents found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
