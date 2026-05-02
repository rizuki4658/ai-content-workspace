import { z } from "zod"

const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .optional()
    .or(z.literal(""))

const nameSchema = z
  .string()
  .trim()
  .min(3, "Name must be at least 3 characters.")
  .max(100, "Name must be less than 100 characters.")

const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address.")

const usernameSchema = z
  .string()
  .trim()
  .min(3, "Username must be at least 3 characters.")
  .max(30, "Username must be less than 30 characters.")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores."
  )
  .optional()
  .or(z.literal(""))

const bioSchema = optionalText(
  200,
  "Bio must be less than 200 characters."
)

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(100, "Password must be less than 100 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character."
  )

export const mySettingsFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  username: usernameSchema,
  bio: bioSchema,
})

export const mySettingsFormPasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, "Old password must be at least 8 characters.")
      .max(100, "Old password must be less than 100 characters."),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters.")
      .max(100, "Confirm password must be less than 100 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  })

export const mySettingsFormRegisterSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters.")
      .max(100, "Confirm password must be less than 100 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  })

export type MySettingsFormSchema = z.infer<typeof mySettingsFormSchema>

export type MySettingsFormPasswordSchema = z.infer<
  typeof mySettingsFormPasswordSchema
>

export type MySettingsFormRegisterSchema = z.infer<
  typeof mySettingsFormRegisterSchema
>
