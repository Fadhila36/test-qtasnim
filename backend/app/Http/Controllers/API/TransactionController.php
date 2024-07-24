<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Services\TransactionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;


class TransactionController extends Controller
{
    protected $transactionService;

    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $transactions = $this->transactionService->getAllTransactions();
            return response()->json(TransactionResource::collection($transactions), Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id)
    {
        try {
            $transaction = $this->transactionService->getTransactionById($id);
            if ($transaction) {
                return response()->json(new TransactionResource($transaction), Response::HTTP_OK);
            }
            return response()->json(['message' => 'Transaction not found.'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreTransactionRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreTransactionRequest $request)
    {
        try {
            $data = $request->validated();
            $transaction = $this->transactionService->createTransaction($data);
            return response()->json(new TransactionResource($transaction), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateTransactionRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateTransactionRequest $request, int $id)
    {
        try {
            $data = $request->validated();
            $transaction = $this->transactionService->updateTransaction($id, $data);
            if ($transaction) {
                return response()->json(new TransactionResource($transaction), Response::HTTP_OK);
            }
            return response()->json(['message' => 'Transaction not found.'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id)
    {
        try {
            $deleted = $this->transactionService->deleteTransaction($id);
            if ($deleted) {
                return response()->json(['message' => 'Transaction deleted successfully.'], Response::HTTP_OK);
            }
            return response()->json(['message' => 'Transaction not found.'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
