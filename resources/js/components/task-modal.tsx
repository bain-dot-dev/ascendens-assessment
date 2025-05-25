// components/ProjectModal.tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TaskForm } from './forms/task-form';

interface TaskModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: {
        title: string;
        status: 'In Progress' | 'Completed' | 'To Do' | 'In Review' | 'Cancelled';
        priority: 'High' | 'Medium' | 'Low';
        due_date: Date;
        project_id: string;
        assignee_id: string;
    }) => Promise<void>;
    // projectId?: string;
    // availableProjects?: { id: string; name: string }[];
    // availableUsers?: { id: string; name: string; email: string }[];
    initialData?: {
        title: string;
        status: 'In Progress' | 'Completed' | 'To Do' | 'In Review' | 'Cancelled';
        priority: 'High' | 'Medium' | 'Low';
        due_date: Date;
        project_id: string;
        assignee_id: string;
    };
}

export const TaskModal = ({ open, onClose, onSubmit, initialData }: TaskModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="border-zinc-800 bg-zinc-100 text-black dark:bg-zinc-950 dark:text-white">
                <DialogHeader>
                    <DialogTitle className="text-zinc-950 dark:text-zinc-100">{initialData ? 'Edit Task' : 'Create New Task'}</DialogTitle>
                    <DialogDescription className="sr-only">
                        {initialData ? 'Edit the task details below.' : 'Fill out the form to create a new task.'}
                    </DialogDescription>
                </DialogHeader>
                <TaskForm onSubmit={onSubmit} onCancel={onClose} initialData={initialData} />
            </DialogContent>
        </Dialog>
    );
};
