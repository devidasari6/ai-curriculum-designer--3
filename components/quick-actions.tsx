import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Sparkles, FileText, Settings } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to get you started quickly</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <Upload className="h-6 w-6" />
          <span className="text-sm">Upload Documents</span>
        </Button>

        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <Sparkles className="h-6 w-6" />
          <span className="text-sm">Generate Curriculum</span>
        </Button>

        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <FileText className="h-6 w-6" />
          <span className="text-sm">View Templates</span>
        </Button>

        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <Settings className="h-6 w-6" />
          <span className="text-sm">Settings</span>
        </Button>
      </CardContent>
    </Card>
  )
}
