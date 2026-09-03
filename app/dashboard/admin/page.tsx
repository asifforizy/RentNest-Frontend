import { AdminUser } from "@/types/admin"
import { getAdminUsers } from "./_actions/admin"
import { AdminOverview } from "./_components/AdminOverview"
import { UserDistributionChart } from "./_components/Chart"
import { UserManagementCard } from "./_components/UserManagement"


export default async function AdminPage() {
  const result = await getAdminUsers()

  const users: AdminUser[] = result.data

  const totalUsers = users.length -1

  const activeUsers = users.filter(
    (user) => user.status === "ACTIVE"
  ).length -1

  const tenants = users.filter(
    (user) => user.role === "TENANT"
  ).length

  const landlords = users.filter(
    (user) => user.role === "LANDLORD"
  ).length

  const admins = users.filter(
    (user) => user.role === "ADMIN"
  ).length

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">

        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-muted-foreground">
            Overview of your RentNest platform.
          </p>
        </div>
        <AdminOverview
          totalUsers={totalUsers}
          activeUsers={activeUsers}
          tenants={tenants}
          landlords={landlords}
        />
        <UserDistributionChart
          tenants={tenants}
          landlords={landlords}
          admins={admins}
          totalUsers={totalUsers}
        />
        <UserManagementCard />

      </div>
    </main>
  )
}