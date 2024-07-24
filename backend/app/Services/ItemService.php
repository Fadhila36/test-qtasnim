<?php

namespace App\Services;

use App\Repositories\Interfaces\ItemRepositoryInterface;

class ItemService
{
    protected $itemRepository;

    public function __construct(ItemRepositoryInterface $itemRepository)
    {
        $this->itemRepository = $itemRepository;
    }

    public function getAllItems()
    {
        return $this->itemRepository->getAll();
    }

    public function getItemById($id)
    {
        return $this->itemRepository->findById($id);
    }

    public function createItem(array $data)
    {
        return $this->itemRepository->create($data);
    }

    public function updateItem($id, array $data)
    {
        return $this->itemRepository->update($id, $data);
    }

    public function deleteItem($id)
    {
        return $this->itemRepository->delete($id);
    }
}
