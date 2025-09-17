"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { documentStore, type UploadedDocument } from "@/lib/document-store"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  content?: string
}

export function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const { toast } = useToast()

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      processFiles(selectedFiles)
    }
  }

  const processFiles = async (fileList: File[]) => {
    const validFiles = fileList.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "text/plain" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    )

    if (validFiles.length !== fileList.length) {
      toast({
        title: "Invalid file type",
        description: "Only PDF, TXT, and DOCX files are supported.",
        variant: "destructive",
      })
    }

    for (const file of validFiles) {
      const url = URL.createObjectURL(file)

      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
      }

      // Simulate file processing
      if (file.type === "text/plain") {
        const content = await file.text()
        newFile.content = content
      }

      const document: UploadedDocument = {
        id: newFile.id,
        name: newFile.name,
        size: newFile.size,
        type: file.type === "application/pdf" ? "PDF" : file.type === "text/plain" ? "TXT" : "DOCX",
        uploadDate: new Date().toISOString().split("T")[0],
        pages: Math.floor(Math.random() * 50) + 5, // Simulated page count
        topics: generateTopics(newFile.name),
        content: newFile.content,
        url: url,
      }

      documentStore.addDocument(document)
      setFiles((prev) => [...prev, newFile])
    }

    toast({
      title: "Files uploaded",
      description: `${validFiles.length} file(s) processed successfully.`,
    })
  }

  const generateTopics = (filename: string): string[] => {
    const name = filename.toLowerCase()
    if (name.includes("cloud")) return ["AWS", "Azure", "Cloud Architecture"]
    if (name.includes("machine") || name.includes("ml")) return ["Neural Networks", "Deep Learning", "Python"]
    if (name.includes("database") || name.includes("db")) return ["SQL", "NoSQL", "Database Modeling"]
    if (name.includes("web")) return ["HTML", "CSS", "JavaScript"]
    if (name.includes("data")) return ["Data Science", "Analytics", "Statistics"]
    return ["Programming", "Computer Science", "Technology"]
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
    documentStore.removeDocument(id)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Document Upload
        </CardTitle>
        <CardDescription>Upload educational documents (PDF, TXT, DOCX) to generate curricula</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to select</p>
          <input
            type="file"
            multiple
            accept=".pdf,.txt,.docx"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <Button asChild variant="outline" size="sm">
            <label htmlFor="file-upload" className="cursor-pointer">
              Choose Files
            </label>
          </Button>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Uploaded Files:</h4>
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-2 bg-muted rounded">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
