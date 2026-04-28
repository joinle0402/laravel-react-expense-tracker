<?php

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
        Route::apiResource('categories', CategoryController::class);
    });
});
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::apiResource('categories', CategoryController::class);
});
