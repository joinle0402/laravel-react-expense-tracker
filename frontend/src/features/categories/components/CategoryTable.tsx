import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button.tsx';
import { type ComponentType, useMemo, useState } from 'react';

import { cn } from '@/lib/utils.ts';
import type { Category } from '@/features/categories/types.ts';
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable
} from '@tanstack/react-table';
import TypeBadge from '@/components/TypeBadge.tsx';
import type { TransactionType } from '@/types/common.ts';
import { Input } from '@/components/ui/input.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
	Folder,
	PiggyBank,
	Wallet,
	Tag,
	Home,
	ShoppingCart,
	Gift,
	Landmark,
	Briefcase,
	Car,
	UtensilsCrossed,
	Baby,
	HeartPulse,
	Book,
	Smartphone,
	Wifi,
	Wrench,
	Hammer,
	Bike,
	BedDouble,
	Building2,
	Coffee,
	Crown,
	DollarSign,
	Pencil,
	Trash2
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox.tsx';

export const makeColumns = (onEdit?: (row: Category) => void, onDelete?: (row: Category) => void): ColumnDef<Category>[] => [
	{
		accessorKey: 'selection',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllRowsSelected() ? true : table.getIsSomeRowsSelected() ? 'indeterminate' : false}
				onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				onClick={(event) => event.stopPropagation()}
			/>
		),
		enableSorting: false,
		enableHiding: false,
		size: 5
	},
	{
		id: 'index',
		header: () => <div className="font-semibold text-center w-full">#</div>,
		cell: ({ row, table }) => {
			const { currentPage = 1, pageSize = row.getParentRow()?.subRows?.length ?? 0 } =
				(table.options.meta as { currentPage?: number; pageSize?: number }) ?? {};
			return <div className="text-center text-sm">{row.index + 1 + (currentPage - 1) * pageSize}</div>;
		},
		enableSorting: false,
		enableHiding: false,
		size: 10
	},
	{
		accessorKey: 'name',
		header: () => <div className="font-semibold">Tên danh mục</div>,
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<IconPreview name={row.getValue<string>('icon')} className="text-muted-foreground/80" />
				<span className="font-medium truncate max-w-[260px] text-sm">{row.getValue<string>('name')}</span>
			</div>
		)
	},
	{
		accessorKey: 'icon',
		header: () => <div className="font-semibold">Icon</div>,
		cell: ({ row }) => (
			<div className="flex items-center gap-2 text-muted-foreground">
				<code className="text-xs bg-muted px-1.5 py-0.5 rounded">{row.getValue('icon') as string}</code>
			</div>
		),
		enableSorting: false
	},
	{
		accessorKey: 'type',
		header: () => <div className="font-semibold">Loại</div>,
		cell: ({ row }) => <TypeBadge type={row.getValue<TransactionType>('type')} />
	},
	{
		id: 'actions',
		header: () => <span className="sr-only">Hành động</span>,
		cell: ({ row }) => (
			<div className="flex justify-end gap-1">
				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200"
					title="Sửa"
					onClick={() => onEdit?.(row.original)}
				>
					<Pencil className="h-4 w-4 text-muted-foreground" />
				</Button>

				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8 text-destructive hover:text-destructive"
					title="Xoá"
					onClick={() => onDelete?.(row.original)}
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		),
		enableSorting: false
	}
];

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
	folder: Folder,
	wallet: Wallet,
	piggybank: PiggyBank,
	tag: Tag,
	home: Home,
	cart: ShoppingCart,
	gift: Gift,
	bank: Landmark,
	briefcase: Briefcase,
	car: Car,
	food: UtensilsCrossed,
	baby: Baby,
	health: HeartPulse,
	book: Book,
	phone: Smartphone,
	wifi: Wifi,
	tools: Wrench,
	hammer: Hammer,
	bike: Bike,
	bed: BedDouble,
	building: Building2,
	coffee: Coffee,
	crown: Crown,
	money: DollarSign
};

function IconPreview({ name, className }: { name: string; className?: string }) {
	const Comp = ICONS[name?.toLowerCase?.()] ?? Folder;
	return <Comp className={cn('size-5', className)} />;
}

type CategoryTableProps = {
	data: Category[];
	onCreate?: () => void;
	onEdit?: (row: Category) => void;
	onDelete?: (row: Category) => void;
	page: number;
	pageSize: number;
};

export default function CategoryTable({ data, onEdit, onDelete, page, pageSize }: CategoryTableProps) {
	const columns = useMemo(() => makeColumns(onEdit, onDelete), [onEdit, onDelete]);

	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState('');
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns,
		state: { sorting, globalFilter, columnFilters, rowSelection },
		meta: { currentPage: page, pageSize: pageSize ?? data.length },
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		onColumnFiltersChange: setColumnFilters,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		globalFilterFn: (row, _colId, filterValue) => {
			const v = String(row.original.name ?? '').toLowerCase();
			return v.includes(String(filterValue).toLowerCase());
		}
	});

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-3">
				<div className="flex flex-wrap items-center justify-between gap-3">
					<div className="flex flex-wrap items-center gap-2">
						<Input
							placeholder="Tìm theo tên danh mục..."
							value={globalFilter ?? ''}
							onChange={(e) => setGlobalFilter(e.target.value)}
							className="w-72"
						/>

						<Select
							value={(table.getColumn('type')?.getFilterValue() as TransactionType) ?? 'all'}
							onValueChange={(v: 'all' | TransactionType) => {
								const col = table.getColumn('type');
								if (!col) return;
								col.setFilterValue(v === 'all' ? undefined : v);
							}}
						>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Loại" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Tất cả loại</SelectItem>
								<SelectItem value="income">Thu</SelectItem>
								<SelectItem value="expense">Chi</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="w-full">
					<div className={cn('w-full border rounded-md bg-card [&>div]:max-h-[calc(100vh-194px)] [&>div]:overflow-y-auto')}>
						<Table className="min-w-full border-collapse">
							<TableHeader className={cn('border-b border-gray-400 hover:bg-muted/50 transition-colors')}>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id} className="font-semibold text-xs text-muted-foreground">
										{headerGroup.headers.map((header) => (
											<TableHead
												key={header.id}
												className={cn(
													'sticky top-0 z-20 bg-muted',
													'bg-muted border-b text-xs font-semibold uppercase tracking-wide',
													header.id === 'selection' && 'w-8 min-w-8',
													header.id === 'index' && 'whitespace-nowrap w-8 min-w-8'
												)}
											>
												{header.isPlaceholder ? null : (
													<div
														className={cn(
															'inline-flex items-center gap-1 select-none w-full',
															header.column.getCanSort() && 'cursor-pointer'
														)}
														onClick={header.column.getToggleSortingHandler()}
													>
														{flexRender(header.column.columnDef.header, header.getContext())}
														{header.column.getIsSorted() === 'asc' && <span>↑</span>}
														{header.column.getIsSorted() === 'desc' && <span>↓</span>}
													</div>
												)}
											</TableHead>
										))}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows.length === 0 ? (
									<TableRow>
										<TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
											Không có dữ liệu phù hợp.
										</TableCell>
									</TableRow>
								) : (
									table.getRowModel().rows.map((row) => (
										<TableRow
											className="border-b border-border hover:bg-muted/40"
											key={row.id}
											data-state={row.getIsSelected() && 'selected'}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell className="border border-border" key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</div>
	);
}
