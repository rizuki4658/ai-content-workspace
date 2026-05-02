import { Suspense } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - AI Content Workspace",
  description: "AI Content Workspace",
}

import LoginForm from "@/components/auth/login-form"
import LoginFormSkeleton from "@/components/auth/login-form-skeleton"

export default function LoginPage() {
  return (
    <section className="space-y-6">
      <Suspense fallback={<LoginFormSkeleton />}>
        <div className="animate-in fade-in duration-500">
          <LoginForm />
        </div>
      </Suspense>
   </section>
  )
}
