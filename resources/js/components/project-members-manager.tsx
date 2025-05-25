"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InviteMemberForm } from "@/components/forms/invite-member-form"
import { TaskAssignmentForm } from "@/components/forms/task-assignment-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, UserPlus, Settings, Trash2, Edit } from "lucide-react"

interface ProjectMembersManagerProps {
  projectId: string
}

interface ProjectMember {
  id: string
  user_id: string
  project_id: string
  role: string
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  created_at: string
  updated_at: string
}

interface ProjectTask {
  id: string
  title: string
  status: string
  Priority: string
  assignee_id: string
  assignments: TaskAssignment[]
}

interface TaskAssignment {
  id: string
  task_id: string
  user_id: string
  assigned_at: string
  assigned_by: string
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
}

export function ProjectMembersManager({ projectId }: ProjectMembersManagerProps) {
  const [members, setMembers] = useState<ProjectMember[]>([])
  const [tasks, setTasks] = useState<ProjectTask[]>([])
  const [selectedTask, setSelectedTask] = useState<string>("")
  const [editingMember, setEditingMember] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMembers([
        {
          id: "1",
          user_id: "user1",
          project_id: projectId,
          role: "Owner",
          user: {
            id: "user1",
            name: "John Doe",
            email: "john@example.com",
            avatar: "/placeholder.svg",
          },
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
        },
        {
          id: "2",
          user_id: "user2",
          project_id: projectId,
          role: "Admin",
          user: {
            id: "user2",
            name: "Jane Smith",
            email: "jane@example.com",
          },
          created_at: "2024-01-02",
          updated_at: "2024-01-02",
        },
      ])

      setTasks([
        {
          id: "task1",
          title: "Design Homepage",
          status: "In Progress",
          Priority: "High",
          assignee_id: "user1",
          assignments: [
            {
              id: "assign1",
              task_id: "task1",
              user_id: "user1",
              assigned_at: "2024-01-01",
              assigned_by: "user1",
              user: {
                id: "user1",
                name: "John Doe",
                email: "john@example.com",
              },
            },
          ],
        },
      ])

      setIsLoading(false)
    }, 1000)
  }, [projectId])

  const handleInviteMember = async (data: { email: string; role: string }) => {
    // API call to invite member
    console.log("Inviting member:", data)
    // Refresh members list
  }

  const handleUpdateMemberRole = async (memberId: string, role: string) => {
    // API call to update member role
    console.log("Updating member role:", memberId, role)
    setEditingMember(null)
    // Refresh members list
  }

  const handleRemoveMember = async (memberId: string) => {
    // API call to remove member
    console.log("Removing member:", memberId)
    // Refresh members list
  }

  const handleAddTaskAssignment = async (userId: string) => {
    if (!selectedTask) return
    // API call to add task assignment
    console.log("Adding task assignment:", selectedTask, userId)
    // Refresh task assignments
  }

  const handleRemoveTaskAssignment = async (assignmentId: string) => {
    // API call to remove task assignment
    console.log("Removing task assignment:", assignmentId)
    // Refresh task assignments
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Owner":
        return "bg-purple-600 text-white"
      case "Admin":
        return "bg-blue-600 text-white"
      case "Member":
        return "bg-green-600 text-white"
      case "Viewer":
        return "bg-gray-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-zinc-400">Loading project members...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
          <TabsTrigger
            value="members"
            className="data-[state=active]:bg-zinc-800 text-zinc-400 data-[state=active]:text-white"
          >
            <Users className="mr-2 h-4 w-4" />
            Project Members
          </TabsTrigger>
          <TabsTrigger
            value="assignments"
            className="data-[state=active]:bg-zinc-800 text-zinc-400 data-[state=active]:text-white"
          >
            <Settings className="mr-2 h-4 w-4" />
            Task Assignments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          {/* Invite New Member */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-100 flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                Invite New Member
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InviteMemberForm projectId={projectId} onSubmit={handleInviteMember} onCancel={() => {}} />
            </CardContent>
          </Card>

          {/* Current Members */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-100">Current Members ({members.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg border border-zinc-700"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-zinc-700 text-zinc-300">
                          {member.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-zinc-100">{member.user.name}</p>
                        <p className="text-sm text-zinc-400">{member.user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {editingMember === member.id ? (
                        <div className="flex items-center space-x-2">
                          <select
                            value={member.role}
                            onChange={(e) => handleUpdateMemberRole(member.id, e.target.value)}
                            className="bg-zinc-700 border border-zinc-600 rounded px-2 py-1 text-zinc-100 text-sm"
                            disabled={member.role === "Owner"}
                          >
                            <option value="Viewer">Viewer</option>
                            <option value="Member">Member</option>
                            <option value="Admin">Admin</option>
                            {member.role === "Owner" && <option value="Owner">Owner</option>}
                          </select>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingMember(null)}
                            className="text-zinc-400 hover:text-white"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Badge className={getRoleBadgeColor(member.role)}>{member.role}</Badge>
                          <div className="flex items-center space-x-1">
                            {member.role !== "Owner" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingMember(member.id)}
                                  className="h-8 w-8 text-zinc-400 hover:text-white"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveMember(member.id)}
                                  className="h-8 w-8 text-zinc-400 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          {/* Task Selection */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-100">Select Task to Manage Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-zinc-100"
              >
                <option value="">Select a task...</option>
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title} - {task.status}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Task Assignment Management */}
          {selectedTask && (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100">
                  Manage Assignments: {tasks.find((t) => t.id === selectedTask)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TaskAssignmentForm
                  taskId={selectedTask}
                  currentAssignments={tasks.find((t) => t.id === selectedTask)?.assignments || []}
                  availableUsers={members.map((m) => m.user)}
                  onAddAssignment={handleAddTaskAssignment}
                  onRemoveAssignment={handleRemoveTaskAssignment}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
