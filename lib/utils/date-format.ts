export function formatting(val: string) {
  const date = new Date(val)
  
  // MMMM DD, YYYY
  const usDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(date)
  
  //  MM/DD/YY mm:ss AM/PM
  const usDateTime = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)

  return {
    date: usDate,
    dateTime: usDateTime
  }
}

export function formatDate(val: string) {
  return formatting(val).date
}

export function formatDateTime(val: string) {
  return formatting(val).dateTime
}

export function relativeDate(dateString: string, limit?: number) {
  if (!dateString) return ""

  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const defaultDay = 7 // as default of limit
  const secondsInDay = 86400
  const limitTime = limit ? limit * secondsInDay : defaultDay * secondsInDay

  if (diffInSeconds < 0) return "just now"

  if (diffInSeconds < limitTime) {
    if (diffInSeconds < 60) return "just now"

    const units = [
      { label: "y", seconds: 31536000 },
      { label: "mo", seconds: 2592000 },
      { label: "w", seconds: 604800 },
      { label: "d", seconds: 86400 },
      { label: "h", seconds: 3600 },
      { label: "m", seconds: 60 },
    ];

    for (const unit of units) {
      if (diffInSeconds >= unit.seconds) {
        const count = Math.floor(diffInSeconds / unit.seconds)
        return `${count}${unit.label} ago`
      }
    }
  }

  // if more than the "limit" will return actual date
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}