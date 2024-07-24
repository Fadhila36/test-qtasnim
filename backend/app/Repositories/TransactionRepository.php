<?php

namespace App\Repositories;

use App\Repositories\Interfaces\TransactionRepositoryInterface;
use App\Models\Transaction;
use Illuminate\Pagination\LengthAwarePaginator;

class TransactionRepository implements TransactionRepositoryInterface
{
    public function getAll(): LengthAwarePaginator
    {
        return Transaction::paginate(15);
    }

    public function findById($id)
    {
        return Transaction::find($id);
    }

    public function create(array $data)
    {
        return Transaction::create($data);
    }

    public function update($id, array $data)
    {
        $transaction = $this->findById($id);
        if ($transaction) {
            $transaction->update($data);
            return $transaction;
        }
        return null;
    }

    public function delete($id)
    {
        $transaction = $this->findById($id);
        if ($transaction) {
            $transaction->delete();
            return true;
        }
        return false;
    }
}
