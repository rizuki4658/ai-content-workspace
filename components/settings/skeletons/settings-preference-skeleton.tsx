import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsPreferenceSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-1/2 h-4" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-full h-6" />
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Field className="gap-1">
          <FieldLabel className="text-xs" htmlFor="theme">
            <Skeleton className="w-1/3 h-4" />
          </FieldLabel>

          <Skeleton className="w-full h-8" />
        </Field>

        <Field className="gap-1">
          <FieldLabel className="text-xs" htmlFor="theme">
            <Skeleton className="w-1/3 h-4" />
          </FieldLabel>

          <Skeleton className="w-full h-8" />
        </Field>
        
        <Field className="gap-1">
          <FieldLabel className="text-xs" htmlFor="theme">
            <Skeleton className="w-1/3 h-4" />
          </FieldLabel>

          <Skeleton className="w-full h-8" />
        </Field>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-center gap-3 pt-2">
          <Skeleton className="w-full h-8" />
        </div>
      </CardFooter>
    </Card>
  )
}
