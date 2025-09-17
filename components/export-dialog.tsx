"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, File, Code, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExportDialogProps {
  curriculum: any
  trigger?: React.ReactNode
}

export function ExportDialog({ curriculum, trigger }: ExportDialogProps) {
  const [format, setFormat] = useState("markdown")
  const [includeDetails, setIncludeDetails] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const formatOptions = [
    {
      value: "markdown",
      label: "Markdown (.md)",
      description: "Plain text format with formatting",
      icon: FileText,
    },
    {
      value: "pdf",
      label: "PDF Document",
      description: "Formatted document for printing",
      icon: File,
    },
    {
      value: "docx",
      label: "Word Document (.docx)",
      description: "Microsoft Word format",
      icon: File,
    },
    {
      value: "json",
      label: "JSON Data (.json)",
      description: "Structured data format",
      icon: Code,
    },
  ]

  const handleExport = async () => {
    setExporting(true)

    try {
      const response = await fetch("/api/curriculum/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curriculum,
          format,
          includeDetails,
        }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url

        // Get filename from response headers or generate one
        const contentDisposition = response.headers.get("content-disposition")
        const filename = contentDisposition
          ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
          : `${curriculum.title.replace(/\s+/g, "_")}_Curriculum.${format}`

        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        toast({
          title: "Export successful",
          description: `Curriculum exported as ${format.toUpperCase()}`,
        })

        setOpen(false)
      } else {
        throw new Error("Export failed")
      }
    } catch (error) {
      console.error("Export error:", error)
      toast({
        title: "Export failed",
        description: "There was an error exporting the curriculum",
        variant: "destructive",
      })
    } finally {
      setExporting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Curriculum</DialogTitle>
          <DialogDescription>
            Choose your preferred format and options for exporting "{curriculum?.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Export Format</Label>
            <RadioGroup value={format} onValueChange={setFormat}>
              {formatOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div className="flex items-center space-x-3 flex-1">
                    <option.icon className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-1">
                      <Label htmlFor={option.value} className="text-sm font-medium cursor-pointer">
                        {option.label}
                      </Label>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Export Options</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="includeDetails" checked={includeDetails} onCheckedChange={setIncludeDetails} />
              <Label htmlFor="includeDetails" className="text-sm cursor-pointer">
                Include detailed content (objectives, resources, exercises)
              </Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={exporting}>
              {exporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
