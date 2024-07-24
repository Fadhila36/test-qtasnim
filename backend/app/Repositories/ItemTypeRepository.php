<?php

namespace App\Repositories;

use App\Repositories\Interfaces\ItemTypeRepositoryInterface;
use App\Models\ItemType;
use Illuminate\Pagination\LengthAwarePaginator;

class ItemTypeRepository implements ItemTypeRepositoryInterface
{
    public function getAll(): LengthAwarePaginator
    {
        return ItemType::paginate(15);
    }


    public function findById($id)
    {
        return ItemType::find($id);
    }

    public function create(array $data)
    {
        return ItemType::create($data);
    }

    public function update($id, array $data)
    {
        $itemType = $this->findById($id);
        if ($itemType) {
            $itemType->update($data);
            return $itemType;
        }
        return null;
    }

    public function delete($id)
    {
        $itemType = $this->findById($id);
        if ($itemType) {
            $itemType->delete();
            return true;
        }
        return false;
    }
}
