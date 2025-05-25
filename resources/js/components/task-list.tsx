import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import axios, { AxiosError } from 'axios';
import { Calendar, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TaskModal } from './task-modal';

interface Task {
    id: string;
    title: string;
    status: 'In Progress' | 'Completed' | 'To Do' | 'In Review' | 'Cancelled';
    priority: 'Urgent' | 'High' | 'Medium' | 'Low';
    due_date: string;
    project: {
        id: string;
        name: string;
    };
    assignee: {
        id: string;
        name: string;
    };
}

interface TaskModelProps {
    title: string;
    status: 'In Progress' | 'Completed' | 'To Do' | 'In Review' | 'Cancelled';
    priority: 'Urgent' | 'High' | 'Medium' | 'Low';
    due_date: Date;
    project_id: string;
    assignee_id: string;
}

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const refreshTaskList = async () => {
        try {
            const response = await axios.get('/tasks');
            setTasks(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            alert(`Error refreshing tasks: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleEdit = (task: Task) => {
        setSelectedTask(task);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`/tasks/${id}`);
                await refreshTaskList();
                alert('Task deleted successfully');
            } catch (error) {
                const err = error as AxiosError<{ message?: string }>;
                alert(`Error deleting task: ${err.response?.data?.message || err.message}`);
            }
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedTask(null);
    };

    const handleModalSubmit = async (data: TaskModelProps) => {
        try {
            if (selectedTask) {
                await axios.put(`/tasks/${selectedTask.id}`, data);
                alert('Task updated!');
            } else {
                await axios.post('/tasks', data);
                alert('Task created!');
            }
            await refreshTaskList();
            handleModalClose();
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            alert(`Error submitting task: ${err.response?.data?.message || err.message}`);
        }
    };

    useEffect(() => {
        refreshTaskList().finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="text-center text-zinc-500">Loading tasks...</div>;
    }
    if (tasks.length === 0) {
        return <div className="text-center text-zinc-500">No tasks available</div>;
    }

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Current Tasks</h2>
                    <Button
                        variant="outline"
                        className="h-8 border-neutral-200 bg-transparent text-xs text-zinc-800 hover:bg-neutral-200 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                        onClick={refreshTaskList}
                    >
                        Refresh
                    </Button>
                </div>

                <div className="space-y-2">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`rounded-lg border p-4 ${
                                task.status === 'Completed'
                                    ? 'border-neutral-300 bg-neutral-200/50 dark:border-zinc-800 dark:bg-zinc-900/50'
                                    : 'bg-neutral-100 dark:border-zinc-800 dark:bg-zinc-900'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                    <Checkbox
                                        id={`task-${task.id}`}
                                        checked={task.status === 'Completed'}
                                        className={task.status === 'Completed' ? 'text-white dark:text-zinc-500' : ''}
                                    />
                                    <div className="space-y-1">
                                        <label
                                            htmlFor={`task-${task.id}`}
                                            className={`font-medium ${
                                                task.status === 'Completed'
                                                    ? 'text-zinc-500 line-through dark:text-neutral-200'
                                                    : 'text-zinc-800 dark:text-zinc-100'
                                            }`}
                                        >
                                            {task.title}
                                        </label>
                                        <div className="flex items-center space-x-3 text-xs text-zinc-600 dark:text-zinc-500">
                                            <div className="flex items-center">
                                                <Calendar className="mr-1 h-3 w-3" />
                                                {new Date(task.due_date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className={`text-xs ${
                                                    task.priority === 'High'
                                                        ? 'border-red-500 text-red-500'
                                                        : task.priority === 'Medium'
                                                          ? 'border-amber-500 text-amber-500'
                                                          : 'border-green-500 text-green-500'
                                                }`}
                                            >
                                                {task.priority}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">More</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="border-neutral-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                                        >
                                            <DropdownMenuItem
                                                onClick={() => handleEdit(task)}
                                                className="text-zinc-900 focus:bg-zinc-800 focus:text-white dark:text-zinc-400"
                                            >
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleDelete(task.id)}
                                                className="text-red-500 focus:bg-zinc-800 focus:text-red-500"
                                            >
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <TaskModal
                open={modalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                initialData={
                    selectedTask
                        ? {
                              title: selectedTask.title,
                              status: selectedTask.status,
                              priority: selectedTask.priority,
                              due_date: new Date(selectedTask.due_date),
                              project_id: selectedTask.project.id,
                              assignee_id: selectedTask.assignee.id,
                          }
                        : undefined
                }
            />
        </>
    );
}
