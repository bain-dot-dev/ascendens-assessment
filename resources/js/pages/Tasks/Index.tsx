import { TaskFilters } from '@/components/task-filters';
import { TaskModal } from '@/components/task-modal';
import { TaskTable } from '@/components/task-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
// import Link from "next/link"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '/tasks',
    },
];

export default function Index() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    interface TaskFormData {
        title: string;
        status: string;
        Priority: string; // Note: Capital P to match your schema
        due_date?: Date;
        project_id: string;

        // Add other fields as needed
    }

    const handleSubmit = async (formData: TaskFormData) => {
        // Call API to save project here (Laravel backend endpoint)
        console.log('Submitting:', formData);
        setIsModalOpen(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">Tasks</h1>
                    {/* <Link href={route('tasks.create')}> */}
                    <Button onClick={() => setIsModalOpen(true)} className="bg-zinc-800 hover:bg-zinc-700 dark:bg-white dark:hover:bg-zinc-300">
                        <Plus className="mr-2 h-4 w-4" />
                        New Task
                    </Button>
                    {/* </Link> */}
                </div>

                <TaskModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />

                <TaskFilters />

                <div className="rounded-lg bg-neutral-100 p-6 dark:bg-zinc-900">
                    <TaskTable />
                </div>
            </div>
        </AppLayout>
    );
}
