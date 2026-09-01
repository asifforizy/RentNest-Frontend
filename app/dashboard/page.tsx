// app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        async function checkRoleAndRedirect() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
                    {
                        credentials: "include", 
                        cache: "no-store",
                    }
                );

                if (!res.ok) {
                    router.replace("/auth/login");
                    return;
                }

                const data = await res.json();
                const role = data?.user?.role;

                switch (role) {
                    case "TENANT":
                        router.replace("/dashboard/tenant");
                        break;
                    case "LANDLORD":
                        router.replace("/dashboard/landlord");
                        break;
                    case "ADMIN":
                        router.replace("/dashboard/admin");
                        break;
                    default:
                        router.replace("/auth/login");
                }
            } catch {
                router.replace("/auth/login");
            }
        }

        checkRoleAndRedirect();
    }, [router]);

    return (
        <div className="flex h-[60vh] items-center justify-center">
            <p className="text-muted-foreground">Loading your dashboard…</p>
        </div>
    );
}