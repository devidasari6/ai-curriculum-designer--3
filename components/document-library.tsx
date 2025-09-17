"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Library, FileText, Calendar, Eye, Download } from "lucide-react"
import { documentStore, type UploadedDocument } from "@/lib/document-store"

export function DocumentLibrary() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [selectedDocument, setSelectedDocument] = useState<UploadedDocument | null>(null)

  useEffect(() => {
    const updateDocuments = () => {
      setDocuments(documentStore.getDocuments())
    }

    updateDocuments()
    const unsubscribe = documentStore.subscribe(updateDocuments)

    return unsubscribe
  }, [])

  const handleViewDocument = (doc: UploadedDocument) => {
    setSelectedDocument(doc)
  }

  const handleDownloadDocument = (doc: UploadedDocument) => {
    if (doc.url) {
      const link = document.createElement("a")
      link.href = doc.url
      link.download = doc.name
      link.click()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Library className="h-5 w-5" />
          Document Library
        </CardTitle>
        <CardDescription>
          {documents.length > 0 ? `${documents.length} uploaded educational materials` : "No documents uploaded yet"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {documents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No documents uploaded yet.</p>
            <p className="text-sm">Upload documents in the "Manage Documents" tab to get started.</p>
          </div>
        ) : (
          documents.map((doc) => (
            <div key={doc.id} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {doc.uploadDate}
                      <span>•</span>
                      <span>{doc.pages} pages</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {doc.type}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1">
                {doc.topics.map((topic) => (
                  <Badge key={topic} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleViewDocument(doc)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>{selectedDocument?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 overflow-auto">
                      {selectedDocument?.type === "PDF" && selectedDocument.url && (
                        <iframe
                          src={selectedDocument.url}
                          className="w-full h-[60vh] border rounded"
                          title={selectedDocument.name}
                        />
                      )}
                      {selectedDocument?.type === "TXT" && selectedDocument.content && (
                        <div className="bg-muted p-4 rounded text-sm font-mono whitespace-pre-wrap max-h-[60vh] overflow-auto">
                          {selectedDocument.content}
                        </div>
                      )}
                      {selectedDocument?.type === "DOCX" && (
                        <div className="text-center py-8 text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-4" />
                          <p>DOCX preview not available.</p>
                          <p className="text-sm">Download the file to view its contents.</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(doc)}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
