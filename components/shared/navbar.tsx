'use client'

import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Settings, LogOut, UserCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { logout } from '@/service/logout'


const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
]


const userMenuItems = [
    { label: 'Profile', href: '/profile', icon: UserCircle },
    { label: 'Settings', href: '/settings', icon: Settings },
]

type IUser = {
    success: boolean,
    message: string,
    data: {
        profile: {
            id: string,
            name: string,
            email: string,
            activeStatus: string,
            role: string,
            createdAt: string,
            updatedAt: string,
            profile: {
                id: string,
                profilePhoto: string,
                bio: string | null,
                userId: string,
                createdAt: string,
                updatedAt: string
            }
        }
    }
}

type NavbarProps = {
    user: IUser
}

export function Navbar({ user }: NavbarProps) {

    const router = useRouter()
    const handleUserMenuAction = async (action: string) => {

        if (action === "logout") {
            await logout();
            toast.success("User Logged Out Successfully!");
            router.push("/login");
        }
    };

    return (
        <nav className="border-b ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl h-16 flex items-center">

                    <div className="flex-1">
                        <Link href="/" className="text-2xl font-bold">
                            RentNest
                        </Link>
                    </div>

                    <div className="hidden md:flex justify-center gap-8 flex-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex-1 flex justify-end">
                        {

                            user.success ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                                            <div className="size-8 rounded-full flex items-center justify-center bg-gray-100">
                                                <User className="size-4" />
                                            </div>

                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <div className="px-2 py-1.5">
                                            <p className="text-sm font-medium">{user.data?.profile.name || "name"}</p>
                                            <p className="text-xs text-muted-foreground">{user.data?.profile.email || "email"}</p>
                                        </div>
                                        <DropdownMenuSeparator />
                                        {userMenuItems.map((item) => {
                                            const Icon = item.icon
                                            return (
                                                <DropdownMenuItem key={item.href} asChild>
                                                    <Link href={item.href} className="cursor-pointer flex items-center gap-2">
                                                        <Icon className="size-4" />
                                                        {item.label}
                                                    </Link>
                                                </DropdownMenuItem>
                                            )
                                        })}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={async () => { await handleUserMenuAction("logout") }} className="text-red-600 flex items-center gap-2 cursor-pointer">
                                            <LogOut className="size-4" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) :
                                <Link href="/auth/login">
                                    <Button className='cursor-pointer'>Login</Button>
                                </Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}