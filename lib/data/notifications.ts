export type NotificationType =
  | "content_generated"
  | "content_published"
  | "content_failed"
  | "system"
  | "reminder";

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  avatar: string;
  expand?: boolean
};

export const notifications: Notification[] = [
  {
    id: "1",
    title: "Content Generated",
    message:
      "Your blog post '10 AI Tools for Startups' has been successfully generated. You can now review the content, make edits if necessary, and publish it directly to your preferred platform. Make sure to check tone and formatting before publishing.",
    type: "content_generated",
    isRead: false,
    avatar: "CG",
    createdAt: "2026-04-10T10:00:00Z",
  },
  {
    id: "2",
    title: "Content Published",
    message:
      "Your content 'Instagram Launch Caption' has been published successfully. The post is now live and visible to your audience. Monitor engagement and analytics to evaluate performance and optimize future content.",
    type: "content_published",
    isRead: false,
    avatar: "CP",
    createdAt: "2026-04-10T09:30:00Z",
  },
  {
    id: "3",
    title: "Generation Failed",
    message:
      "We encountered an issue while generating your content due to a temporary system error. Please try again in a few moments. If the issue persists, consider simplifying your prompt or checking your input configuration.",
    type: "content_failed",
    isRead: true,
    avatar: "GF",
    createdAt: "2026-04-09T22:15:00Z",
  },
  {
    id: "4",
    title: "System Update",
    message:
      "A new AI model update has been deployed to improve content quality, coherence, and generation speed. You may notice better results in tone consistency and structure. No action is required from your side.",
    type: "system",
    isRead: true,
    avatar: "SU",
    createdAt: "2026-04-09T18:00:00Z",
  },
  {
    id: "5",
    title: "Reminder",
    message:
      "You currently have 3 draft contents that have not been published yet. Consider reviewing and publishing them to maintain consistency in your content strategy and maximize audience engagement.",
    type: "reminder",
    isRead: false,
    avatar: "R",
    createdAt: "2026-04-09T12:00:00Z",
  },
  {
    id: "6",
    title: "Content Generated",
    message:
      "Your email draft titled 'Welcome Campaign Sequence' is ready. You can customize subject lines, personalize the message, and schedule delivery to ensure optimal engagement with your audience.",
    type: "content_generated",
    isRead: true,
    avatar: "CG",
    createdAt: "2026-04-08T20:45:00Z",
  },
]
