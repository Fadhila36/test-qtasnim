<?php

use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\ItemTypeController;
use App\Http\Controllers\Api\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('items')->group(function () {
    Route::get('/', [ItemController::class, 'index']);
    Route::get('{id}', [ItemController::class, 'show']);
    Route::post('/', [ItemController::class, 'store']);
    Route::put('{id}', [ItemController::class, 'update']);
    Route::delete('{id}', [ItemController::class, 'destroy']);
});

Route::prefix('item-types')->group(function () {
    Route::get('/', [ItemTypeController::class, 'index']);
    Route::get('{id}', [ItemTypeController::class, 'show']);
    Route::post('/', [ItemTypeController::class, 'store']);
    Route::put('{id}', [ItemTypeController::class, 'update']);
    Route::delete('{id}', [ItemTypeController::class, 'destroy']);
});

Route::prefix('transactions')->group(function () {
    Route::get('/', [TransactionController::class, 'index']);
    Route::get('{id}', [TransactionController::class, 'show']);
    Route::post('/', [TransactionController::class, 'store']);
    Route::put('{id}', [TransactionController::class, 'update']);
    Route::delete('{id}', [TransactionController::class, 'destroy']);
});