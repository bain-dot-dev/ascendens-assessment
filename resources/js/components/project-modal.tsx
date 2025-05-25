// components/project-modal.tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProjectForm } from './forms/project-form';

interface ProjectModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        description: string;
        //status: "Planning" | "In Progress" | "On Hold" | "Completed" | "Cancelled";
        status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
        due_date: Date;
    }) => Promise<void>;
    initialData?: {
        name: string;
        description: string;
        status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
        due_date: Date;
    };
}

export const ProjectModal = ({ open, onClose, onSubmit, initialData }: ProjectModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="border-zinc-800 bg-zinc-100 text-black dark:bg-zinc-950 dark:text-white">
                <DialogHeader>
                    <DialogTitle className="text-zinc-950 dark:text-zinc-100">{initialData ? 'Edit Project' : 'Create New Project'}</DialogTitle>
                    <DialogDescription className="sr-only">
                        {initialData ? 'Edit the project details below.' : 'Fill out the form to create a new project.'}
                    </DialogDescription>
                </DialogHeader>
                <ProjectForm onSubmit={onSubmit} onCancel={onClose} initialData={initialData} />
            </DialogContent>
        </Dialog>
    );
};
