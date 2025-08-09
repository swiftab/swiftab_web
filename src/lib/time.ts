export function parseTime(time: string): number {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
  }
  
  export function formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    const period = hours >= 12 ? "pm" : "am"
    const formattedHours = hours % 12 || 12
    return `${formattedHours}:${mins.toString().padStart(2, "0")}${period}`
  }
  
  export function calculateEventStyle(start: string, end: string) {
    const startMinutes = parseTime(start)
    const endMinutes = parseTime(end)
    const startOfDay = parseTime("11:00") // Timeline starts at 11am
  
    const top = (startMinutes - startOfDay) * (48 / 60) // 48px per hour
    const height = (endMinutes - startMinutes) * (48 / 60)
  
    return { top, height }
  }
  
  