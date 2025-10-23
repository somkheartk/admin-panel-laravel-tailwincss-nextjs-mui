<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\DashboardController;

// Health check endpoint for monitoring
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toIso8601String(),
        'service' => 'backend'
    ]);
});

Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
Route::get('/dashboard/orders', [DashboardController::class, 'recentOrders']);
