"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { loginOrRegister } from "@/lib/api/user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, LogIn, Mail } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import Link from "next/link"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter your email!" }),
})

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    try {
      await loginOrRegister(values.email)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md py-10 sm:px-8 px-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight flex flex-col items-center justify-center gap-4">
            <div className="shadow-2xl rounded-xl w-16 h-16 border border-muted">
              <img src="/logo/logo3.png" />
            </div>
            <h1 className="font-semibold text-xl">
              AI Content Workspace
            </h1>
          </CardTitle>
          <CardDescription className="text-center text-xs">
            Enter your email to access your local workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="space-y-2">
              <InputGroup className="py-5!">
                <InputGroupAddon>
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                </InputGroupAddon>
                <InputGroupInput
                  {...form.register("email")}
                  className="pl-8!"
                  placeholder="name@example.com"
                />
              </InputGroup>
              {form.formState.errors.email && (
                <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Button 
                type="submit" 
                className="w-full h-10"
                size="lg"
                disabled={isLoading}>
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
              <div className="flex items-center w-full justify-center gap-2">
                <hr className="flex-1" />
                <p className="text-muted-foreground">or</p>
                <hr className="flex-1" />
              </div>
              <Link href="/register">
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full h-10"
                  size="lg"
                  disabled={isLoading}>
                  Register
                </Button>
              </Link>
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
