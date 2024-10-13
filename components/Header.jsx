"use client"

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ShoppingBag, User, LogOut } from "lucide-react"

const Header = () => {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          LocalEase
        </Link>
        <nav className="flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link href="/place-order">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Place Order
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/account">
              <User className="mr-2 h-4 w-4" />
              Account
            </Link>
          </Button>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}

export default Header