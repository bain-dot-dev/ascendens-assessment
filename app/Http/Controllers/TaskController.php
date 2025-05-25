<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;


class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::with(['project', 'assignee'])->get()->map(function ($task) {
            return [
                'id' => $task->id,
                'title' => $task->title,
                'status' => $task->status,
                'priority' => $task->priority,
                'due_date' => $task->due_date ? $task->due_date->toDateString() : null,
                'project' => [
                    'id' => $task->project->id,
                    'name' => $task->project->name,
                ],
                'assignee' => [
                    'id' => $task->assignee->id,
                    'name' => $task->assignee->name,
                ],
            ];
        });

        if (request()->expectsJson()) {
            return response()->json($tasks);
        }

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
        
    }

  public function store(Request $request)
{
    try {
        Log::info('Task creation request', ['data' => $request->all()]);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'status' => 'required|in:To Do,In Progress,In Review,Completed,Cancelled',
            'priority' => 'required|in:Low,Medium,High,Urgent',
            'due_date' => 'required|date',
            'project_id' => 'required|uuid|exists:projects,id',
            'assignee_id' => 'required|uuid|exists:users,id',
        ]);

        Log::info('Validation passed', ['validated' => $validated]);

        // Fix: Remove duplicate field assignments, just use the validated data
        $task = Task::create([
            'id' => Str::uuid(), // Add this if your model requires manual UUID
            ...$validated,
        ]);

        $task->load('project', 'assignee');

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $this->formatTask($task)
        ], 201);
        
    } catch (\Illuminate\Validation\ValidationException $e) {
        Log::error('Validation failed', ['errors' => $e->errors()]);
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);
        
    } catch (\Exception $e) {
        Log::error('Task creation failed', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
            'request_data' => $request->all()
        ]);
        return response()->json([
            'message' => 'Internal Server Error',
            'error' => $e->getMessage()
        ], 500);
    }
}

    public function show(Task $task)
    {
        $task->load('project', 'assignee');

        return response()->json($this->formatTask($task));
    }

    public function update(Request $request, Task $task)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'status' => 'required|in:To Do,In Progress,In Review,Completed,Cancelled',
                'priority' => 'required|in:Low,Medium,High,Urgent',
                'due_date' => 'required|date',
                'project_id' => 'required|uuid|exists:projects,id',
                'assignee_id' => 'required|uuid|exists:users,id',
            ]);

            $task->update($validated);
            $task->load('project', 'assignee');

            return response()->json([
                'message' => 'Task updated successfully',
                'task' => $this->formatTask($task)
            ]);
        } catch (\Exception $e) {
            Log::error('Task update failed', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Task $task)
    {
        try {
            $task->delete();

            return response()->json([
                'message' => 'Task deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Task deletion failed', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function formatTask(Task $task)
    {
        return [
            'id' => $task->id,
            'title' => $task->title,
            'status' => $task->status,
            'priority' => $task->priority,
            'due_date' => $task->due_date ? $task->due_date->toDateString() : null,
            'project' => [
                'id' => $task->project->id,
                'name' => $task->project->name,
            ],
            'assignee' => $task->assignee ? [
                'id' => $task->assignee->id,
                'name' => $task->assignee->name,
                'initials' => $task->assignee->initials ?? '',
            ] : null,
        ];
    }

    public function createFormData()
{
    $projects = Project::where('status', '!=', 'Completed')
        ->get(['id', 'name']);

    $users = User::select('id', 'name', 'email')->get();

    return response()->json([
        'projects' => $projects,
        'users' => $users,
    ]);
}

    public function stats()
{
    $now = now();

    $completed = Task::where('status', 'Completed')->count();
    $inReview = Task::where('status', 'In Review')->count();
    $inProgress = Task::where('status', 'In Progress')->count();
    $overdue = Task::where('due_date', '<', $now)
                   ->where('status', '!=', 'Completed')
                   ->count();

    return response()->json([
        'completed' => $completed,
        'inReview' => $inReview,
        'inProgress' => $inProgress,
        'overdue' => $overdue,
    ]);
}

 public function upcoming()
    {
        $today = Carbon::today();

        // Fetch tasks with due_date today or later, ordered by due_date ascending
        $tasks = Task::whereDate('due_date', '>=', $today)
                     ->orderBy('due_date', 'asc')
                     ->limit(4)
                     ->get();
                     

        return response()->json($tasks);
    }

}
