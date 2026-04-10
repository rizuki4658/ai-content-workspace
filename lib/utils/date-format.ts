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
