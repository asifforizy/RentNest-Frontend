import CreatePropertyForm from "@/app/dashboard/_components/CreatePropertyForm";


export default function NewPropertyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
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