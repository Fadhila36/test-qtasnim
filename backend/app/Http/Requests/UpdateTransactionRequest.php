<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'item_id' => 'sometimes|required|exists:items,id',
            'sold_amount' => 'sometimes|required|integer|min:0',
            'transaction_date' => 'sometimes|required|date',
            'item_type_id' => 'sometimes|required|exists:item_types,id',
        ];
    }
}
