"use client"

import { useMemo, useState } from "react"
import {
    Ban,
    CheckCircle,
    Loader2,
    Search,
} from "lucide-react"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AdminUser, UserStatus } from "@/types/admin"
import { updateUser } from "../_actions/admin"


type UsersTableProps = {
    users: AdminUser[]
}

const USERS_PER_PAGE = 20

export function UsersTable({
    users: initialUsers,
}: UsersTableProps) {
    const [users, setUsers] = useState<AdminUser[]>(
        initialUsers
    )

    const [search, setSearch] = useState("")

    const [page, setPage] = useState(1)

    const [loadingId, setLoadingId] =
        useState<string | null>(null)

    const filteredUsers = useMemo(() => {
        const value = search.trim().toLowerCase()

        if (!value) {
            return users
        }

        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(value) ||
                user.email.toLowerCase().includes(value)
        )
    }, [users, search])

    const totalPages = Math.max(
        1,
        Math.ceil(filteredUsers.length / USERS_PER_PAGE)
    )

    const visibleUsers = filteredUsers.slice(
        (page - 1) * USERS_PER_PAGE,
        page * USERS_PER_PAGE
    )

    const handleSearch = (value: string) => {
        setSearch(value)
        setPage(1)
    }

    const handleStatusChange = async (
        userId: string,
        status: UserStatus
    ) => {
        try {
            setLoadingId(userId)

            await updateUser(userId, {
                status,
            })

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.id === userId
                        ? {
                            ...user,
                            status,
                        }
                        : user
                )
            )

            toast.success(
                status === "BANNED"
                    ? "User banned successfully"
                    : "User activated successfully"
            )
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update user"
            )
        } finally {
            setLoadingId(null)
        }
    }

    return (
        <div className="space-y-6">

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    value={search}
                    onChange={(event) =>
                        handleSearch(event.target.value)
                    }
                    placeholder="Search by name or email..."
                    className="pl-9"
                />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border bg-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">

                        <thead>
                            <tr className="border-b bg-muted/40 text-left">
                                <th className="px-6 py-4 font-semibold">
                                    Name
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    Email
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    Role
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-right font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {visibleUsers.map((user) => {
                                const isActive =
                                    user.status === "ACTIVE"

                                const isLoading =
                                    loadingId === user.id

                                return (
                                    <tr
                                        key={user.id}
                                        className="border-b last:border-0"
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            {user.name}
                                        </td>

                                        <td className="px-6 py-4 text-muted-foreground">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            <Badge variant="outline">
                                                {user.role}
                                            </Badge>
                                        </td>

                                        <td className="px-6 py-4">
                                            <Badge
                                                variant={
                                                    isActive
                                                        ? "default"
                                                        : "destructive"
                                                }
                                            >
                                                {user.status}
                                            </Badge>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <Button
                                                size="sm"
                                                variant={
                                                    isActive
                                                        ? "destructive"
                                                        : "default"
                                                }
                                                disabled={isLoading}
                                                onClick={() =>
                                                    handleStatusChange(
                                                        user.id,
                                                        isActive
                                                            ? "BANNED"
                                                            : "ACTIVE"
                                                    )
                                                }
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Updating...
                                                    </>
                                                ) : isActive ? (
                                                    <>
                                                        <Ban className="mr-2 h-4 w-4" />
                                                        Ban
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Activate
                                                    </>
                                                )}
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>

                {/* Empty */}
                {visibleUsers.length === 0 && (
                    <div className="py-12 text-center text-muted-foreground">
                        No users found.
                    </div>
                )}

                {/* Pagination */}
                {filteredUsers.length > 0 && (
                    <div className="flex items-center justify-between border-t px-6 py-4">

                        <p className="text-sm text-muted-foreground">
                            Page {page} of {totalPages}
                        </p>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1}
                                onClick={() =>
                                    setPage((current) => current - 1)
                                }
                            >
                                Previous
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === totalPages}
                                onClick={() =>
                                    setPage((current) => current + 1)
                                }
                            >
                                Next
                            </Button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}