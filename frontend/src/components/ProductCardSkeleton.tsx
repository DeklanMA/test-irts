import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ProductCardSkeleton() {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4 space-y-4">
        {/* Image */}
        <Skeleton className="h-40 w-full rounded-lg" />

        {/* Title */}
        <Skeleton className="h-4 w-3/4" />

        {/* Brand */}
        <Skeleton className="h-3 w-1/2" />

        {/* Price */}
        <Skeleton className="h-4 w-1/3" />
      </CardContent>

      <CardFooter className="flex gap-2">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-10 flex-1 rounded-md" />
      </CardFooter>
    </Card>
  );
}
