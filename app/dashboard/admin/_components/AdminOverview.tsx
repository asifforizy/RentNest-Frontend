import {
  Users,
  UserCheck,
  Building2,
  UserRound,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type AdminOverviewProps = {
  totalUsers: number
  activeUsers: number
  tenants: number
  landlords: number
}

export function AdminOverview({
  totalUsers,
  activeUsers,
  tenants,
  landlords,
}: AdminOverviewProps) {
  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "All registered users",
      icon: Users,
    },
    {
      title: "Active Users",
      value: activeUsers,
      description: "Currently active users",
      icon: UserCheck,
    },
    {
      title: "Tenants",
      value: tenants,
      description: "Registered tenants",
      icon: UserRound,
    },
    {
      title: "Landlords",
      value: landlords,
      description: "Registered landlords",
      icon: Building2,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold">
                {stat.title}
              </CardTitle>

              <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">
                {stat.value.toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}