"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  mySettingsFormPasswordSchema,
  type MySettingsFormPasswordSchema,
} from "@/lib/validations/my-settings"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"
import { KeyRound, Loader2 } from "lucide-react"
import { Checkbox } from "../ui/checkbox"

export default function MySettingsChangePassword() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(0)

  const { control, handleSubmit, reset } =
    useForm<MySettingsFormPasswordSchema>({
      resolver: zodResolver(mySettingsFormPasswordSchema),
      defaultValues: {
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },
      mode: "onSubmit",
    })

  const onSubmit = async (data: MySettingsFormPasswordSchema) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      reset()
      setOpen(false)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const onOpenClose = (value: boolean) => {
    if (isLoading) return

    reset()
    setIsLoading(false)
    setOpen(value)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenClose}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-full" type="button">
          <KeyRound className="mr-2 h-4 w-4" />
          Change Password
        </Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        showCloseButton={false}
        className="sm:max-w-[400px]"
      >
        <DialogHeader>
          <DialogTitle>Update Password</DialogTitle>
          <DialogDescription>
            Secure your account with a new password.
          </DialogDescription>
        </DialogHeader>

        <form
          id="form-change-password"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 py-4"
        >
          <Controller
            name="oldPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel className="text-xs" htmlFor="current-password">
                  Current Password
                </FieldLabel>
                <Input
                  {...field}
                  id="current-password"
                  type={!!showPassword ? "text" : "password"}
                  placeholder="Current Password"
                />
                {fieldState.invalid && (
                  <FieldError className="text-xs" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel className="text-xs" htmlFor="new-password">
                  New Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="new-password"
                    type={!!showPassword ? "text" : "password"}
                    placeholder="New Password"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError className="text-xs" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel className="text-xs" htmlFor="confirm-password">
                  Confirm New Password
                </FieldLabel>
                <Input
                  {...field}
                  id="confirm-password"
                  type={!!showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                />
                {fieldState.invalid && (
                  <FieldError className="text-xs" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox
                checked={!!showPassword}
                id="show-password"
                name="show-password"
                onCheckedChange={() => setShowPassword(!showPassword ? 1 : 0)}
              />
              <FieldLabel htmlFor="show-password" className="text-xs">
                Show Password
              </FieldLabel>
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenClose(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
