import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Task {
    id: string | number;
    title: string;
    due_date: string;
    priority: 'Low' | 'Medium' | 'High' | 'Urgent'; // adjust based on your API
}

export function UpcomingTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const res = await fetch('/upcoming-tasks'); // Adjust your API endpoint here
                if (!res.ok) throw new Error('Failed to fetch tasks');
                const data = await res.json();
                console.log(data);
                setTasks(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchTasks();
    }, []);

    if (loading) {
        return <div>Loading upcoming tasks...</div>;
    }

    if (tasks.length === 0) {
        return <div>No upcoming tasks</div>;
    }

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
                                    <span className="text-xs text-zinc-600 dark:text-zinc-500">
                                        {(() => {
                                            const dueDate = new Date(task.due_date);
                                            const today = new Date();
                                            const tomorrow = new Date();
                                            tomorrow.setDate(today.getDate() + 1);

                                            const isSameDay = (a: Date, b: Date) =>
                                                a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

                                            if (isSameDay(dueDate, today)) return 'Today';
                                            if (isSameDay(dueDate, tomorrow)) return 'Tomorrow';

                                            return dueDate.toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            });
                                        })()}
                                    </span>

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
