<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::get('/tasks/create', [TaskController::class, 'create'])->name('tasks.create');
    // Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    // Route::get('/tasks/{task}', [TaskController::class, 'show'])->name('tasks.show');
    // Route::get('/tasks/{task}/edit', [TaskController::class, 'edit'])->name('tasks.edit');
    // Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    // Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
    // Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    // Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    // Route::resource('projects', ProjectController::class);
    // Route::get('/projects/{project}/members', [ProjectController::class, 'members'])->name('projects.members');

    Route::resource('projects', ProjectController::class);
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
