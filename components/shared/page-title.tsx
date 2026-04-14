export default function PageTitle({ title, description }: { title: string; description: string | undefined }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-white">{title}</h1>
      {description
        ? <p className="text-sm text-muted-foreground">{description}</p>
        : ''
      }
    </div>
  )
}