import { TaskFilters } from '@/components/task-filters';
import { TaskTable } from '@/components/task-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
// import Link from "next/link"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '/tasks',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="Tasks" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">Tasks</h1>
                    <Link href={route('tasks.create')}>
                    <Button className="bg-zinc-800 dark:bg-white hover:bg-zinc-700 dark:hover:bg-zinc-300">
                        <Plus className="mr-2 h-4 w-4" />
                        New Task
                    </Button>
                    </Link>
                </div>

                <TaskFilters />

                <div className="rounded-lg bg-neutral-100 dark:bg-zinc-900 p-6">
                    <TaskTable />
                </div>
            </div>
        </AppLayout>
    );
}
