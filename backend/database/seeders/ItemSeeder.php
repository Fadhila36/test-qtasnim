<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Item;


class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Item::create(['name' => 'Kopi', 'stock' => 100]);
        Item::create(['name' => 'Teh', 'stock' => 100]);
        Item::create(['name' => 'Pasta Gigi', 'stock' => 100]);
        Item::create(['name' => 'Sabun Mandi', 'stock' => 100]);
        Item::create(['name' => 'Sampo', 'stock' => 100]);
    }
}
