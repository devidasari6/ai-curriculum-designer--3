import { type NextRequest, NextResponse } from "next/server"

interface CurriculumRequest {
  subject: string
  duration: string
  skillLevel: "Beginner" | "Intermediate" | "Advanced"
  documents: Array<{
    name: string
    topics: string[]
    content?: string
  }>
  customRequirements?: string
  includeWebResources?: boolean
}

interface WeekModule {
  week: number
  title: string
  topics: string[]
  learningObjectives: string[]
  resources: string[]
  exercises: string[]
  assessments: string[]
}

interface CurriculumResponse {
  title: string
  description: string
  duration: string
  skillLevel: string
  totalWeeks: number
  modules: WeekModule[]
  overallObjectives: string[]
  prerequisites: string[]
  finalAssessment: string
}

export async function POST(request: NextRequest) {
  try {
    const data: CurriculumRequest = await request.json()

    if (!data.subject || !data.duration || !data.skillLevel) {
      return NextResponse.json(
        {
          error: "Missing required fields: subject, duration, skillLevel",
        },
        { status: 400 },
      )
    }

    // Generate curriculum using AI logic
    const curriculum = await generateCurriculum(data)

    return NextResponse.json({
      success: true,
      curriculum,
    })
  } catch (error) {
    console.error("Curriculum generation error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate curriculum",
      },
      { status: 500 },
    )
  }
}

async function generateCurriculum(request: CurriculumRequest): Promise<CurriculumResponse> {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  let webResources: Array<{ title: string; url: string; description: string }> = []
  if (request.includeWebResources) {
    webResources = await searchWebResources(request.subject, request.skillLevel)
  }

  const weeks = parseDurationToWeeks(request.duration)
  const modules = generateWeeklyModules(request, weeks, webResources)

  return {
    title: `${request.subject} - ${request.skillLevel} Level`,
    description: `A comprehensive ${weeks}-week curriculum covering ${request.subject} fundamentals and advanced concepts, designed for ${request.skillLevel.toLowerCase()} learners.${request.includeWebResources ? " Enhanced with curated web resources." : ""}`,
    duration: request.duration,
    skillLevel: request.skillLevel,
    totalWeeks: weeks,
    modules: modules,
    overallObjectives: generateOverallObjectives(request),
    prerequisites: generatePrerequisites(request),
    finalAssessment: generateFinalAssessment(request),
  }
}

async function searchWebResources(
  subject: string,
  skillLevel: string,
): Promise<Array<{ title: string; url: string; description: string }>> {
  // Simulate web search delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const searchResults = [
    {
      title: `🌐 ${subject} Tutorial - ${skillLevel} Guide`,
      url: `https://www.coursera.org/search?query=${encodeURIComponent(subject)}`,
      description: `Comprehensive ${skillLevel.toLowerCase()} guide covering ${subject} fundamentals and practical applications.`,
    },
    {
      title: `🌐 ${subject} Documentation and Best Practices`,
      url: `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(subject)}`,
      description: `Official documentation with examples, API references, and industry best practices for ${subject}.`,
    },
    {
      title: `🌐 ${subject} Course Materials - MIT OpenCourseWare`,
      url: `https://ocw.mit.edu/search/?q=${encodeURIComponent(subject)}`,
      description: `Academic course materials including lectures, assignments, and supplementary readings for ${subject}.`,
    },
    {
      title: `🌐 ${subject} Practical Examples - GitHub`,
      url: `https://github.com/search?q=${encodeURIComponent(subject)}&type=repositories`,
      description: `Real-world examples and open-source projects demonstrating ${subject} applications in industry.`,
    },
    {
      title: `🌐 ${subject} Research Papers - Google Scholar`,
      url: `https://scholar.google.com/scholar?q=${encodeURIComponent(subject)}`,
      description: `Latest research publications and academic papers covering advanced topics in ${subject}.`,
    },
    {
      title: `🌐 ${subject} Video Tutorials - YouTube`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(subject + " tutorial")}`,
      description: `Video tutorials and lectures covering ${subject} concepts and practical implementations.`,
    },
  ]

  return searchResults
}

function parseDurationToWeeks(duration: string): number {
  const match = duration.match(/(\d+)/)
  if (match) {
    const num = Number.parseInt(match[1])
    if (duration.includes("week")) return num
    if (duration.includes("month")) return num * 4
  }
  return 8 // Default to 8 weeks
}

function generateWeeklyModules(
  request: CurriculumRequest,
  totalWeeks: number,
  webResources: Array<{ title: string; url: string; description: string }> = [],
): WeekModule[] {
  const modules: WeekModule[] = []
  const allTopics = extractAllTopics(request)
  const topicsPerWeek = Math.ceil(allTopics.length / totalWeeks)

  for (let week = 1; week <= totalWeeks; week++) {
    const startIndex = (week - 1) * topicsPerWeek
    const weekTopics = allTopics.slice(startIndex, startIndex + topicsPerWeek)

    modules.push({
      week: week,
      title: generateWeekTitle(week, weekTopics, request.subject),
      topics: weekTopics,
      learningObjectives: generateWeekObjectives(weekTopics, request.skillLevel),
      resources: generateWeekResources(weekTopics, request.documents, webResources, week, totalWeeks),
      exercises: generateWeekExercises(weekTopics, request.skillLevel),
      assessments: generateWeekAssessments(week, totalWeeks, request.skillLevel),
    })
  }

  return modules
}

function extractAllTopics(request: CurriculumRequest): string[] {
  const topics = new Set<string>()

  // Add topics from documents
  request.documents.forEach((doc) => {
    doc.topics.forEach((topic) => topics.add(topic))
  })

  // Add subject-specific topics based on common curriculum patterns
  const subjectTopics = getSubjectTopics(request.subject, request.skillLevel)
  subjectTopics.forEach((topic) => topics.add(topic))

  return Array.from(topics)
}

function getSubjectTopics(subject: string, level: string): string[] {
  const topicMap: Record<string, Record<string, string[]>> = {
    "Cloud Computing": {
      Beginner: ["Cloud Fundamentals", "IaaS vs PaaS vs SaaS", "AWS Basics", "Virtual Machines", "Storage Solutions"],
      Intermediate: [
        "Container Orchestration",
        "Microservices",
        "Load Balancing",
        "Auto Scaling",
        "Security Best Practices",
      ],
      Advanced: [
        "Multi-Cloud Architecture",
        "Serverless Computing",
        "DevOps Integration",
        "Cost Optimization",
        "Disaster Recovery",
      ],
    },
    "Machine Learning": {
      Beginner: ["ML Fundamentals", "Supervised Learning", "Data Preprocessing", "Linear Regression", "Classification"],
      Intermediate: ["Neural Networks", "Deep Learning", "Feature Engineering", "Model Evaluation", "Cross Validation"],
      Advanced: [
        "Advanced Neural Networks",
        "Transfer Learning",
        "Reinforcement Learning",
        "MLOps",
        "Model Deployment",
      ],
    },
    "Web Development": {
      Beginner: [
        "HTML/CSS Basics",
        "JavaScript Fundamentals",
        "DOM Manipulation",
        "Responsive Design",
        "Version Control",
      ],
      Intermediate: ["React/Vue Framework", "API Integration", "State Management", "Testing", "Build Tools"],
      Advanced: ["Performance Optimization", "Security", "Microservices", "CI/CD", "Cloud Deployment"],
    },
  }

  return (
    topicMap[subject]?.[level] || [
      "Introduction",
      "Core Concepts",
      "Practical Applications",
      "Best Practices",
      "Advanced Topics",
    ]
  )
}

function generateWeekTitle(week: number, topics: string[], subject: string): string {
  if (week === 1) return `Introduction to ${subject}`
  if (topics.length > 0) {
    return `Week ${week}: ${topics[0]}${topics.length > 1 ? " & More" : ""}`
  }
  return `Week ${week}: Advanced Topics`
}

function generateWeekObjectives(topics: string[], level: string): string[] {
  const objectives = []

  topics.forEach((topic) => {
    switch (level) {
      case "Beginner":
        objectives.push(`Understand the basics of ${topic}`)
        objectives.push(`Identify key concepts in ${topic}`)
        break
      case "Intermediate":
        objectives.push(`Apply ${topic} in practical scenarios`)
        objectives.push(`Analyze ${topic} implementations`)
        break
      case "Advanced":
        objectives.push(`Design solutions using ${topic}`)
        objectives.push(`Evaluate and optimize ${topic} approaches`)
        break
    }
  })

  return objectives.slice(0, 4) // Limit to 4 objectives per week
}

function generateWeekResources(
  topics: string[],
  documents: Array<{ name: string; topics: string[] }>,
  webResources: Array<{ title: string; url: string; description: string }> = [],
  week: number,
  totalWeeks: number,
): string[] {
  const resources = []

  // Match documents to topics
  documents.forEach((doc) => {
    const hasMatchingTopic = topics.some((topic) =>
      doc.topics.some(
        (docTopic) =>
          docTopic.toLowerCase().includes(topic.toLowerCase()) || topic.toLowerCase().includes(docTopic.toLowerCase()),
      ),
    )

    if (hasMatchingTopic) {
      resources.push(`📄 ${doc.name} (pages relevant to ${topics[0]})`)
    }
  })

  // Add web resources distributed across weeks
  const resourcesPerWeek = Math.ceil(webResources.length / totalWeeks)
  const startIndex = (week - 1) * resourcesPerWeek
  const weekWebResources = webResources.slice(startIndex, startIndex + resourcesPerWeek)

  weekWebResources.forEach((resource) => {
    resources.push(`🌐 ${resource.title} - ${resource.url}`)
  })

  // Add generic resources
  topics.forEach((topic) => {
    resources.push(`📚 Online tutorial: ${topic} fundamentals`)
    resources.push(`📖 Research paper: Latest developments in ${topic}`)
  })

  return resources.slice(0, 6) // Increased limit to accommodate web resources
}

function generateWeekExercises(topics: string[], level: string): string[] {
  const exercises = []

  topics.forEach((topic) => {
    switch (level) {
      case "Beginner":
        exercises.push(`Complete basic ${topic} tutorial`)
        exercises.push(`Write a summary of ${topic} concepts`)
        break
      case "Intermediate":
        exercises.push(`Implement a ${topic} solution`)
        exercises.push(`Compare different ${topic} approaches`)
        break
      case "Advanced":
        exercises.push(`Design and build a ${topic} system`)
        exercises.push(`Optimize existing ${topic} implementation`)
        break
    }
  })

  return exercises.slice(0, 3) // Limit to 3 exercises per week
}

function generateWeekAssessments(week: number, totalWeeks: number, level: string): string[] {
  const assessments = []

  if (week % 2 === 0) {
    // Every other week
    assessments.push("Quiz on weekly topics (20 points)")
  }

  if (week === Math.floor(totalWeeks / 2)) {
    // Midterm
    assessments.push("Midterm project presentation (100 points)")
  }

  if (week === totalWeeks) {
    // Final week
    assessments.push("Final comprehensive exam (150 points)")
    assessments.push("Final project submission (200 points)")
  }

  if (assessments.length === 0) {
    assessments.push("Participation and discussion (10 points)")
  }

  return assessments
}

function generateOverallObjectives(request: CurriculumRequest): string[] {
  const objectives = [
    `Master fundamental concepts of ${request.subject}`,
    `Apply ${request.subject} principles to solve real-world problems`,
    `Develop practical skills through hands-on exercises`,
    `Understand industry best practices and current trends`,
  ]

  if (request.skillLevel === "Advanced") {
    objectives.push("Design and implement complex systems")
    objectives.push("Lead technical discussions and mentor others")
  }

  return objectives
}

function generatePrerequisites(request: CurriculumRequest): string[] {
  const prerequisites = []

  switch (request.skillLevel) {
    case "Beginner":
      prerequisites.push("Basic computer literacy")
      prerequisites.push("High school mathematics")
      break
    case "Intermediate":
      prerequisites.push("Completion of beginner-level course or equivalent experience")
      prerequisites.push("Familiarity with basic programming concepts")
      break
    case "Advanced":
      prerequisites.push("Intermediate-level knowledge of the subject")
      prerequisites.push("2+ years of practical experience")
      prerequisites.push("Strong analytical and problem-solving skills")
      break
  }

  return prerequisites
}

function generateFinalAssessment(request: CurriculumRequest): string {
  const assessmentTypes = {
    Beginner: "Comprehensive final exam (60%) + practical project (40%)",
    Intermediate: "Capstone project (50%) + technical presentation (30%) + peer review (20%)",
    Advanced: "Original research project (40%) + implementation (35%) + technical leadership demonstration (25%)",
  }

  return assessmentTypes[request.skillLevel] || "Final project and presentation"
}
