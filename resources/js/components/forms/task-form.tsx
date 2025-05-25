'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TaskFormProps {
    task?: {
        id: string;
        title: string;
        status: string;
        Priority: string;
        due_date: Date | undefined;
        project_id: string;
        assignee_id: string;
    };
    projectId?: string;
    onSubmit: (data: TaskFormData) => Promise<void>;
    onCancel: () => void;
    availableProjects?: { id: string; name: string }[];
    availableUsers?: { id: string; name: string; email: string }[];
    isEditing?: boolean;
}

interface TaskFormData {
    title: string;
    status: string;
    Priority: string;
    due_date: Date | undefined;
    project_id: string;
    assignee_id: string;
}

const statusOptions = ['To Do', 'In Progress', 'In Review', 'Completed', 'Cancelled'];

const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];

export function TaskForm({ task, projectId, onSubmit, onCancel, availableProjects = [], availableUsers = [], isEditing = false }: TaskFormProps) {
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        status: 'To Do',
        Priority: 'Medium',
        due_date: undefined,
        project_id: projectId || '',
        assignee_id: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Initialize form data when editing
    useEffect(() => {
        if (task && isEditing) {
            setFormData({
                title: task.title,
                status: task.status,
                Priority: task.Priority,
                due_date: task.due_date ? new Date(task.due_date) : undefined,
                project_id: task.project_id,
                assignee_id: task.assignee_id,
            });
        }
    }, [task, isEditing]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Task title is required';
        }

        if (!formData.project_id) {
            newErrors.project_id = 'Project is required';
        }

        if (!formData.assignee_id) {
            newErrors.assignee_id = 'Assignee is required';
        }

        if (!formData.due_date) {
            newErrors.due_date = 'Due date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} task:`, error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        Task Title *
                    </Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter task title"
                        className="border-neutral-200 bg-white text-zinc-800 placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                    />
                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                            <SelectTrigger className="border-neutral-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className="border-neutral-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                {statusOptions.map((status) => (
                                    <SelectItem
                                        key={status}
                                        value={status}
                                        className="text-zinc-800 focus:bg-zinc-200 dark:text-zinc-100 dark:focus:bg-zinc-800"
                                    >
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Priority</Label>
                        <Select value={formData.Priority} onValueChange={(value) => setFormData({ ...formData, Priority: value })}>
                            <SelectTrigger className="border-neutral-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent className="border-neutral-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                {priorityOptions.map((priority) => (
                                    <SelectItem
                                        key={priority}
                                        value={priority}
                                        className="text-zinc-800 focus:bg-zinc-200 dark:text-zinc-100 dark:focus:bg-zinc-800"
                                    >
                                        {priority}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {availableProjects.length > 0 && (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Project *</Label>
                        <Select value={formData.project_id} onValueChange={(value) => setFormData({ ...formData, project_id: value })}>
                            <SelectTrigger className="border-neutral-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
                                <SelectValue placeholder="Select project" />
                            </SelectTrigger>
                            <SelectContent className="border-neutral-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                {availableProjects.map((project) => (
                                    <SelectItem key={project.id} value={project.id} className="text-zinc-100 focus:bg-zinc-800">
                                        {project.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.project_id && <p className="text-sm text-red-500">{errors.project_id}</p>}
                    </div>
                )}

                <div className="space-y-2">
                    <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Assignee *</Label>
                    <Select value={formData.assignee_id} onValueChange={(value) => setFormData({ ...formData, assignee_id: value })}>
                        <SelectTrigger className="border-neutral-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
                            <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent className="border-neutral-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                            {availableUsers.map((user) => (
                                <SelectItem key={user.id} value={user.id} className="text-zinc-100 focus:bg-zinc-800">
                                    {user.name} ({user.email})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.assignee_id && <p className="text-sm text-red-500">{errors.assignee_id}</p>}
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Due Date *</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start border-neutral-200 bg-white text-left font-normal text-zinc-800 hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.due_date ? format(formData.due_date, 'PPP') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto border-neutral-200 bg-zinc-100 p-0 dark:border-zinc-800 dark:bg-zinc-900" align="start">
                            <Calendar
                                mode="single"
                                selected={formData.due_date}
                                onSelect={(date) => setFormData({ ...formData, due_date: date })}
                                initialFocus
                                className="bg-white dark:bg-zinc-900"
                            />
                        </PopoverContent>
                    </Popover>
                    {errors.due_date && <p className="text-sm text-red-500">{errors.due_date}</p>}
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditing ? 'Update Task' : 'Create Task'}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="flex-1 border-neutral-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
