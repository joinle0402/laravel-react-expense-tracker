<?php

namespace App\Http\Requests\Categories;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): true
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => 'required|string|in:expense,income',
            'name' => [
                'required', 'string', 'max:100',
                Rule::unique('categories', 'name')
                    ->where(fn ($query) => $query->where('type', $this->input('type', ''))),
            ],
            'icon' => 'required|string|max:50',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'tên danh mục',
            'type' => 'loại thu / chi',
            'icon' => 'biểu tượng',
        ];
    }

}
