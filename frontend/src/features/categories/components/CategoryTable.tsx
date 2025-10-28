import { useCategories } from '@/features/categories/queries.ts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button.tsx';
import { Fragment, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { cn } from '@/lib/utils.ts';

export default function CategoryTable() {
	const [page, setPage] = useState(1);
	const { data, isLoading } = useCategories({ page });
	const prevDisabled = page <= 1;
	const nextDisabled = page >= (data?.meta?.last_page ?? 1);

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center"></div>
			<div className="w-full">
				<div className="grid w-full [&>div]:max-h-[600px] [&>div]:border [&>div]:rounded">
					<Table>
						<TableHeader>
							<TableRow className="*:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0">
								<TableHead>STT</TableHead>
								<TableHead>Tên</TableHead>
								<TableHead>Icon</TableHead>
								<TableHead>Loại</TableHead>
								<TableHead className="text-right">Chức năng</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading ? (
								<Fragment>
									{Array.from({ length: 10 }).map((_, i) => (
										<TableRow key={`placeholder-${i}`}>
											<TableCell className="font-mono text-xs text-muted-foreground">
												<Skeleton className="h-4 w-6" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-4 w-40" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-4 w-20" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-4 w-16" />
											</TableCell>
											<TableCell className="text-right space-x-2">
												<Skeleton className="inline-block h-8 w-16 rounded-md" />
												<Skeleton className="inline-block h-8 w-16 rounded-md" />
											</TableCell>
										</TableRow>
									))}
								</Fragment>
							) : (
								<Fragment>
									{data?.data?.map((item, index) => (
										<TableRow key={item.id} className="odd:bg-muted/50">
											<TableCell className="font-mono text-xs">
												{(page - 1) * Number(data?.meta?.per_page) + (index + 1)}
											</TableCell>
											<TableCell>{item.name}</TableCell>
											<TableCell>{item.icon}</TableCell>
											<TableCell>{item.type}</TableCell>
											<TableCell className="text-right space-x-2">
												<Button variant="destructive">Edit</Button>
												<Button variant="destructive">Delete</Button>
											</TableCell>
										</TableRow>
									))}
									{(!data || data.data.length === 0) && (
										<TableRow>
											<TableCell colSpan={5} className="text-center text-sm py-4">
												Không có dữ liệu
											</TableCell>
										</TableRow>
									)}
								</Fragment>
							)}
						</TableBody>
					</Table>
				</div>
			</div>

			<Pagination className="mt-4">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							aria-disabled={prevDisabled}
							className={cn(prevDisabled && 'pointer-events-none opacity-50', 'cursor-pointer')}
							onClick={() => !prevDisabled && setPage((p) => p - 1)}
						/>
					</PaginationItem>

					{Array.from({ length: data?.meta?.last_page ?? 1 }).map((_, i) => (
						<PaginationItem key={i}>
							<PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)} style={{ cursor: 'pointer' }}>
								{i + 1}
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext
							aria-disabled={page >= (data?.meta?.last_page ?? 1)}
							className={cn(nextDisabled && 'pointer-events-none opacity-50', 'cursor-pointer')}
							onClick={() => !nextDisabled && setPage((p) => p + 1)}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
