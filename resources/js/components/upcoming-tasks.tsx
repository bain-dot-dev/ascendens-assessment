import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';

export function UpcomingTasks() {
    const tasks = [
        { id: 1, title: 'Finalize project proposal', due_date: 'Today', priority: 'High' },
        { id: 2, title: 'Review client feedback', due_date: 'Tomorrow', priority: 'Medium' },
        { id: 3, title: 'Team meeting', due_date: 'May 25', priority: 'Low' },
    ];

    return (
        <Card className="bg-neutral-100/40 dark:border-zinc-800 dark:bg-zinc-900">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-950 dark:text-zinc-100">Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="flex items-start space-x-3">
                            <CalendarClock className="mt-0.5 h-5 w-5 text-zinc-900 dark:text-zinc-500" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-100">{task.title}</p>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-zinc-600 dark:text-zinc-500">{task.due_date}</span>
                                    <Badge
                                        variant="outline"
                                        className={`text-xs ${
                                            task.priority === 'High'
                                                ? 'border-red-500 text-red-500'
                                                : task.priority === 'Medium'
                                                  ? 'border-amber-500 text-amber-500'
                                                  : 'border-green-500 text-green-500'
                                        }`}
                                    >
                                        {task.priority}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
