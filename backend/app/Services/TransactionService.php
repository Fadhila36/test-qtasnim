<?php

namespace App\Services;

use App\Repositories\Interfaces\TransactionRepositoryInterface;

class TransactionService
{
    protected $transactionRepository;

    public function __construct(TransactionRepositoryInterface $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    public function getAllTransactions()
    {
        return $this->transactionRepository->getAll();
    }

    public function getTransactionById($id)
    {
        return $this->transactionRepository->findById($id);
    }

    public function createTransaction(array $data)
    {
        return $this->transactionRepository->create($data);
    }

    public function updateTransaction($id, array $data)
    {
        return $this->transactionRepository->update($id, $data);
    }

    public function deleteTransaction($id)
    {
        return $this->transactionRepository->delete($id);
    }
}
