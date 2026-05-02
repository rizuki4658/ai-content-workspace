"use client"

import { useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Save } from "lucide-react"

import { ideaTones, ideaTypes, ideaThemes } from "@/lib/data/generate"
import { getPreference, setPreference } from "@/lib/api/settings"
import { generateId } from "@/lib/utils/generator-id"
import { useGenerateContent } from "@/contexts/generate-context"
import { useTheme } from "@/contexts/theme-context"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  settingPrefrenceFormSchema,
  SettingPrefrenceFormSchema,
} from "@/lib/validations/settings"
import { Preference } from "@/lib/types/settings"
import SettingsPreferenceSkeleton from "./skeletons/settings-preference-skeleton"

const preferenceQueryKey = ["settings-preference"] as const

const defaultValues: SettingPrefrenceFormSchema = {
  type: "blog_idea",
  tone: "professional",
  theme: "system",
}

export default function SettingsPreferencesCard() {
  const { theme } = useTheme()
  const { data: preferenceValues, isLoading } =
    useQuery<SettingPrefrenceFormSchema>({
      queryKey: preferenceQueryKey,
      queryFn: () => getPreference()
    }
  )

  if (isLoading) return (
    <SettingsPreferenceSkeleton />
  )

  const initialValues: SettingPrefrenceFormSchema = {
    ...(preferenceValues ?? defaultValues),
    theme,
  }

  return (
    <SettingsPreferencesForm
      initialValues={initialValues}
    />
  )
}

function SettingsPreferencesForm({
  initialValues,
}: {
  initialValues: SettingPrefrenceFormSchema
}) {
  const { content, setContent } = useGenerateContent()
  const { theme: contextTheme, setTheme } = useTheme()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<SettingPrefrenceFormSchema>({
    resolver: zodResolver(settingPrefrenceFormSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  })

  // Live sync: when toggle changes theme, update the form's theme field
  useEffect(() => {
    setValue("theme", contextTheme)
  }, [contextTheme, setValue])
  const queryClient = useQueryClient()
  const { mutateAsync: updatePreference } = useMutation({
    mutationFn: async (values: Preference) => await setPreference(values),

    onMutate: async (newVariable) => {
      await queryClient.cancelQueries({ queryKey: preferenceQueryKey })

      const previousContents = queryClient.getQueriesData<Preference>({
        queryKey: preferenceQueryKey,
      })

      queryClient.setQueriesData<Preference>(
        { queryKey: preferenceQueryKey },
        (old) => {
          if (!old) return old

          return newVariable
        }
      )

      return { previousContents }
    },

    onError: (_err, _variables, context) => {
      context?.previousContents?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: preferenceQueryKey })
    },
  })

  const onSubmit = async (values: SettingPrefrenceFormSchema) => {
    setTheme(values.theme)
    setContent({
      ...content,
      form: {
        uniqueId: generateId(),
        title: content.form?.title || "",
        prompt: content.form?.prompt || "",
        targetAudience: content.form?.targetAudience || "",
        keywords: content.form?.keywords || "",
        tone: values.tone,
        type: values.type,
      },
    })
    await updatePreference(values)
  }

  return (
    <form
      id="form-setting-preference"
      autoComplete="on"
      onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Customize how your AI content is generated.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel className="text-xs" htmlFor="content-type">
                  Content Type
                </FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="content-type"
                    className="w-full rounded-sm"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>

                  <SelectContent position="popper" className="rounded-sm">
                    {(Object.keys(ideaTypes) as Array<keyof typeof ideaTypes>).map(
                      (key) => (
                        <SelectItem key={key} value={key}>
                          {ideaTypes[key]}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

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
            name="tone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel className="text-xs" htmlFor="tone">
                  Tone
                </FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="tone"
                    className="w-full rounded-sm"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>

                  <SelectContent position="popper" className="rounded-sm">
                    {(Object.keys(ideaTones) as Array<keyof typeof ideaTones>).map(
                      (key) => (
                        <SelectItem key={key} value={key}>
                          {ideaTones[key]}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

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
            name="theme"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel className="text-xs" htmlFor="theme">
                  Theme
                </FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="theme"
                    className="w-full rounded-sm"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>

                  <SelectContent position="popper" className="rounded-sm">
                    {(Object.keys(ideaThemes) as Array<keyof typeof ideaThemes>).map(
                      (key) => (
                        <SelectItem key={key} value={key}>
                          {ideaThemes[key]}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                {fieldState.invalid ? (
                  <FieldError
                    className="text-xs"
                    errors={[fieldState.error]}
                  />
                ) : null}
              </Field>
            )}
          />
        </CardContent>

        <CardFooter>
          <div className="flex w-full items-center gap-3 pt-2">
            <Button
              className={`flex-1 ${
                isSubmitting
                  ? "bg-muted-foreground cursor-not-allowed"
                  : "hover:opacity-100 focus:opacity-100 opacity-80"
              } rounded-sm`}
              size="lg"
              type="submit"
              disabled={isSubmitting}
            >
              <Save />
              Save Preference
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
