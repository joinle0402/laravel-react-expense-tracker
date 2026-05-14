<?php

namespace App\Http\Requests\Transaction;

use App\Models\Category;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'category_id' => 'required|integer',
            'type' => 'required|in:expense,income',
            'amount' => 'required|numeric|gt:0|max:999999.99',
            'dated' => 'required|date',
            'note' => 'nullable|string|max:255',
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                $category = Category::query()->where('id', $this->input('category_id'))->where('user_id', auth()->id())->first();
                if (!$category) {
                    $validator->errors()->add('category_id', 'Danh mục không tồn tại hoặc không thuộc tài khoản của bạn.');
                    return;
                }

                if ($category->type !== $this->input('type')) {
                    $validator->errors()->add('category_id', 'Danh mục không phù hợp với loại giao dịch.');
                }
            }
        ];
    }
}
