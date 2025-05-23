"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Link } from "@inertiajs/react"

export function MarketingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-white">TaskMaster</span>
        </Link>
        <nav className="hidden md:flex ml-auto items-center gap-6">
          <Link href="#features" className="text-sm font-medium text-zinc-400 hover:text-white">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white">
            Pricing
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-zinc-400 hover:text-white">
            Testimonials
          </Link>
          <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white">
            Sign In
          </Link>
          <Button asChild className="bg-white text-black hover:bg-zinc-200">
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
        <div className="flex md:hidden ml-auto">
          <Button variant="ghost" size="icon" className="text-zinc-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black">
          <div className="container flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">TaskMaster</span>
            </Link>
            <Button variant="ghost" size="icon" className="text-zinc-400" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="container flex flex-col gap-6 px-4 py-8">
            <Link
              href="#features"
              className="text-lg font-medium text-zinc-400 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-lg font-medium text-zinc-400 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-lg font-medium text-zinc-400 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/login"
              className="text-lg font-medium text-zinc-400 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Button
              asChild
              className="bg-white text-black hover:bg-zinc-200 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
