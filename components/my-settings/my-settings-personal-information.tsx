"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Save } from "lucide-react"

import {
  mySettingsFormSchema,
  type MySettingsFormSchema,
} from "@/lib/validations/my-settings"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { User } from "@/lib/types/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUserProfile } from "@/lib/api/user"

const initialValues: MySettingsFormSchema = {
  name: "-",
  email: "-",
  username: "-",
  bio: "-",
}

export default function MySettingsPersonalInformation({
  data
} : {
  data?: User
}) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<MySettingsFormSchema>({
    resolver: zodResolver(mySettingsFormSchema),
    defaultValues: data || initialValues,
    mode: "onSubmit",
  })
  const queryClient = useQueryClient()
  const { mutateAsync: updatePersonalInfo } = useMutation({
    mutationFn: async (payload: User) => updateUserProfile(payload),

    onMutate: async (newVariable) => {
      await queryClient.cancelQueries({ queryKey: ['user'] })

      const previousContents = queryClient.getQueriesData<User>({
        queryKey: ['user'],
      })

      queryClient.setQueriesData<User>(
        { queryKey: ['user'] },
        (old) => {
          if (!old) return old

          return {
            ...old,
            ...newVariable
          }
        }
      )

      return { previousContents }
    },

    onError: (_err, _variables, context) => {
      context?.previousContents?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    }
  })


  const onSubmit = async (values: MySettingsFormSchema) => {
    if (data) {
      await updatePersonalInfo({
        ...data,
        ...values
      })
    }
  }

  return (
    <form
      className="space-y-4"
      autoCapitalize="off"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel className="text-xs" htmlFor="full-name">
                Full Name
              </FieldLabel>
              <Input
                id="full-name"
                value={field.value ?? ""}
                disabled={isSubmitting}
                onChange={field.onChange}
                placeholder="ex: John Doe"
              />
              {fieldState.invalid ? (
                <FieldError
                  className="text-xs"
                  errors={[fieldState.error]}
                />
              ) : null}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel className="text-xs" htmlFor="email">
                Email
              </FieldLabel>
              <Input
                id="email"
                value={field.value ?? ""}
                disabled={isSubmitting}
                onChange={field.onChange}
                placeholder="ex: example@mail.com"
              />
              {fieldState.invalid ? (
                <FieldError
                  className="text-xs"
                  errors={[fieldState.error]}
                />
              ) : null}
            </Field>
          )}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel className="text-xs" htmlFor="username">
                Username{" "}
                <small className="text-muted-foreground">
                  (optional)
                </small>
              </FieldLabel>
              <Input
                id="username"
                value={field.value ?? ""}
                disabled={isSubmitting}
                onChange={field.onChange}
                placeholder="ex: johndoe123"
              />
              {fieldState.invalid ? (
                <FieldError
                  className="text-xs"
                  errors={[fieldState.error]}
                />
              ) : null}
            </Field>
          )}
        />

        <Controller
          name="bio"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel className="text-xs" htmlFor="bio">
                Bio{" "}
                <small className="text-muted-foreground">
                  (optional)
                </small>
              </FieldLabel>
              <Input
                id="bio"
                value={field.value ?? ""}
                disabled={isSubmitting}
                onChange={field.onChange}
                placeholder="ex: Frontend Developer"
              />
              {fieldState.invalid ? (
                <FieldError
                  className="text-xs"
                  errors={[fieldState.error]}
                />
              ) : null}
            </Field>
          )}
        />
      </div>

      <Button
        className="w-full"
        size="lg"
        type="submit"
        disabled={isSubmitting}
      >
        <Save />
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
