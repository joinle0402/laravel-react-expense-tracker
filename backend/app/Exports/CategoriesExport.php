<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class CategoriesExport implements FromCollection, ShouldAutoSize, WithStyles, WithColumnWidths, WithEvents, WithHeadings, WithTitle, WithMapping
{
    use Exportable;
    protected Collection $categories;
    public function __construct(Collection $categories)
    {
        $this->categories = $categories;
    }

    public function collection(): Collection
    {
        return $this->categories->values()->map(function ($category, $index) {
            $category->row_number = $index + 1;
            return $category;
        });
    }

    public function headings(): array
    {
        return [
            'STT',
            'Tên danh mục',
            'Loại',
        ];
    }

    public function title(): string
    {
        return 'Danh mục';
    }

    public function map($row): array
    {
        return [
            $row->row_number,
            $row->name,
            match ($row->type) {
                'expense' => 'Chi tiêu',
                'income' => 'Thu nhập',
                default => '',
            },
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 8,
            'B' => 30,
            'C' => 18,
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => [
                'font' => [
                    'bold' => true,
                    'color' => ['rgb' => 'FFFFFF'],
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '2563EB'],
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
            ],
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();

                $highestRow = $sheet->getHighestRow();
                $highestColumn = $sheet->getHighestColumn();
                $tableRange = "A1:$highestColumn$highestRow";

                // Header height
                $sheet->getRowDimension(1)->setRowHeight(24);

                // Border toàn bảng
                $sheet->getStyle($tableRange)->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['rgb' => '000000'],
                        ],
                    ],
                    'alignment' => [
                        'vertical' => Alignment::VERTICAL_CENTER,
                    ],
                ]);

                // Căn giữa STT và Loại
                $sheet->getStyle("A2:A$highestRow")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                $sheet->getStyle("C2:C$highestRow")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                // Căn trái tên danh mục
                $sheet->getStyle("B2:B$highestRow")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
                // Wrap text
                $sheet->getStyle($tableRange)->getAlignment()->setWrapText(true);
            },
        ];
    }
}
