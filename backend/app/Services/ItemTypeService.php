<?php

namespace App\Services;

use App\Repositories\Interfaces\ItemTypeRepositoryInterface;

class ItemTypeService
{
    protected $itemTypeRepository;

    public function __construct(ItemTypeRepositoryInterface $itemTypeRepository)
    {
        $this->itemTypeRepository = $itemTypeRepository;
    }

    public function getAllItemTypes()
    {
        return $this->itemTypeRepository->getAll();
    }

    public function getItemTypeById($id)
    {
        return $this->itemTypeRepository->findById($id);
    }

    public function createItemType(array $data)
    {
        return $this->itemTypeRepository->create($data);
    }

    public function updateItemType($id, array $data)
    {
        return $this->itemTypeRepository->update($id, $data);
    }

    public function deleteItemType($id)
    {
        return $this->itemTypeRepository->delete($id);
    }
}
