"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { DocumentUpload } from "@/components/document-upload"
import { CurriculumGenerator } from "@/components/curriculum-generator"
import { DocumentLibrary } from "@/components/document-library"
import { DocumentProcessor } from "@/components/document-processor"
import { StatsOverview } from "@/components/stats-overview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { documentStore } from "@/lib/document-store"

export default function HomePage() {
  const [uploadedFiles, setUploadedFiles] = useState(documentStore.getDocuments())

  useEffect(() => {
    const handleUpdate = () => {
      setUploadedFiles(documentStore.getDocuments())
    }

    // Subscribe to document store updates
    const unsubscribe = documentStore.subscribe(handleUpdate)

    return unsubscribe
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <StatsOverview />

          {/* Main Content Tabs */}
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="generate">Generate Curriculum</TabsTrigger>
              <TabsTrigger value="documents">Manage Documents</TabsTrigger>
              <TabsTrigger value="analyze">Analyze Content</TabsTrigger>
              <TabsTrigger value="library">Document Library</TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-6">
              <CurriculumGenerator />
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DocumentUpload />
                <DocumentProcessor files={uploadedFiles} />
              </div>
            </TabsContent>

            <TabsContent value="analyze" className="space-y-6">
              {uploadedFiles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No documents uploaded yet.</p>
                  <p className="text-sm text-muted-foreground">
                    Upload documents in the "Manage Documents" tab to analyze their content.
                  </p>
                </div>
              ) : (
                <DocumentProcessor files={uploadedFiles} />
              )}
            </TabsContent>

            <TabsContent value="library" className="space-y-6">
              <DocumentLibrary />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
