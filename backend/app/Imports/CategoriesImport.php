<?php

namespace App\Imports;

use App\Models\Category;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Concerns\ToCollection;

class CategoriesImport implements ToCollection
{
    private array $requiredHeaders = [
        'STT',
        'Tên danh mục',
        'Loại',
    ];

    public function collection(Collection $rows): void
    {
        $headers = collect($rows->first())->map('trim')->toArray();

        if (count($headers) !== count($this->requiredHeaders)) {
            throw ValidationException::withMessages([
                'file' => 'File import không đúng số lượng cột. Cột yêu cầu: ' . implode(', ', $this->requiredHeaders),
            ]);
        }


        foreach ($this->requiredHeaders as $index => $headerName) {
            if ($headers[$index] !== $headerName) {
                throw ValidationException::withMessages([
                    'file' => "Cột thứ " . ($index + 1) . " không hợp lệ. Yêu cầu là '$headerName', hiện tại là '" . ($headers[$index] ?? 'trống') . "'.",
                ]);
            }
        }

        $errors = [];
        $imported = $rows->slice(1);
        foreach ($imported as $rowIndex => $row)
        {
            $line = $rowIndex + 2;

            $data = [];
            $data['user_id'] = auth()->id();
            $data['name'] = trim($row[1]);
            $data['type'] = match (mb_strtolower(trim($row[2]))) {
                'thu nhập', 'income' => 'income',
                'chi tiêu', 'expense' => 'expense',
                default => null,
            };

            $validator = Validator::make($data, [
                'name' => ['required', 'string', 'max:255'],
                'type' => ['required', 'in:income,expense'],
            ], [
                'name.required' => "Dòng $line: Tên danh mục không được để trống.",
                'type.required' => "Dòng $line: Loại danh mục không được để trống.",
                'type.in' => "Dòng $line: Loại danh mục chỉ được là income hoặc expense.",
            ]);

            if ($validator->fails()) {
                $errors = array_merge($errors, $validator->errors()->all());
                continue;
            }

            Category::updateOrCreate($data);
        }

        if (!empty($errors)) {
            throw ValidationException::withMessages(['file' => $errors]);
        }
    }
}
