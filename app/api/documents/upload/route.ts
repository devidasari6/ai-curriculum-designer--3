import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    const processedFiles = []

    for (const file of files) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "text/plain",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]

      if (!allowedTypes.includes(file.type)) {
        continue
      }

      let content = ""

      // Process different file types
      if (file.type === "text/plain") {
        content = await file.text()
      } else if (file.type === "application/pdf") {
        // In a real implementation, you'd use a PDF parsing library
        content = `[PDF Content] ${file.name} - ${file.size} bytes`
      } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        // In a real implementation, you'd use a DOCX parsing library
        content = `[DOCX Content] ${file.name} - ${file.size} bytes`
      }

      // Extract topics using simple keyword matching (in real app, use AI)
      const topics = extractTopics(content)

      processedFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        content: content.substring(0, 1000), // Truncate for demo
        topics,
        uploadDate: new Date().toISOString(),
        processed: true,
      })
    }

    return NextResponse.json({
      success: true,
      files: processedFiles,
      message: `${processedFiles.length} files processed successfully`,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

function extractTopics(content: string): string[] {
  const keywords = [
    "machine learning",
    "artificial intelligence",
    "deep learning",
    "neural networks",
    "cloud computing",
    "aws",
    "azure",
    "docker",
    "kubernetes",
    "database",
    "sql",
    "nosql",
    "mongodb",
    "postgresql",
    "web development",
    "react",
    "javascript",
    "typescript",
    "node.js",
    "data science",
    "python",
    "statistics",
    "analytics",
    "cybersecurity",
    "encryption",
    "authentication",
    "security",
    "software engineering",
    "algorithms",
    "data structures",
  ]

  const foundTopics = keywords.filter((keyword) => content.toLowerCase().includes(keyword.toLowerCase()))

  return foundTopics.slice(0, 5) // Limit to 5 topics
}
