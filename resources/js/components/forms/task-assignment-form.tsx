"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, UserPlus, X } from "lucide-react"

interface TaskAssignmentFormProps {
  taskId: string
  currentAssignments: TaskAssignment[]
  availableUsers: User[]
  onAddAssignment: (userId: string) => Promise<void>
  onRemoveAssignment: (assignmentId: string) => Promise<void>
}

interface TaskAssignment {
  id: string
  task_id: string
  user_id: string
  assigned_at: string
  assigned_by: string
  user: User
}

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export function TaskAssignmentForm({
  taskId,
  currentAssignments,
  availableUsers,
  onAddAssignment,
  onRemoveAssignment,
}: TaskAssignmentFormProps) {
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [isAssigning, setIsAssigning] = useState(false)

  // Filter out users who are already assigned
  const assignedUserIds = currentAssignments.map((assignment) => assignment.user_id)
  const unassignedUsers = availableUsers.filter((user) => !assignedUserIds.includes(user.id))

  const handleAddAssignment = async () => {
    if (!selectedUserId) return

    setIsAssigning(true)
    try {
      await onAddAssignment(selectedUserId)
      setSelectedUserId("")
    } catch (error) {
      console.error("Error adding assignment:", error)
    } finally {
      setIsAssigning(false)
    }
  }

  const handleRemoveAssignment = async (assignmentId: string) => {
    try {
      await onRemoveAssignment(assignmentId)
    } catch (error) {
      console.error("Error removing assignment:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Add New Assignment */}
      {unassignedUsers.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-zinc-200">Assign Additional Users</h4>
          <div className="flex gap-3">
            <div className="flex-1">
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue placeholder="Select user to assign" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {unassignedUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id} className="text-zinc-100 focus:bg-zinc-800">
                      {user.name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAddAssignment}
              disabled={!selectedUserId || isAssigning}
              className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
            >
              {isAssigning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
              Assign
            </Button>
          </div>
        </div>
      )}

      {/* Current Assignments */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-zinc-200">Current Assignments ({currentAssignments.length})</h4>
        {currentAssignments.length === 0 ? (
          <p className="text-sm text-zinc-400">No users assigned to this task</p>
        ) : (
          <div className="space-y-2">
            {currentAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={assignment.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-zinc-800 text-zinc-400">
                      {assignment.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-zinc-100">{assignment.user.name}</p>
                    <p className="text-xs text-zinc-400">{assignment.user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
                    Assigned {new Date(assignment.assigned_at).toLocaleDateString()}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveAssignment(assignment.id)}
                    className="h-7 w-7 text-zinc-400 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
