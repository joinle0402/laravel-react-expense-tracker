<?php

namespace App\Http\Requests\Categories;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => [
                'required', 'string', 'max:100',
                Rule::unique('categories', 'name')
                    ->ignore($this->route('category'))
                    ->where(fn ($query) => $query->where('type', $this->input('type'))
                ),
            ],
            'type' => 'required|string|in:expense,income',
            'icon' => 'required|string|max:50',
        ];
    }

    public function authorize(): true
    {
        return true;
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
