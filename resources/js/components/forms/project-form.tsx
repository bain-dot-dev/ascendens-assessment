// components/forms/project-form.tsx
'use client';

import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export interface ProjectFormData {
    name: string;
    description: string;
    status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
    due_date: Date;
}

interface ProjectFormProps {
    initialData?: ProjectFormData;
    onSubmit: (data: ProjectFormData) => Promise<void>;
    onCancel: () => void;
}

const statuses = ['Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled'];

export function ProjectForm({ initialData, onSubmit, onCancel }: ProjectFormProps) {
    const [formData, setFormData] = useState<ProjectFormData>({
        name: '',
        description: '',
        status: 'Planning',
        due_date: undefined as unknown as Date,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const isEditing = !!initialData;

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description || '',
                status: initialData.status,
                due_date: initialData.due_date ? new Date(initialData.due_date) : (undefined as unknown as Date),
            });
        }
    }, [initialData]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Project name is required';
        if (!formData.due_date) newErrors.due_date = 'Due date is required';
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
            console.error(`Error ${isEditing ? 'updating' : 'creating'} project:`, error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        Project Name *
                    </Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter project name"
                        className="border-neutral-200 bg-white text-zinc-800 placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your project"
                        rows={4}
                        className="border-neutral-200 bg-white text-zinc-800 placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Status</Label>
                    <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value as ProjectFormData['status'] })}
                    >
                        <SelectTrigger className="border-neutral-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="border-neutral-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                            {statuses.map((status) => (
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
                                onSelect={(date) => {
                                    if (date) {
                                        setFormData({ ...formData, due_date: date });
                                    }
                                }}
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
                    {isEditing ? 'Update Project' : 'Create Project'}
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
