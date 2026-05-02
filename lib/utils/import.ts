import { toast } from "sonner"
import { generateId } from "./generator-id"

export const onReadFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const data = JSON.parse(content)
        
        if (Array.isArray(data)) {
          resolve(data.map(data => ({
            ...data,
            id: generateId()
          })))
        } else {
          reject(toast.error("Invalid format Data", { position: 'top-center' }))
        }
      } catch (err) {
        reject(toast.error("Failed to parse JSON file", { position: 'top-center' }))
      }
    }

    reader.onerror = () => reject(toast.error("File reading error", { position: 'top-center' }))
    reader.readAsText(file)
  })
}
