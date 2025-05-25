<?php


use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;

// Route::apiResource('projects', ProjectController::class); 
Route::resource('projects', ProjectController::class);
Route::get('/projects', [ProjectController::class, 'index']);
Route::post('/projects', [ProjectController::class, 'store']);
Route::put('/projects/{project}', [ProjectController::class, 'update']);
Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

Route::resource('tasks', TaskController::class);
Route::get('/tasks', [TaskController::class, 'index']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::put('/tasks/{task}', [TaskController::class, 'update']);
Route::delete('/tasks/{task}', [TaskController::class, 'destroy']); 
Route::get('/tasks/create-form-data', [TaskController::class, 'createFormData']);
