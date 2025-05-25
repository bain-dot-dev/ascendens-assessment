import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { MoreHorizontal } from 'lucide-react';

type Project = {
    id: string;
    name: string;
    description: string;
    progress: number;
    status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
    tasks: {
        completed: number;
        total: number;
    };
    members: {
        initials: string;
    }[];
    due_date: string;
};

export function ProjectList({
    projects = [],
    onEdit,
    onDelete,
}: {
    projects?: Project[];
    onEdit: (project: Project) => void;
    onDelete: (id: string) => void;
}) {
    console.log(projects);
const safeProjects = Array.isArray(projects) ? projects : [];
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(safeProjects ?? []).map((project) => (
                <Card key={project.id} className="border-neutral-200 dark:border-zinc-800 dark:bg-zinc-900">
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{project.name}</h3>
                                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">More</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="border-neutral-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                        <DropdownMenuItem className="text-zinc-900 focus:bg-zinc-800 focus:text-white dark:text-zinc-400">
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => onEdit(project)}
                                            className="text-zinc-900 focus:bg-zinc-800 focus:text-white dark:text-zinc-400"
                                        >
                                            Edit Project
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => onDelete(project.id)}
                                            className="text-red-500 focus:bg-zinc-800 focus:text-red-500"
                                        >
                                            Delete Project
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-600 dark:text-zinc-400">Progress</span>
                                    <span className="text-zinc-600 dark:text-zinc-100">{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-2 bg-zinc-300 dark:bg-zinc-800" />
                            </div>

                            <div className="flex items-center justify-between">
                                <Badge
                                    variant="outline"
                                    className={`${
                                        project.status === 'Completed'
                                            ? 'border-green-500 text-green-500'
                                            : project.status === 'In Progress'
                                              ? 'border-amber-500 text-amber-500'
                                              : 'border-blue-500 text-blue-500'
                                    }`}
                                >
                                    {project.status}
                                </Badge>
                                <span className="text-xs text-zinc-600 dark:text-zinc-400">
                                    {project.tasks?.completed ?? 0}/{project.tasks?.total ?? 0} tasks
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-t border-zinc-400 pt-2 dark:border-zinc-800">
                                <div className="flex -space-x-2">
                                    {(project.members ?? []).map((member, i) => (
                                        <Avatar key={i} className="h-7 w-7 border-2 border-neutral-200 dark:border-zinc-900">
                                            <AvatarImage src={`/placeholder.svg?height=28&width=28`} />
                                            <AvatarFallback className="bg-neutral-100 text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
                                                {member.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                                <span className="text-xs text-zinc-600 dark:text-zinc-400">
                                    Due{' '}
                                    {project.due_date && !isNaN(Date.parse(project.due_date))
                                        ? new Date(project.due_date).toLocaleDateString()
                                        : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
