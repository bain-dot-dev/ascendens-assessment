import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function TaskTable() {
  const tasks = [
    {
      id: 1,
      title: "Redesign landing page",
      status: "In Progress",
      priority: "High",
      dueDate: "May 24, 2025",
      project: "Website Redesign",
      assignee: "Alex S.",
    },
    {
      id: 2,
      title: "Create user onboarding flow",
      status: "To Do",
      priority: "Medium",
      dueDate: "May 26, 2025",
      project: "Mobile App",
      assignee: "Taylor J.",
    },
    {
      id: 3,
      title: "Update documentation",
      status: "Completed",
      priority: "Low",
      dueDate: "May 22, 2025",
      project: "Documentation",
      assignee: "Jordan L.",
    },
    {
      id: 4,
      title: "Fix navigation bug",
      status: "To Do",
      priority: "High",
      dueDate: "May 23, 2025",
      project: "Website Redesign",
      assignee: "Alex S.",
    },
    {
      id: 5,
      title: "Implement authentication",
      status: "In Progress",
      priority: "High",
      dueDate: "May 25, 2025",
      project: "Mobile App",
      assignee: "Taylor J.",
    },
  ]

  return (
    <div className="rounded-md border border-neutral-200 dark:border-zinc-800">
      <Table>
        <TableHeader className="bg-neutral-200 dark:bg-zinc-950">
          <TableRow className="border-neutral-300 dark:border-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-900">
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
          {tasks.map((task) => (
            <TableRow key={task.id} className="border-neutral-300 dark:border-zinc-800 hover:bg-neutral-200 dark:hover:bg-zinc-950">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium text-zinc-800 dark:text-zinc-100">{task.title}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`
                    ${
                      task.status === "Completed"
                        ? "border-green-500 text-green-500"
                        : task.status === "In Progress"
                          ? "border-amber-500 text-amber-500"
                          : "border-blue-500 text-blue-500"
                    }
                  `}
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`
                    ${
                      task.priority === "High"
                        ? "border-red-500 text-red-500"
                        : task.priority === "Medium"
                          ? "border-amber-500 text-amber-500"
                          : "border-green-500 text-green-500"
                    }
                  `}
                >
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell className="text-zinc-800 dark:text-zinc-400">{task.dueDate}</TableCell>
              <TableCell className="text-zinc-800 dark:text-zinc-400">{task.project}</TableCell>
              <TableCell className="text-zinc-800 dark:text-zinc-400">{task.assignee}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                    <DropdownMenuItem className="text-zinc-400 focus:text-white focus:bg-zinc-800">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-zinc-800">
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
  )
}
