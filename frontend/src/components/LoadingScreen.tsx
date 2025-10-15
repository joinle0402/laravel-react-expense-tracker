import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

type LoadingScreenProps = {
	className?: string;
};

export default function LoadingScreen({ className }: LoadingScreenProps) {
	return (
		<div className={cn('flex min-h-[60vh] flex-col items-center justify-center text-muted-foreground', className)}>
			<Loader2 className="h-8 w-8 animate-spin mb-3" />
			<p className="text-sm">Đang tải trang...</p>
		</div>
	);
}
