"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import * as z from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, Mail, User } from "lucide-react"

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

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Please enter your full name.")
    .max(100, "Name must be less than 100 characters."),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter your email!." }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const router = useRouter()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (values: RegisterFormValues) => {
      return loginOrRegister(values.email, values.name)
    },

    onSuccess: () => {
      router.push("/dashboard")
    },

    onError: (error) => {
      console.error(error)
    },
  })

  const isLoading = form.formState.isSubmitting || registerMutation.isPending

  async function onSubmit(values: RegisterFormValues) {
    if (registerMutation.isPending) return

    await registerMutation.mutateAsync(values)
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
            Enter your name and email to access your local workspace.
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
                  <User className="absolute top-3 left-3 h-4 w-4 text-zinc-500" />
                </InputGroupAddon>

                <InputGroupInput
                  {...form.register("name")}
                  className="pl-8!"
                  placeholder="John Doe"
                  disabled={isLoading}
                />
              </InputGroup>

              {form.formState.errors.name ? (
                <p className="text-xs text-red-500">
                  {form.formState.errors.name.message}
                </p>
              ) : null}
            </div>

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
                    Loading...
                  </>
                ) : (
                  "Sign Up"
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
                variant="link"
                className="h-10 w-full"
                size="lg"
                disabled={isLoading}
              >
                <Link
                  href="/login"
                  aria-disabled={isLoading}
                  className={isLoading ? "pointer-events-none" : undefined}
                >
                  Login
                </Link>
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-zinc-500 space-y-4">
            <p>No password required. Your data stays in this browser.</p>
            <Link href="/privacy" className="text-primary">Data & Privacy</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
