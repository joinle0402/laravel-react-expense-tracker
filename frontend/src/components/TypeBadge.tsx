import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import { Badge } from '@/components/ui/badge.tsx';

export default function TypeBadge({ type, className }: { type: 'expense' | 'income'; className?: string }) {
	return (
		<Badge
			variant="secondary"
			className={cn(
				'gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
				type === 'income'
					? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
					: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
				className
			)}
		>
			{type === 'income' ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
			<span className="capitalize">{type === 'income' ? 'Thu' : 'Chi'}</span>
		</Badge>
	);
}
