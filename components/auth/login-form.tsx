"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import * as z from "zod"
import Link from "next/link"
import { Loader2, LogIn, Mail } from "lucide-react"

import { loginOrRegister } from "@/lib/api/user"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter your email!" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const router = useRouter()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  })

  const loginMutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      return loginOrRegister(values.email)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const isLoading = form.formState.isSubmitting || loginMutation.isPending

  async function onSubmit(values: LoginFormValues) {
    if (loginMutation.isPending) return

    try {
      await loginMutation.mutateAsync(values)
      router.push('/dashboard')
    } catch (error) {
      console.log('Failed to login')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md px-4 py-10 sm:px-8">
        <CardHeader className="space-y-1">
          <CardTitle className="flex flex-col items-center justify-center gap-4 text-2xl font-bold tracking-tight">
            <div className="h-16 w-16 rounded-xl border border-muted shadow-2xl">
              <img src="/logo/logo3.png" alt="AI Content Workspace logo" />
            </div>

            <h1 className="text-xl font-semibold">
              AI Content Workspace
            </h1>
          </CardTitle>

          <CardDescription className="text-center text-xs">
            Enter your email to access your local workspace.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <div className="space-y-2">
              <InputGroup className="py-5!">
                <InputGroupAddon>
                  <Mail className="absolute top-3 left-3 h-4 w-4 text-zinc-500" />
                </InputGroupAddon>

                <InputGroupInput
                  {...form.register("email")}
                  className="pl-8!"
                  placeholder="name@example.com"
                  disabled={isLoading}
                />
              </InputGroup>

              {form.formState.errors.email ? (
                <p className="text-xs text-red-500">
                  {form.formState.errors.email.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Button
                type="submit"
                className="h-10 w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn />
                    Sign In
                  </>
                )}
              </Button>

              <div className="flex w-full items-center justify-center gap-2">
                <hr className="flex-1" />
                <p className="text-muted-foreground">or</p>
                <hr className="flex-1" />
              </div>

              <Button
                asChild
                type="button"
                variant="outline"
                className="h-10 w-full"
                size="lg"
                disabled={isLoading}
              >
                <Link
                  href="/register"
                  aria-disabled={isLoading}
                  className={isLoading ? "pointer-events-none" : undefined}
                >
                  Register
                </Link>
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-zinc-500">
            <p>No password required. Your data stays in this browser.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
