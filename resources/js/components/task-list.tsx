import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calendar, MessageSquare, MoreHorizontal } from 'lucide-react';

export function TaskList() {
    const tasks = [
        {
            id: 1,
            title: 'Redesign landing page',
            completed: false,
            dueDate: 'May 24, 2025',
            tags: ['Design', 'Website'],
            comments: 5,
            priority: 'High',
        },
        {
            id: 2,
            title: 'Create user onboarding flow',
            completed: false,
            dueDate: 'May 26, 2025',
            tags: ['UX', 'Design'],
            comments: 3,
            priority: 'Medium',
        },
        {
            id: 3,
            title: 'Update documentation',
            completed: true,
            dueDate: 'May 22, 2025',
            tags: ['Documentation'],
            comments: 0,
            priority: 'Low',
        },
        {
            id: 4,
            title: 'Fix navigation bug',
            completed: false,
            dueDate: 'May 23, 2025',
            tags: ['Bug', 'Frontend'],
            comments: 2,
            priority: 'High',
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Current Tasks</h2>
                <Button
                    variant="outline"
                    className="h-8 border-neutral-200 bg-transparent text-xs text-zinc-800 hover:bg-neutral-200 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                    View All
                </Button>
            </div>

            <div className="space-y-2">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`rounded-lg border p-4 ${
                            task.completed
                                ? 'border-neutral-300 bg-neutral-200/50 dark:border-zinc-800 dark:bg-zinc-900/50'
                                : 'bg-neutral-100 dark:border-zinc-800 dark:bg-zinc-900'
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                                <Checkbox
                                    id={`task-${task.id}`}
                                    checked={task.completed}
                                    className={task.completed ? 'text-white dark:text-zinc-500' : ''}
                                />
                                <div className="space-y-1">
                                    <label
                                        htmlFor={`task-${task.id}`}
                                        className={`font-medium ${task.completed ? 'text-zinc-500 line-through dark:text-neutral-200' : 'text-zinc-800 dark:text-zinc-100'}`}
                                    >
                                        {task.title}
                                    </label>
                                    <div className="flex items-center space-x-3 text-xs text-zinc-600 dark:text-zinc-500">
                                        <div className="flex items-center">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {task.dueDate}
                                        </div>
                                        <div className="flex items-center">
                                            <MessageSquare className="mr-1 h-3 w-3" />
                                            {task.comments}
                                        </div>
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

                            <div className="flex items-center space-x-2">
                                <div className="flex space-x-1">
                                    {task.tags.map((tag, i) => (
                                        <Badge key={i} variant="secondary" className="bg-neutral-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-700">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">More</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                                        <DropdownMenuItem className="text-zinc-900 dark:text-zinc-400 focus:bg-zinc-800 focus:text-white">Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="text-zinc-900 dark:text-zinc-400 focus:bg-zinc-800 focus:text-white">Duplicate</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-500 focus:bg-zinc-800 focus:text-red-500">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
