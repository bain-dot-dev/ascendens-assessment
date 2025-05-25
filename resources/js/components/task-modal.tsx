// components/ProjectModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TaskForm } from './forms/task-form';

interface TaskModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; status: string; Priority: string; due_date?: Date; project_id: string; assignee_id: string }) => Promise<void>;
    projectId?: string;
    availableProjects?: { id: string; name: string }[];
    availableUsers?: { id: string; name: string; email: string }[];
}

export const TaskModal = ({ open, onClose, onSubmit }: TaskModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="border-zinc-800 bg-zinc-100 text-black dark:bg-zinc-950 dark:text-white">
                <DialogHeader>
                    <DialogTitle className="text-zinc-950 dark:text-zinc-100">Create New Task</DialogTitle>
                </DialogHeader>
                <TaskForm onSubmit={onSubmit} onCancel={onClose} />
            </DialogContent>
        </Dialog>
    );
};
