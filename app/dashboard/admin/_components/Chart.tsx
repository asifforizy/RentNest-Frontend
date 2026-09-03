"use client"

import { Pie, PieChart } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

type UserDistributionChartProps = {
    tenants: number
    landlords: number
    admins: number
    totalUsers: number
}

export function UserDistributionChart({
    tenants,
    landlords,
    admins,
    totalUsers,
}: UserDistributionChartProps) {
    const chartData = [
        {
            role: "tenants",
            users: tenants,
            fill: "var(--color-tenants)",
        },
        {
            role: "landlords",
            users: landlords,
            fill: "var(--color-landlords)",
        },
        {
            role: "admins",
            users: admins,
            fill: "var(--color-admins)",
        },
    ]

    const chartConfig = {
        users: {
            label: "Users",
        },
        tenants: {
            label: "Tenants",
            color: "var(--chart-1)",
        },
        landlords: {
            label: "Landlords",
            color: "var(--chart-3)",
        },
        admins: {
            label: "Admins",
            color: "var(--chart-4)",
        },
    } satisfies ChartConfig

    return (
        <div className="rounded-xl border bg-card p-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold">
                    User Distribution
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Distribution of users by role
                </p>
            </div>

            <div className="grid items-center gap-8 md:grid-cols-2">

                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[320px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent hideLabel />
                            }
                        />

                        <Pie
                            data={chartData}
                            dataKey="users"
                            nameKey="role"
                            innerRadius={75}
                            outerRadius={115}
                            strokeWidth={5}
                        />
                    </PieChart>
                </ChartContainer>

                <div className="space-y-5">

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full bg-[var(--chart-1)]" />

                            <span className="text-sm font-medium">
                                Tenants
                            </span>
                        </div>

                        <span className="font-semibold">
                            {tenants.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full bg-[var(--chart-2)]" />

                            <span className="text-sm font-medium">
                                Landlords
                            </span>
                        </div>

                        <span className="font-semibold">
                            {landlords.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full bg-[var(--chart-3)]" />

                            <span className="text-sm font-medium">
                                Admins
                            </span>
                        </div>

                        <span className="font-semibold">
                            {admins.toLocaleString()}
                        </span>
                    </div>

                    <div className="border-t pt-5">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                Total Users
                            </span>

                            <span className="text-xl font-bold">
                                {totalUsers.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}