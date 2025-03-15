
import { Skeleton } from '@/components/ui/skeleton';

const EventSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Carousel skeleton */}
      <Skeleton className="w-full aspect-[16/9] rounded-xl" />
      
      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
        <div className="space-y-8">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default EventSkeleton;
