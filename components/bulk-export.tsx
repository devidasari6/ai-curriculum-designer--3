"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Download, Package, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BulkExportProps {
  curricula: Array<{
    id: string
    title: string
    subject: string
    level: string
    status: string
  }>
}

export function BulkExport({ curricula }: BulkExportProps) {
  const [selectedCurricula, setSelectedCurricula] = useState<string[]>([])
  const [format, setFormat] = useState("markdown")
  const [exporting, setExporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCurricula(curricula.map((c) => c.id))
    } else {
      setSelectedCurricula([])
    }
  }

  const handleSelectCurriculum = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCurricula((prev) => [...prev, id])
    } else {
      setSelectedCurricula((prev) => prev.filter((cId) => cId !== id))
    }
  }

  const handleBulkExport = async () => {
    if (selectedCurricula.length === 0) {
      toast({
        title: "No curricula selected",
        description: "Please select at least one curriculum to export",
        variant: "destructive",
      })
      return
    }

    setExporting(true)
    setProgress(0)

    try {
      // Simulate bulk export process
      for (let i = 0; i < selectedCurricula.length; i++) {
        // In a real implementation, you'd export each curriculum
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setProgress(((i + 1) / selectedCurricula.length) * 100)
      }

      // Create a zip file with all exports (simulated)
      toast({
        title: "Bulk export completed",
        description: `${selectedCurricula.length} curricula exported successfully`,
      })
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error during bulk export",
        variant: "destructive",
      })
    } finally {
      setExporting(false)
      setProgress(0)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Bulk Export
        </CardTitle>
        <CardDescription>Export multiple curricula at once in your preferred format</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all"
              checked={selectedCurricula.length === curricula.length}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm font-medium">
              Select All ({curricula.length})
            </label>
          </div>

          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="markdown">Markdown</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="docx">Word</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="max-h-60 overflow-y-auto space-y-2 border rounded-lg p-3">
          {curricula.map((curriculum) => (
            <div key={curriculum.id} className="flex items-center space-x-2 p-2 hover:bg-muted rounded">
              <Checkbox
                id={curriculum.id}
                checked={selectedCurricula.includes(curriculum.id)}
                onCheckedChange={(checked) => handleSelectCurriculum(curriculum.id, checked as boolean)}
              />
              <div className="flex-1">
                <label htmlFor={curriculum.id} className="text-sm font-medium cursor-pointer">
                  {curriculum.title}
                </label>
                <p className="text-xs text-muted-foreground">
                  {curriculum.subject} • {curriculum.level}
                </p>
              </div>
            </div>
          ))}
        </div>

        {exporting && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">Exporting curricula... {Math.round(progress)}%</p>
          </div>
        )}

        <Button onClick={handleBulkExport} disabled={exporting || selectedCurricula.length === 0} className="w-full">
          {exporting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Exporting {selectedCurricula.length} curricula...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Export {selectedCurricula.length} Selected
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
