import { db } from "@/lib/db";
import { toast } from "sonner";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getUserProfile() {
  try {
    await wait(1000)
    const profile = await db.userProfile.toCollection().first()

    return profile || undefined
  } catch (error) {
    console.error("Failed to fetch profile", error)
    return undefined
  }
}

export async function updateUserProfile(payload: { name: string; email: string }) {
  try {
    await wait(500)
    const existing = await db.userProfile.get(payload.email)

    if (existing) {
      await db.userProfile.put({
        ...existing,
        ...payload
      })
    } else {
      toast.warning("Failed to update personal information", { position: 'top-center' })
      throw Error
    }
    
    return { success: true }
  } catch (error) {
    toast.error("Something went wrong!", { position: 'top-center' })
    throw error
  }
}

export async function updateImageProfile(payload: { email: string; image: string }) {
  try {
    await wait(500)
    const existing = await db.userProfile.get(payload.email)

    if (existing) {
      await db.userProfile.put({
        ...existing,
        ...payload
      })
    } else {
      toast.warning("Failed to update photo", { position: 'top-center' })
      throw Error
    }
    
    return { success: true }
  } catch (error) {
    toast.error("Something went wrong!", { position: 'top-center' })
    throw error
  }
}

export async function logoutUser() {
  await db.userProfile.clear()
  await wait(1000)
  localStorage.removeItem("currentUserEmail")
  localStorage.removeItem("isLoggedIn")
}

export async function loginOrRegister(email: string, name?: string) {
  try {
    const cleanEmail = email.toLowerCase().trim()
    
    const existingUser = await db.userProfile.get(cleanEmail)

    if (existingUser) {
      await db.userProfile.update(cleanEmail, {
        lastLogin: new Date().toISOString()
      })
      toast.success("Welcome back!", { position: 'top-center' });
    } else {
      await db.userProfile.add({
        email: cleanEmail,
        name: name ? name : cleanEmail.split('@')[0],
        username: undefined,
        bio: undefined,
        image: '',
        lastLogin: new Date().toISOString()
      })
      toast.success("Account created successfully!", { position: 'top-center' })
    }
    await wait(1500)

    localStorage.setItem("currentUserEmail", cleanEmail)
    localStorage.setItem("isLoggedIn", "true")

    return { success: true }
  } catch (error) {
    console.error("Auth error:", error)
    toast.error("Authentication failed!", { position: 'top-center' })
    throw error
  }
}

export async function deleteAccount() {
  try {
    const email = localStorage.getItem("currentUserEmail")

    if (!email) {
      toast.error("No active session found")
      return
    }

    await db.userProfile.delete(email)

    await Promise.all([
      db.contents.clear(),
      db.notifications.clear(),
      db.userPreference.clear()
    ])

    await wait(1000)

    localStorage.removeItem("currentUserEmail")
    localStorage.removeItem("isLoggedIn")

    toast.success("Account and all data have been permanently deleted", { 
      position: 'top-center' 
    })

    return { success: true }
  } catch (error) {
    toast.error("Failed to delete account", { position: 'top-center' })
    throw error
  }
}
