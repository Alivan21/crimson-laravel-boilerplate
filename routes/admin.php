<?php

use App\Http\Controllers\Admin\Settings\PasswordController;
use App\Http\Controllers\Admin\Settings\ProfileController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'role:admin', 'active'])->group(function () {
    Route::get('admin/dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');

    Route::get('admin/users', [UserController::class, 'index'])->name('admin.users.index');
    Route::get('admin/users/create', [UserController::class, 'create'])->name('admin.users.create');
    Route::post('admin/users', [UserController::class, 'store'])->name('admin.users.store');
    Route::get('admin/users/{user}', [UserController::class, 'show'])->name('admin.users.show');
    Route::get('admin/users/{user}/edit', [UserController::class, 'edit'])->name('admin.users.edit');
    Route::put('admin/users/{user}', [UserController::class, 'update'])->name('admin.users.update');
    Route::delete('admin/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');

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
