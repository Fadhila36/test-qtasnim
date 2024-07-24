<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Transaction;
use Carbon\Carbon;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Transaction::create([
            'item_id' => 1, // Assuming 'Kopi' ID
            'sold_amount' => 10,
            'transaction_date' => Carbon::create('2021', '05', '01'),
            'item_type_id' => 1 // Assuming 'Konsumsi' ID
        ]);

        Transaction::create([
            'item_id' => 2, // Assuming 'Teh' ID
            'sold_amount' => 19,
            'transaction_date' => Carbon::create('2021', '05', '05'),
            'item_type_id' => 1 // Assuming 'Konsumsi' ID
        ]);

        Transaction::create([
            'item_id' => 1, // Assuming 'Kopi' ID
            'sold_amount' => 15,
            'transaction_date' => Carbon::create('2021', '05', '10'),
            'item_type_id' => 1 // Assuming 'Konsumsi' ID
        ]);

        Transaction::create([
            'item_id' => 3, // Assuming 'Pasta Gigi' ID
            'sold_amount' => 20,
            'transaction_date' => Carbon::create('2021', '05', '11'),
            'item_type_id' => 2 // Assuming 'Pembersih' ID
        ]);

        Transaction::create([
            'item_id' => 4, // Assuming 'Sabun Mandi' ID
            'sold_amount' => 30,
            'transaction_date' => Carbon::create('2021', '05', '11'),
            'item_type_id' => 2 // Assuming 'Pembersih' ID
        ]);

        Transaction::create([
            'item_id' => 5, // Assuming 'Sampo' ID
            'sold_amount' => 25,
            'transaction_date' => Carbon::create('2021', '05', '12'),
            'item_type_id' => 2 // Assuming 'Pembersih' ID
        ]);

        Transaction::create([
            'item_id' => 2, // Assuming 'Teh' ID
            'sold_amount' => 5,
            'transaction_date' => Carbon::create('2021', '05', '12'),
            'item_type_id' => 1 // Assuming 'Konsumsi' ID
        ]);
    }
}
