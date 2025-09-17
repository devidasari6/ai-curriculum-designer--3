import { GraduationCap, Brain } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-primary">
              <GraduationCap className="h-8 w-8" />
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Curriculum Designer</h1>
              <p className="text-sm text-muted-foreground">Intelligent curriculum generation for educators</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">University Assistant</p>
              <p className="text-xs text-muted-foreground">Document Processing & AI Generation</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
