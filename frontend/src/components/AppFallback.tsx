import { cn } from '@/lib/utils.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Card } from '@/components/ui/card.tsx';
import LoadingScreen from '@/components/LoadingScreen.tsx';
import { useAuth } from '@/features/auth/auth.context.tsx';

type AppFallbackProps = {
	className?: string;
};

export default function AppFallback({ className = '' }: AppFallbackProps) {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) return <LoadingScreen className={className} />;
	return (
		<div className={cn('space-y-4', className)}>
			<div className="space-y-2">
				<Skeleton className="h-4 w-40" />
				<Skeleton className="h-8 w-64" />
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				<Card className="p-4 space-y-3">
					<Skeleton className="h-4 w-1/3" />
					<Skeleton className="h-6 w-2/3" />
					<Skeleton className="h-24 w-full" />
				</Card>
				<Card className="p-4 space-y-3">
					<Skeleton className="h-4 w-1/4" />
					<Skeleton className="h-6 w-1/2" />
					<Skeleton className="h-24 w-full" />
				</Card>
			</div>
		</div>
	);
}
