import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

type Task = {
    id: string;
    title: string;
    status: 'In Progress' | 'Completed' | 'To Do' | 'In Review' | 'Cancelled';
    priority: 'Urgent' | 'High' | 'Medium' | 'Low';
    due_date: string;
    project_id: string;
    assignee_id: string;
    project: { id: string; name: string };
    assignee: { id: string; name: string };
};

export function TaskTable({ tasks = [], onEdit, onDelete }: { tasks?: Task[]; onEdit: (task: Task) => void; onDelete: (id: string) => void }) {
    console.log(tasks);
    const safeTasks = Array.isArray(tasks) ? tasks : [];
    
    return (
        <div className="rounded-md border border-neutral-200 dark:border-zinc-800">
            <Table>
                <TableHeader className="bg-neutral-200 dark:bg-zinc-950">
                    <TableRow className="border-neutral-300 hover:bg-neutral-100 dark:border-zinc-800 dark:hover:bg-zinc-900">
                        <TableHead className="w-[40px]">
                            <Checkbox />
                        </TableHead>
                        <TableHead className="text-zinc-900 dark:text-zinc-400">Task</TableHead>
                        <TableHead className="text-zinc-900 dark:text-zinc-400">Status</TableHead>
                        <TableHead className="text-zinc-900 dark:text-zinc-400">Priority</TableHead>
                        <TableHead className="text-zinc-900 dark:text-zinc-400">Due Date</TableHead>
                        <TableHead className="text-zinc-900 dark:text-zinc-400">Project</TableHead>
                        <TableHead className="text-zinc-900 dark:text-zinc-400">Assignee</TableHead>
                        <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(safeTasks ?? []).map((task) => (
                        <TableRow key={task.id} className="border-neutral-300 hover:bg-neutral-200 dark:border-zinc-800 dark:hover:bg-zinc-950">
                            <TableCell>
                                <Checkbox />
                            </TableCell>
                            <TableCell className="font-medium text-zinc-800 dark:text-zinc-100">{task.title}</TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={` ${
                                        task.status === 'Completed'
                                            ? 'border-green-500 text-green-500'
                                            : task.status === 'In Progress'
                                              ? 'border-amber-500 text-amber-500'
                                              : 'border-blue-500 text-blue-500'
                                    } `}
                                >
                                    {task.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={` ${
                                        task.priority === 'High'
                                            ? 'border-red-500 text-red-500'
                                            : task.priority === 'Medium'
                                              ? 'border-amber-500 text-amber-500'
                                              : 'border-green-500 text-green-500'
                                    } `}
                                >
                                    {task.priority}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-zinc-800 dark:text-zinc-400">
                                {new Date(task.due_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </TableCell>
                            <TableCell className="text-zinc-800 dark:text-zinc-400">{task.project.name}</TableCell>
                            <TableCell className="text-zinc-800 dark:text-zinc-400">{task.assignee.name}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">More</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="border-neutral-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                        <DropdownMenuItem onClick={() => onEdit(task)} className="text-zinc-400 focus:bg-zinc-800 focus:text-white">
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => onDelete(task.id)}
                                            className="text-red-500 focus:bg-zinc-800 focus:text-red-500"
                                        >
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
