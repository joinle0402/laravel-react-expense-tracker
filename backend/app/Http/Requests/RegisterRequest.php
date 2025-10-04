<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required',
            'email' => 'required|lowercase|email|unique:users',
            'password' => 'required|min:4',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
