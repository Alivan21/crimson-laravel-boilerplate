<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::middleware(['verified'])->group(function () {
        Route::get('admin/dashboard', function () {
            return Inertia::render('admin/dashboard');
        })->name('admin.dashboard');
    });

    Route::redirect('admin/settings', 'admin/settings/profile');

    Route::get('admin/settings/profile', [ProfileController::class, 'edit'])->name('admin.profile.edit');
    Route::patch('admin/settings/profile', [ProfileController::class, 'update'])->name('admin.profile.update');
    Route::delete('admin/settings/profile', [ProfileController::class, 'destroy'])->name('admin.profile.destroy');

    Route::get('admin/settings/password', [PasswordController::class, 'edit'])->name('admin.password.edit');
    Route::put('admin/settings/password', [PasswordController::class, 'update'])->name('admin.password.update');

    Route::get('admin/settings/appearance', function () {
        return Inertia::render('admin/settings/appearance');
    })->name('admin.appearance');
});
