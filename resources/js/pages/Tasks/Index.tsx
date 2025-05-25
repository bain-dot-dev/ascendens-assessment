import { TaskFilters } from '@/components/task-filters';
import { TaskModal } from '@/components/task-modal';
import { TaskTable } from '@/components/task-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
// import Link from "next/link"
import axios, { AxiosError } from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '/tasks',
    },
];

type Task = {
    id: string;
    title: string;
    status: 'In Progress' | 'Completed' | 'To Do' | 'In Review' | 'Cancelled';
    priority: 'Urgent' | 'High' | 'Medium' | 'Low'; // Added 'Urgent' to match TaskModal
    due_date: string;
    project_id: string;
    assignee_id: string;
    project: { id: string; name: string };
    assignee: { id: string; name: string };
};

export default function Index() {
    // Define the expected shape of the page props
    type PageProps = {
        tasks: Task[];
        [key: string]: unknown;
    };

    // Safely extract and verify taskss is an array
    const { tasks: rawTasks } = usePage<PageProps>().props;
    const initialTask: Task[] = Array.isArray(rawTasks) ? rawTasks : [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [taskList, setTaskList] = useState<Task[]>(initialTask);

    const handleSubmit = async (data: {
        title: string;
        status: 'In Progress' | 'Completed' | 'To Do' | 'In Review' | 'Cancelled';
        priority: 'Urgent' | 'High' | 'Medium' | 'Low';
        due_date: Date;
        project_id: string;
        assignee_id: string;
    }) => {
        console.log('Submitting task data:', data);
        try {
            const payload = {
                ...data,
                due_date: data.due_date.toISOString().split('T')[0],
            };

            let response;
            if (selectedTask) {
                if (!selectedTask.id) {
                    throw new Error('Task ID is required for updates');
                }
                console.log('Updating task with ID:', selectedTask.id);
                response = await axios.put(`/tasks/${selectedTask.id}`, payload);
                console.log('Update response:', response.data);
            } else {
                console.log('Creating new task');
                response = await axios.post('/tasks', payload);
                console.log('Create response:', response.data);
            }

            alert(response.data.message || 'Operation completed successfully');
            await refreshTaskList();

            // FIXED: Reset state after submission
            setIsModalOpen(false);
            setSelectedTask(null); // This is crucial for clearing the form
        } catch (error) {
            // Error handling remains the same...
            console.error('Submit error:', error);
            const err = error as AxiosError<{ errors?: Record<string, string[]>; message?: string }>;

            if (err.response?.status === 422) {
                console.error('Validation errors:', err.response.data.errors);
                const errors = err.response.data.errors;
                if (errors) {
                    const errorMessages = Object.entries(errors)
                        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                        .join('\n');
                    alert(`Validation errors:\n${errorMessages}`);
                } else {
                    alert('Validation error occurred');
                }
            } else {
                const message = err.response?.data?.message || err.message || 'An unexpected error occurred';
                alert(`Error: ${message}`);
            }
        }
    };

    // const handleEdit = (task: Task) => {
    //     console.log('Editing task:', task); // Debug log
    //     if (!task || !task.id) {
    //         console.error('Invalid task data for editing:', task);
    //         alert('Error: Invalid task data');
    //         return;
    //     }
    //     setSelectedTask(task);
    //     setIsModalOpen(true);
    // };

    const handleEdit = (task: Task) => {
        console.log('=== EDIT TASK DEBUG ===');
        console.log('Full task object:', task);
        console.log('Task project:', task.project);
        console.log('Task assignee:', task.assignee);

        if (!task || !task.id) {
            console.error('Invalid task data for editing:', task);
            alert('Error: Invalid task data');
            return;
        }

        // Extract IDs from nested objects
        const projectId = task.project?.id || task.project_id || '';
        const assigneeId = task.assignee?.id || task.assignee_id || '';

        console.log('Extracted project_id:', projectId);
        console.log('Extracted assignee_id:', assigneeId);
        console.log('=======================');

        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        // Add validation to ensure we have a valid ID
        if (!id || id.trim() === '') {
            console.error('Invalid task ID for deletion:', id);
            alert('Error: Invalid task ID');
            return;
        }

        console.log('=== DELETE DEBUG INFO ===');
        console.log('Task ID received:', id);
        console.log('Task ID type:', typeof id);
        console.log('Task ID length:', id.length);
        console.log('Constructed URL:', `/tasks/${id}`);
        console.log('========================');

        if (confirm('Are you sure you want to delete this task?')) {
            try {
                console.log('Making DELETE request to:', `/tasks/${id}`);
                const response = await axios.delete(`/tasks/${id}`);
                console.log('Delete response:', response.data);

                // Show success message
                alert(response.data.message || 'Task deleted successfully');

                // Refresh the task list to get updated data from server
                await refreshTaskList();

                console.log('Task deleted and list refreshed');
            } catch (error) {
                console.error('=== DELETE ERROR DEBUG ===');
                console.error('Full error object:', error);
                const err = error as AxiosError<{ message?: string }>;
                console.error('Error config:', err.config);
                console.error('Error response:', err.response);
                console.error('Request URL:', err.config?.url);
                console.error('Request method:', err.config?.method);
                console.error('=============================');

                const message = err.response?.data?.message || err.message || 'An unexpected error occurred';

                if (err.response?.status === 404) {
                    alert('Task not found. It may have already been deleted.');
                    // Refresh list in case it was deleted by someone else
                    await refreshTaskList();
                } else if (err.response?.status === 405) {
                    alert(`Delete operation not allowed. URL: ${err.config?.url}, Method: ${err.config?.method}`);
                } else {
                    alert(`Error deleting task: ${message}`);
                }
            }
        }
    };

    const refreshTaskList = async () => {
        try {
            console.log('Refreshing task list...');
            const response = await axios.get('/tasks');
            console.log('Raw response from /tasks:', response);

            // Handle both array response (from AJAX) and object response (from Inertia)
            let updated: Task[];
            if (Array.isArray(response.data)) {
                updated = response.data;
            } else if (response.data.tasks && Array.isArray(response.data.tasks)) {
                updated = response.data.tasks;
            } else {
                console.warn('Unexpected response format:', response.data);
                updated = [];
            }

            console.log('Processed task list:', updated);
            console.log('Sample task structure:', updated[0]);
            setTaskList(updated);
        } catch (error) {
            console.error('Error refreshing task list:', error);
            const err = error as AxiosError<{ message?: string }>;
            const message = err.response?.data?.message || err.message || 'Failed to refresh project list';
            alert(`Error refreshing tasks: ${message}`);
        }
    };

    // Add a function to test your routes
    const testRoutes = async () => {
        try {
            console.log('=== TESTING ROUTES ===');

            // Test if we can access the tasks endpoint
            const getResponse = await axios.get('/tasks');
            console.log('GET /tasks works:', getResponse.status);

            // Test what happens if we try to access a specific task
            if (taskList.length > 0) {
                const testId = taskList[0].id;
                console.log('Testing with task ID:', testId);

                try {
                    const getOneResponse = await axios.get(`/tasks/${testId}`);
                    console.log(`GET /tasks/${testId} works:`, getOneResponse.status);
                } catch (err) {
                    console.log(`GET /tasks/${testId} failed:`, (err as AxiosError).response?.status);
                }

                // Test OPTIONS request to see what methods are allowed
                try {
                    const optionsResponse = await axios.options(`/tasks/${testId}`);
                    console.log(`OPTIONS /tasks/${testId}:`, optionsResponse.headers);
                } catch (err) {
                    console.log('OPTIONS request failed:', err);
                }
            }

            console.log('===================');
        } catch (error) {
            console.error('Route testing failed:', error);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">Tasks</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={testRoutes} className="text-sm">
                            Test Routes
                        </Button>
                        <Button onClick={() => setIsModalOpen(true)} className="bg-zinc-800 hover:bg-zinc-700 dark:bg-white dark:hover:bg-zinc-300">
                            <Plus className="mr-2 h-4 w-4" />
                            New Task
                        </Button>
                    </div>
                </div>

                <TaskModal
                    open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedTask(null); // Clear selected task when closing
                    }}
                    onSubmit={handleSubmit}
                    initialData={
                        selectedTask
                            ? {
                                  title: selectedTask.title,
                                  status: selectedTask.status,
                                  priority: selectedTask.priority,
                                  due_date: new Date(selectedTask.due_date),
                                  // Fix: Extract the ID from the nested object
                                  project_id: selectedTask.project?.id || selectedTask.project_id || '',
                                  assignee_id: selectedTask.assignee?.id || selectedTask.assignee_id || '',
                              }
                            : undefined
                    }
                />

                <TaskFilters />

                <div className="rounded-lg bg-neutral-100 p-6 dark:bg-zinc-900">
                    <TaskTable tasks={taskList} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            </div>
        </AppLayout>
    );
}
