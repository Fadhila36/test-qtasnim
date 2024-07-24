<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'sold_amount',
        'transaction_date',
        'item_type_id',
    ];

    protected $dates = [
        'transaction_date',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function itemType()
    {
        return $this->belongsTo(ItemType::class);
    }
}
