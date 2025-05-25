'use client';

import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface TaskFormData {
    title: string;
    status: 'In Progress' | 'Completed' | 'To Do' | 'In Review' | 'Cancelled';
    priority: 'Urgent' | 'High' | 'Medium' | 'Low';
    due_date: Date;
    project_id: string;
    assignee_id: string;
}

interface TaskFormProps {
    initialData?: TaskFormData;
    projectId?: string;
    onSubmit: (data: TaskFormData) => Promise<void>;
    onCancel: () => void;
    availableProjects?: { id: string; name: string }[];
    availableUsers?: { id: string; name: string; email: string }[];
    isEditing?: boolean;
}

const statusOptions = ['To Do', 'In Progress', 'In Review', 'Completed', 'Cancelled'];
const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];

export function TaskForm({ initialData, projectId, onSubmit, onCancel, availableProjects = [], availableUsers = [] }: TaskFormProps) {
    // Initialize form data state with empty/default values or projectId if passed
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        status: 'To Do',
        priority: 'Medium',
        due_date: undefined as unknown as Date,
        project_id: projectId || '',
        assignee_id: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [listAvailableProjects, setListAvailableProjects] = useState(availableProjects);
    const [listAvailableUsers, setListAvailableUsers] = useState(availableUsers);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Track if dropdown data is loaded

    const isEditing = !!initialData;

    // Fetch form data (projects and users) first
    useEffect(() => {
        const fetchFormData = async () => {
            try {
                console.log('Fetching form data...'); // Debug log
                const res = await fetch('/tasks/create-form-data');
                const data = await res.json();
                console.log('Form data fetched:', data); // Debug log
                setListAvailableProjects(data.projects || []);
                setListAvailableUsers(data.users || []);
                setIsDataLoaded(true); // Mark data as loaded
            } catch (error) {
                console.error('Error fetching form data:', error);
                // Set empty arrays as fallback
                setListAvailableProjects([]);
                setListAvailableUsers([]);
                setIsDataLoaded(true); // Still mark as loaded even if failed
            }
        };

        // Check if we have meaningful data from props
        const hasProjects = availableProjects && availableProjects.length > 0;
        const hasUsers = availableUsers && availableUsers.length > 0;

        if (hasProjects && hasUsers) {
            // Use the data passed as props
            setListAvailableProjects(availableProjects);
            setListAvailableUsers(availableUsers);
            setIsDataLoaded(true);
        } else {
            // Fetch data from API only once when component mounts
            fetchFormData();
        }
    }, []); // Empty dependency array - only run once on mount

    // Populate form data after dropdown data is loaded
    useEffect(() => {
        console.log('TaskForm useEffect - initialData:', initialData); // Debug log
        console.log('TaskForm useEffect - isDataLoaded:', isDataLoaded); // Debug log
        
        // Only populate form data after dropdown data is loaded
        if (isDataLoaded) {
            if (initialData) {
                console.log('Populating form with initial data:', initialData);
                setFormData({
                    title: initialData.title || '',
                    status: initialData.status || 'To Do',
                    priority: initialData.priority || 'Medium',
                    due_date: initialData.due_date ? new Date(initialData.due_date) : (undefined as unknown as Date),
                    project_id: initialData.project_id || projectId || '',
                    assignee_id: initialData.assignee_id || '',
                });
            } else {
                // Reset form when no initial data (creating new task)
                console.log('Resetting form for new task');
                setFormData({
                    title: '',
                    status: 'To Do',
                    priority: 'Medium',
                    due_date: undefined as unknown as Date,
                    project_id: projectId || '',
                    assignee_id: '',
                });
            }
        }
    }, [initialData, projectId, isDataLoaded]); // Wait for data to be loaded

    // Validation similar to ProjectForm: gather errors and set them
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.title.trim()) newErrors.title = 'Task title is required';
        if (!formData.project_id) newErrors.project_id = 'Project is required';
        if (!formData.assignee_id) newErrors.assignee_id = 'Assignee is required';
        if (!formData.due_date) newErrors.due_date = 'Due date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle submit event similar to ProjectForm
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            console.log('Task submitted successfully:', formData);
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} task:`, error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Debug: Log current form data
    console.log('Current formData:', formData);
    console.log('Available projects:', listAvailableProjects);
    console.log('Available users:', listAvailableUsers);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                {/* Title Input */}
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

                {/* Status & Priority */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Status</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) => setFormData({ ...formData, status: value as TaskFormData['status'] })}
                        >
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
                        <Select
                            value={formData.priority}
                            onValueChange={(value) => setFormData({ ...formData, priority: value as TaskFormData['priority'] })}
                        >
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

                {/* Project Select - Always show, even if empty */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Project *</Label>
                    <Select 
                        value={formData.project_id} 
                        onValueChange={(value) => setFormData({ ...formData, project_id: value })}
                        disabled={!isDataLoaded}
                    >
                        <SelectTrigger className="border-neutral-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
                            <SelectValue placeholder={isDataLoaded ? "Select project" : "Loading projects..."} />
                        </SelectTrigger>
                        <SelectContent className="border-neutral-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                            {listAvailableProjects.map((project) => (
                                <SelectItem
                                    key={project.id}
                                    value={project.id}
                                    className="text-zinc-800 focus:bg-zinc-200 dark:text-zinc-100 dark:focus:bg-zinc-800"
                                >
                                    {project.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.project_id && <p className="text-sm text-red-500">{errors.project_id}</p>}
                </div>

                {/* Assignee Select */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Assignee *</Label>
                    <Select 
                        value={formData.assignee_id} 
                        onValueChange={(value) => setFormData({ ...formData, assignee_id: value })}
                        disabled={!isDataLoaded}
                    >
                        <SelectTrigger className="border-neutral-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
                            <SelectValue placeholder={isDataLoaded ? "Select assignee" : "Loading users..."} />
                        </SelectTrigger>
                        <SelectContent className="border-neutral-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                            {listAvailableUsers.map((user) => (
                                <SelectItem
                                    key={user.id}
                                    value={user.id}
                                    className="text-zinc-800 focus:bg-zinc-200 dark:text-zinc-100 dark:focus:bg-zinc-800"
                                >
                                    {user.name} ({user.email})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.assignee_id && <p className="text-sm text-red-500">{errors.assignee_id}</p>}
                </div>

                {/* Due Date Picker */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Due Date *</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full justify-start border-neutral-200 bg-white text-left text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.due_date ? format(formData.due_date, 'PPP') : 'Pick a due date'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={formData.due_date}
                                onSelect={(date) => {
                                    if (date) setFormData({ ...formData, due_date: date });
                                }}
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {errors.due_date && <p className="text-sm text-red-500">{errors.due_date}</p>}
                </div>
            </div>

            {/* Form actions */}
            <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !isDataLoaded}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditing ? 'Update Task' : 'Create Task'}
                </Button>
            </div>
        </form>
    );
}