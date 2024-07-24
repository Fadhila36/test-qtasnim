<?php

namespace App\Repositories;

use App\Models\Item;
use App\Repositories\Interfaces\ItemRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class ItemRepository implements ItemRepositoryInterface
{
    public function getAll(): LengthAwarePaginator
    {
        return Item::paginate(15);
    }

    public function findById($id)
    {
        return Item::find($id);
    }

    public function create(array $data)
    {
        return Item::create($data);
    }

    public function update($id, array $data)
    {
        $item = Item::find($id);
        if ($item) {
            $item->update($data);
            return $item;
        }
        return null;
    }

    public function delete($id)
    {
        $item = Item::find($id);
        if ($item) {
            return $item->delete();
        }
        return false;
    }
}
