<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\WinnerController;

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::patch('/users/{id}/points', [UserController::class, 'updatePoints']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::get('/users/grouped-by-score', [UserController::class, 'groupedByScore']);
Route::prefix('winners')->group(function () {
    Route::get('/', [WinnerController::class, 'index']);
    Route::get('/stats', [WinnerController::class, 'stats']);
});
