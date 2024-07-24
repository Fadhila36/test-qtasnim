<?php

namespace App\Repositories\Interfaces;

use Illuminate\Pagination\LengthAwarePaginator;

interface ItemTypeRepositoryInterface
{
    public function getAll(): LengthAwarePaginator;
    public function findById($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
