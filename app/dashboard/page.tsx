"use client"
import { Header } from "@/components/header"
import { DocumentManager } from "@/components/document-manager"
import { CurriculumManager } from "@/components/curriculum-manager"
import { AnalyticsOverview } from "@/components/analytics-overview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Management Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive overview of your educational content and curricula</p>
          </div>

          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="curricula">Curricula</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsOverview />
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <DocumentManager />
            </TabsContent>

            <TabsContent value="curricula" className="space-y-6">
              <CurriculumManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
