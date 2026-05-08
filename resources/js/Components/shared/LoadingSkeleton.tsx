import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
    className?: string;
    lines?: number;
}

/** Skeleton bar umum */
export function LoadingSkeleton({ className }: { className?: string }) {
    return <div className={cn('skeleton h-4 w-full rounded-lg', className)} />;
}

/** Skeleton untuk card */
export function CardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm', className)}>
            <div className="flex items-start gap-3 mb-4">
                <div className="skeleton w-10 h-10 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="skeleton h-4 w-3/4 rounded" />
                    <div className="skeleton h-3 w-1/2 rounded" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="skeleton h-3 w-full rounded" />
                <div className="skeleton h-3 w-5/6 rounded" />
                <div className="skeleton h-3 w-4/6 rounded" />
            </div>
        </div>
    );
}

/** Skeleton untuk stat card */
export function StatSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm', className)}>
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                    <div className="skeleton h-3 w-24 rounded" />
                    <div className="skeleton h-7 w-16 rounded" />
                    <div className="skeleton h-2 w-32 rounded" />
                </div>
                <div className="skeleton w-10 h-10 rounded-xl shrink-0" />
            </div>
        </div>
    );
}

/** Skeleton untuk avatar + name */
export function UserSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('flex items-center gap-3', className)}>
            <div className="skeleton w-10 h-10 rounded-full shrink-0" />
            <div className="space-y-1.5 flex-1">
                <div className="skeleton h-3.5 w-32 rounded" />
                <div className="skeleton h-3 w-20 rounded" />
            </div>
        </div>
    );
}

/** Skeleton untuk room card */
export function RoomCardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm', className)}>
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="skeleton h-4 w-2/3 rounded" />
                <div className="skeleton h-5 w-20 rounded-full" />
            </div>
            <div className="space-y-2 mb-4">
                <div className="skeleton h-3 w-full rounded" />
                <div className="skeleton h-3 w-4/5 rounded" />
            </div>
            <div className="flex gap-2 mb-4">
                <div className="skeleton h-5 w-20 rounded-full" />
                <div className="skeleton h-5 w-16 rounded-full" />
                <div className="skeleton h-5 w-14 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
                <UserSkeleton />
                <div className="skeleton h-9 w-24 rounded-xl" />
            </div>
        </div>
    );
}
