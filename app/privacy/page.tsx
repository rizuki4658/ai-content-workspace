import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Data & Privacy - AI Content Workspace",
  description:
    "Learn how AI Content Workspace stores demo data locally in your browser using IndexedDB.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl space-y-10">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            ← Back to app
          </Link>

          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Data & Privacy
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Your demo data stays in your browser.
            </h1>

            <p className="text-base leading-7 text-muted-foreground">
              AI Content Workspace is a portfolio demo application designed to
              simulate a SaaS-style content workspace. It does not use a backend
              server, account system, or external database.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <p className="text-sm leading-7 text-muted-foreground">
            The app stores generated content, content metadata, user preferences,
            and app settings locally in your browser using IndexedDB. This data
            is used only to make the demo feel realistic and persistent between
            sessions.
          </p>
        </div>

        <div className="space-y-8">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              What is stored
            </h2>

            <p className="text-sm leading-7 text-muted-foreground">
              The app may store generated content, saved content records,
              content metadata, app settings, and user preferences locally in
              your browser.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              What is not collected
            </h2>

            <p className="text-sm leading-7 text-muted-foreground">
              This project does not collect, sell, or share your personal data.
              It does not store your content on a remote server, and it does not
              send your generated content to a third-party backend.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Local browser storage
            </h2>

            <p className="text-sm leading-7 text-muted-foreground">
              Because the data is stored locally, it only exists in the browser
              and device you are using. If you clear your browser data, reset the
              app, or use another device, the stored content may no longer be
              available.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Demo purpose
            </h2>

            <p className="text-sm leading-7 text-muted-foreground">
              AI Content Workspace is built as a frontend portfolio project. It
              is intended to demonstrate dashboard UI, content management flows,
              analytics, client-side persistence, and frontend architecture.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Need to remove data?
            </h2>

            <p className="text-sm leading-7 text-muted-foreground">
              You can delete generated content inside the app or clear your
              browser storage from your browser settings.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
