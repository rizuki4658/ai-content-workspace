import { Suspense } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Retister - AI Content Workspace",
  description: "AI Content Workspace",
}

import RegisterFormSkeleton from "@/components/auth/register-form-skeleton"
import RegisterForm from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <section className="space-y-6">
      <Suspense fallback={<RegisterFormSkeleton />}>
        <div className="animate-in fade-in duration-500">
          <RegisterForm />
        </div>
      </Suspense>
   </section>
  )
}
