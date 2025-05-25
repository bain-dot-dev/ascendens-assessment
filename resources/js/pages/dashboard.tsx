// import { RecentActivity } from '@/components/recent-activity';
import { TaskList } from '@/components/task-list';
import { TaskStats } from '@/components/task-stats';
import { UpcomingTasks } from '@/components/upcoming-tasks';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6 p-6">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <TaskStats />

                    <UpcomingTasks />

                    {/* <RecentActivity /> */}
                </div>

                <div className="rounded-lg bg-neutral-100 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                    <TaskList />
                </div>
            </div>
        </AppLayout>
    );
}
