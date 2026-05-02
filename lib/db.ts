import Dexie, { type Table } from 'dexie';
import type { ContentItem } from "@/lib/types/content";
import type { NotificationItem } from '@/lib/types/notifications';
import { Preference } from '@/lib/types/settings';
import { User } from '@/lib/types/user';

export async function seedDefaultData() {
  try {
    const contentCount = await db.contents.count()
    const notificationCount = await db.notifications.count()
    const userPreference =  await db.userPreference.get('settings')

    if (contentCount === 0) {
      const defaultContents: Omit<ContentItem, 'id'>[] = [
        {
          title: "Welcome to AI Content Workspace!",
          prompt: "Introduction to the platform",
          output: "Selamat datang! Di sini lo bisa generate konten pakai AI dengan gampang.",
          type: "blog_idea",
          status: "ready",
          favorite: true,
          tone: "professional",
          userEmail: undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          title: "Contoh Draft Caption Instagram",
          prompt: "Caption for tech product",
          output: "Lagi cari hoodie programmer yang nyaman? Cek koleksi kita!",
          type: "caption",
          status: "draft",
          favorite: false,
          tone: "casual",
          userEmail: undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ]
      await db.contents.bulkAdd(defaultContents as ContentItem[])
    }

    if (notificationCount === 0) {
      const defaultNotifications: Omit<NotificationItem, 'id'>[] = [
        {
          avatar: '',
          type: "greating_notification",
          title: "Account Created",
          message: "Akun lo berhasil dibuat. Selamat mengeksplor!",
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        {
          avatar: '',
          type: "greating_notification",
          title: "Tips: Use the Search!",
          message: "Lo bisa cari konten lama lo lewat bar pencarian di atas.",
          isRead: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        }
      ]
      await db.notifications.bulkAdd(defaultNotifications as NotificationItem[])
    }

    if (!userPreference) {
      await db.userPreference.put({
        id: 'settings',
        type: "social_media",
        tone: "friendly",
        theme: "dark",
        updatedAt: new Date().toISOString()
      })
    }

    console.log("Seeding completed successfully!")
  } catch (error) {
    console.error("Failed to seed default data:", error)
  }
}

export class MyDatabase extends Dexie {
  contents!: Table<ContentItem>
  notifications!: Table<NotificationItem>
  userPreference!: Table<Preference>
  userProfile!: Table<User>

  constructor() {
    super('AIContentDB')
    
    this.version(1).stores({
      contents: '++id, title, type, status, tone, favorite, createdAt, updatedAt',
      notifications: '++id, type, isRead, createdAt',
      userPreference: 'id',
      userProfile: 'email, name, image, lastLogin',
    })
  }
}

export const db = new MyDatabase()
