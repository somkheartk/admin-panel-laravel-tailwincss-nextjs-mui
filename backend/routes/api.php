<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\DashboardController;

Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
Route::get('/dashboard/orders', [DashboardController::class, 'recentOrders']);
