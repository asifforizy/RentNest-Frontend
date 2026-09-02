
import { notFound } from "next/navigation";
import { getMyPropertiesAction } from "@/app/dashboard/_actions/landlord";
import EditPropertyForm from "@/app/dashboard/_components/EditForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


interface EditPropertyPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditPropertyPage({
    params,
}: EditPropertyPageProps) {
    const { id } = await params;

    const properties = await getMyPropertiesAction();

    const property = properties.find(
        (item: { id: string }) => item.id === id
    );

    if (!property) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
                <Link
                    href={`/dashboard/landlord/properties/${property.id}`}
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
                >
                    <ArrowLeft size={18} />
                    Back to Property Details
                </Link>

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Edit Property
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Update your property information.
                    </p>
                </div>

                <EditPropertyForm property={property} />
            </div>
        </div>
    );
}

