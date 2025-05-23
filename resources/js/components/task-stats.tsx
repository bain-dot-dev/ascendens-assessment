import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function TaskStats() {
    return (
        <Card className="bg-neutral-100/40 dark:border-zinc-800 dark:bg-zinc-900">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-950 dark:text-zinc-100">Task Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-green-500/20 p-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                            <p className="text-xs text-zinc-900 dark:text-zinc-500">Completed</p>
                            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">12</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-amber-500/20 p-2">
                            <Clock className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-xs text-zinc-900 dark:text-zinc-500">In Progress</p>
                            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">8</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-red-500/20 p-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                            <p className="text-xs text-zinc-900 dark:text-zinc-500">Overdue</p>
                            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">3</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
