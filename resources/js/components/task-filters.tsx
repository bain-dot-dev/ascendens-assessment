import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export function TaskFilters() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-zinc-500" />
                <Input
                    type="search"
                    placeholder="Search tasks..."
                    className="border-neutral-200 bg-neutral-100 pl-8 text-zinc-100 placeholder:text-zinc-500 focus:ring-neutral-200 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-visible:ring-zinc-700"
                />
            </div>
            <div className="flex gap-2">
                <Select defaultValue="all">
                    <SelectTrigger className="w-[130px] border-neutral-200 bg-neutral-100 text-zinc-900 focus:ring-neutral-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-700">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="border-zinc-800 bg-zinc-900">
                        <SelectItem value="all" className="text-zinc-100 focus:bg-zinc-800">
                            All
                        </SelectItem>
                        <SelectItem value="todo" className="text-zinc-100 focus:bg-zinc-800">
                            To Do
                        </SelectItem>
                        <SelectItem value="in-progress" className="text-zinc-100 focus:bg-zinc-800">
                            In Progress
                        </SelectItem>
                        <SelectItem value="completed" className="text-zinc-100 focus:bg-zinc-800">
                            Completed
                        </SelectItem>
                    </SelectContent>
                </Select>

                <Select defaultValue="all">
                    <SelectTrigger className="w-[130px] border-neutral-200 bg-neutral-100 text-zinc-900 focus:ring-neutral-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-700">
                        <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent className="border-zinc-800 bg-zinc-900">
                        <SelectItem value="all" className="text-zinc-100 focus:bg-zinc-800">
                            All
                        </SelectItem>
                        <SelectItem value="high" className="text-zinc-100 focus:bg-zinc-800">
                            High
                        </SelectItem>
                        <SelectItem value="medium" className="text-zinc-100 focus:bg-zinc-800">
                            Medium
                        </SelectItem>
                        <SelectItem value="low" className="text-zinc-100 focus:bg-zinc-800">
                            Low
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
