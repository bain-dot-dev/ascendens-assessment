import { Link } from "@inertiajs/react"

interface AuthHeaderProps {
  title: string
  description: string
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <Link href="/" className="mx-auto">
        <h1 className="text-2xl font-bold text-white">TaskMaster</h1>
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
      <p className="text-sm text-zinc-400">{description}</p>
    </div>
  )
}
