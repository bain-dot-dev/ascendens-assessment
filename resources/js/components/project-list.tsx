import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ProjectList() {
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Redesign the company website with new branding",
      progress: 65,
      status: "In Progress",
      tasks: { completed: 8, total: 12 },
      members: [
        { name: "Alex S.", initials: "AS" },
        { name: "Taylor J.", initials: "TJ" },
        { name: "Jordan L.", initials: "JL" },
      ],
      dueDate: "June 15, 2025",
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Create a new mobile app for iOS and Android",
      progress: 30,
      status: "In Progress",
      tasks: { completed: 5, total: 18 },
      members: [
        { name: "Taylor J.", initials: "TJ" },
        { name: "Jordan L.", initials: "JL" },
      ],
      dueDate: "August 30, 2025",
    },
    {
      id: 3,
      name: "Marketing Campaign",
      description: "Q3 marketing campaign for product launch",
      progress: 10,
      status: "Planning",
      tasks: { completed: 2, total: 15 },
      members: [{ name: "Alex S.", initials: "AS" }],
      dueDate: "July 10, 2025",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="dark:bg-zinc-900 border-neutral-200 dark:border-zinc-800">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{project.name}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{project.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <DropdownMenuItem className="text-zinc-900 dark:text-zinc-400 focus:bg-zinc-800 focus:text-white">
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-zinc-900 dark:text-zinc-400 focus:bg-zinc-800 focus:text-white">
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-zinc-800">
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Progress</span>
                  <span className="text-zinc-100">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2 bg-zinc-800" />
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={`
                    ${
                      project.status === "Completed"
                        ? "border-green-500 text-green-500"
                        : project.status === "In Progress"
                          ? "border-amber-500 text-amber-500"
                          : "border-blue-500 text-blue-500"
                    }
                  `}
                >
                  {project.status}
                </Badge>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">
                  {project.tasks.completed}/{project.tasks.total} tasks
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-400 dark:border-zinc-800">
                <div className="flex -space-x-2">
                  {project.members.map((member, i) => (
                    <Avatar key={i} className="h-7 w-7 border-2 border-neutral-200 dark:border-zinc-900">
                      <AvatarImage src={`/placeholder.svg?height=28&width=28`} />
                      <AvatarFallback className="bg-neutral-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-400 text-xs">{member.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">Due {project.dueDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
