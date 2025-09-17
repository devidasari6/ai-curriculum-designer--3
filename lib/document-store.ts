interface UploadedDocument {
  id: string
  name: string
  size: number
  type: string
  uploadDate: string
  pages?: number
  topics: string[]
  content?: string
  url?: string
}

class DocumentStore {
  private documents: UploadedDocument[] = []
  private listeners: (() => void)[] = []

  addDocument(doc: UploadedDocument) {
    this.documents.push(doc)
    this.notifyListeners()
  }

  removeDocument(id: string) {
    this.documents = this.documents.filter((doc) => doc.id !== id)
    this.notifyListeners()
  }

  getDocuments(): UploadedDocument[] {
    return [...this.documents]
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener())
  }
}

export const documentStore = new DocumentStore()
export type { UploadedDocument }
