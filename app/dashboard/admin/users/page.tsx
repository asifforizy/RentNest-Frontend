import { getAdminUsers } from "../_actions/admin"
import { UsersTable } from "../_components/UsersTable"


export default async function AdminUsersPage() {
  const result = await getAdminUsers()

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            User Management
          </h1>

          <p className="mt-2 text-muted-foreground">
            Search and manage RentNest users.
          </p>
        </div>

        <UsersTable users={result.data} />

      </div>
    </main>
  )
}