import Link from "next/link"
import { ArrowRight, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function UserManagementCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <Users className="h-5 w-5" />
          </div>

          <div>
            <CardTitle className="text-xl">
              User Management
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage registered users
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-5 text-sm leading-6 text-muted-foreground">
          View users, search accounts, and manage user
          status from the user management page.
        </p>

        <Button asChild>
          <Link href="/dashboard/admin/users">
            Manage Users
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}