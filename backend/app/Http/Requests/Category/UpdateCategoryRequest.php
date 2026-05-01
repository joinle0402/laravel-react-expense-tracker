<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required', 'string', 'max:255',
                Rule::unique('categories', 'name')
                    ->ignore($this->route('categories'))
                    ->where(fn ($query) => $query
                        ->where('user_id', auth()->id())
                        ->where('type', $this->input('type'))
                    ),
            ],
        ];
    }
}
