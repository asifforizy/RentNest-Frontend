'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, LogOut, User } from 'lucide-react'
import { toast } from 'sonner'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { logout } from '@/service/logout'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

type IUser = {
  success: boolean
  message: string
  data: {
    profile: {
      id: string
      name: string
      email: string
      profilePhoto: string
      phone: string
      address: string
      role: string
      status: string
      stripeCustomerId: string | null
      createdAt: string
      updatedAt: string
    }
  }
}

type NavbarProps = {
  user: IUser
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      await logout()

      toast.success('User Logged Out Successfully!')

      router.push('/auth/login')
      router.refresh()
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  return (
    <nav className="border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">

          <div className="flex-1">
            <Link
              href="/"
              className="text-2xl font-bold"
            >
              RentNest
            </Link>
          </div>

          <div className="hidden flex-1 justify-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-foreground font-bold text-zinc-900 '
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex flex-1 justify-end">
            {user.success ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex size-9 items-center justify-center rounded-full bg-muted transition-opacity hover:opacity-80"
                  >
                    <User className="size-5" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56"
                >

                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">
                      {user.data.profile.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {user.data.profile.email}
                    </p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard"
                      className={`flex cursor-pointer items-center gap-2 ${
                        pathname.startsWith('/dashboard')
                          ? 'font-medium'
                          : ''
                      }`}
                    >
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

    
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex cursor-pointer items-center gap-2 text-red-600 focus:text-red-600"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button className="cursor-pointer">
                  Login
                </Button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}

