import { cookies } from "next/headers";
import PayNowButton from "../../../_components/PayNowButton";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function PaymentPage({
    params,
}: Props) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-muted/30">
            <div className="mx-auto max-w-lg px-4 py-12">
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                    <h1 className="text-2xl font-bold">
                        Complete Payment
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Proceed to secure payment for your
                        rental.
                    </p>

                    <div className="mt-6">
                        <PayNowButton rentalRequestId={id} />
                    </div>
                </div>
            </div>
        </main>
    );
}