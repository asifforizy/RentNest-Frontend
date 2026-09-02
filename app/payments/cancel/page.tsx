import Link from "next/link";

export default function PaymentCancelPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
            <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-3xl">
                    ×
                </div>

                <h1 className="mt-5 text-2xl font-bold">
                    Payment Cancelled
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Your payment was cancelled. You can try
                    again whenever you're ready.
                </p>

                <Link
                    href="/dashboard/tenant"
                    className="mt-6 inline-block rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground"
                >
                    Back to Dashboard
                </Link>
            </div>
        </main>
    );
}