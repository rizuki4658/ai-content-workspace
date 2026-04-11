interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="flex-1 pb-16 md:pb-0">
      <div className="p-6 max-w-360 w-full mx-auto">{children}</div>
    </main>
  )
}
