<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EmailVerificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::prefix('v1')->group(function () {
    Route::prefix('/auth')->controller(AuthController::class)->group(function () {
        Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);
        Route::post('/register', 'register');
        Route::post('/login', 'login');
        Route::post('/refresh', 'refresh');
        Route::prefix('/verify-email')->controller(EmailVerificationController::class)->group(function () {
            Route::get('/{id}/{hash}', 'verify')->middleware(['signed','throttle:6,1'])->name('verification.verify');
            Route::post('/resend', 'resend')->middleware(['throttle:6,1']);
        });
    });

    Route::middleware(['auth:sanctum', 'verified'])->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::apiResource('categories', CategoryController::class);
    });
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
