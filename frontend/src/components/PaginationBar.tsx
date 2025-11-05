import { cn } from '@/lib/utils.ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination.tsx';

type PaginationBarProps = {
	page: number;
	totalPages: number;
	onPageChange: (p: number) => void;
	pageSize: number;
	onPageSizeChange: (s: number) => void;
};

export default function PaginationBar({ page, totalPages, onPageChange, pageSize, onPageSizeChange }: PaginationBarProps) {
	const pages = getPageRange(page, totalPages, 1);

	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3">
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground whitespace-nowrap">Mỗi trang</span>
				<Select
					value={String(pageSize)}
					onValueChange={(value) => {
						onPageSizeChange(Number(value));
						onPageChange(1);
					}}
				>
					<SelectTrigger className="h-8 w-[90px]">
						<SelectValue placeholder={pageSize} />
					</SelectTrigger>
					<SelectContent>
						{[10, 20, 50, 100, 200, 500, -1].map((option) => (
							<SelectItem key={option} value={String(option)}>
								{option === -1 ? 'Hiện tất cả' : option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Pagination>
				<PaginationContent className="gap-1">
					<PaginationItem>
						<PaginationPrevious
							onClick={() => onPageChange(Math.max(1, page - 1))}
							aria-disabled={page <= 1}
							className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
						/>
					</PaginationItem>

					<div className={cn('flex', 'hidden sm:flex')}>
						{pages.map((item, idx) =>
							item === 'ellipsis' ? (
								<PaginationItem key={`e-${idx}`}>
									<PaginationEllipsis />
								</PaginationItem>
							) : (
								<PaginationItem key={item}>
									<PaginationLink className="cursor-pointer" isActive={item === page} onClick={() => onPageChange(item)}>
										{item}
									</PaginationLink>
								</PaginationItem>
							)
						)}
					</div>

					<PaginationItem>
						<PaginationNext
							onClick={() => onPageChange(Math.min(totalPages, page + 1))}
							aria-disabled={page >= totalPages}
							className={page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}

function getPageRange(current: number, total: number, siblingCount: number) {
	const totalPageNumbers = siblingCount * 2 + 5;
	if (total <= totalPageNumbers) return range(1, total);

	const leftSibling = Math.max(current - siblingCount, 1);
	const rightSibling = Math.min(current + siblingCount, total);

	const showLeftEllipsis = leftSibling > 2;
	const showRightEllipsis = rightSibling < total - 1;

	if (!showLeftEllipsis && showRightEllipsis) {
		return [...range(1, 3 + 2 * siblingCount), 'ellipsis', total] as const;
	}
	if (showLeftEllipsis && !showRightEllipsis) {
		return [1, 'ellipsis', ...range(total - (2 * siblingCount + 2), total)] as const;
	}
	return [1, 'ellipsis', ...range(leftSibling, rightSibling), 'ellipsis', total] as const;
}

function range(start: number, end: number) {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
