import { redirect } from 'next/navigation'

export default function RootPage() {
  const isLogged = true

  if (isLogged) {
    redirect('/dashboard')
  } else {
    redirect('/login')
  }
}
