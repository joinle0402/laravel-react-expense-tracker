<?php

use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->middleware(['signed'])->name('verification.verify');
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/email/resend', [AuthController::class, 'resendEmail'])->middleware(['throttle:1,1']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('categories/export', [CategoryController::class, 'export']);
    Route::post('categories/import', [CategoryController::class, 'import']);
    Route::delete('categories/bulk-delete', [CategoryController::class, 'bulkDelete']);
    Route::apiResource('categories', CategoryController::class);

    Route::delete('transactions/bulk-delete', [TransactionController::class, 'bulkDelete']);
    Route::apiResource('transactions', TransactionController::class)->except(['destroy']);
});
