import { ProjectList } from '@/components/project-list';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
// import Link from "next/link"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">Projects</h1>
                    <Link href={route('projects.create')}>
                        <Button className="bg-zinc-800 hover:bg-zinc-700 dark:bg-white dark:hover:bg-zinc-300">
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg bg-neutral-100 dark:bg-zinc-900 p-6">
                    <ProjectList />
                </div>
            </div>
        </AppLayout>
    );
}
