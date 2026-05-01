import {
  quickActions,
  suggestedPrompts
} from "@/lib/data/dashboard"

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchQuickActions() {
  await wait(1000)
  return quickActions
}

export async function fetchSuggestedPrompts() {
  await wait(1400)
  return suggestedPrompts
}
