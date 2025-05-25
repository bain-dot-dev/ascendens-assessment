"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Mail } from "lucide-react"

interface InviteMemberFormProps {
  projectId: string
  onSubmit: (data: InviteMemberData) => Promise<void>
  onCancel: () => void
}

interface InviteMemberData {
  email: string
  role: string
}

export function InviteMemberForm({ projectId, onSubmit, onCancel }: InviteMemberFormProps) {
  const [formData, setFormData] = useState<InviteMemberData>({
    email: "",
    role: "member",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setFormData({ email: "", role: "member" })
    } catch (error) {
      console.error("Error inviting member:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-zinc-200">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="colleague@example.com"
            className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-zinc-200">Role</Label>
          <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
            <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="viewer" className="text-zinc-100 focus:bg-zinc-800">
                Viewer - Can view project and tasks
              </SelectItem>
              <SelectItem value="member" className="text-zinc-100 focus:bg-zinc-800">
                Member - Can create and edit tasks
              </SelectItem>
              <SelectItem value="admin" className="text-zinc-100 focus:bg-zinc-800">
                Admin - Can manage project and members
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1 bg-zinc-100 text-zinc-900 hover:bg-zinc-200">
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
          Send Invitation
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
