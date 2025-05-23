import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { BarChart, Bell, CheckSquare, FolderKanban, LayoutDashboard, Users } from 'lucide-react';

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    const icons: Record<string, LucideIcon> = {
        LayoutDashboard,
        CheckSquare,
        FolderKanban,
        Users,
        Bell,
        BarChart,
    };

    const Icon = icons[icon] || LayoutDashboard;

    return (
        <Card className="border-neutral-300 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-900">
            <CardContent className="space-y-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-300 dark:bg-zinc-800">
                    <Icon className="h-6 w-6 text-black dark:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white">{title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
            </CardContent>
        </Card>
    );
}
