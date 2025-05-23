import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
}

export function TestimonialCard({ quote, author, role, company }: TestimonialCardProps) {
  return (
    <Card className="bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800">
      <CardContent className="p-6 space-y-4">
        <Quote className="h-8 w-8 text-zinc-500 dark:text-zinc-700" />
        <p className="text-zinc-700 dark:text-zinc-300">{quote}</p>
        <div className="flex items-center space-x-3 pt-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-zinc-300 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400">
              {author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-black dark:text-white">{author}</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {role}, {company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
