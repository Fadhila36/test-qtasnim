<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon; 

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'item_id' => $this->item_id,
            'sold_amount' => $this->sold_amount,
            'transaction_date' => Carbon::parse($this->transaction_date)->format('Y-m-d'),
            'item_type_id' => $this->item_type_id,
        ];
    }
}
