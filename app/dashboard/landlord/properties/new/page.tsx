import CreatePropertyForm from "@/app/dashboard/_components/CreatePropertyForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function NewPropertyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <Link
          href="/dashboard/landlord"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold">
          Create Property Listing
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Add your property details to create a new listing.
        </p>
      </div>

      <CreatePropertyForm />
    </div>
  );
}