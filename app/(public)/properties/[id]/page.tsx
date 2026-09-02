
import Image from "next/image";
import RequestToRentButton from "../../_components/RequestToRentButton";

type PropertyDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyDetails({
  params,
}: PropertyDetailsProps) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }

  const result = await response.json();
  const property = result.data;



  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Property Image */}
        <div className="relative h-[420px] w-full overflow-hidden rounded-2xl sm:h-[500px]">
          <Image
            src={property.propertyPhoto}
            alt={property.title || "Property"}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 sm:p-8">
            <div className="max-w-3xl text-white">
              <span className="inline-flex rounded-full bg-green-500/90 px-3 py-1 text-sm font-medium">
                {property.availability}
              </span>

              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                {property.title || "Beautiful Property"}
              </h1>

              <p className="mt-2 text-sm text-white/80 sm:text-base">
                📍 {property.city || "Location not specified"}
                {property.country
                  ? `, ${property.country}`
                  : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-10 grid gap-10 lg:grid-cols-3">

          {/* Left Content */}
          <div className="lg:col-span-2">

            {/* Property Overview */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl border bg-card p-5 sm:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Property Type
                </p>
                <p className="mt-1 font-semibold">
                  {property.propertyType || "Property"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Monthly Rent
                </p>
                <p className="mt-1 font-semibold">
                  ৳{property.rentPrice}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Availability
                </p>
                <p className="mt-1 font-semibold">
                  {property.availability}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Listed
                </p>
                <p className="mt-1 font-semibold">
                  {new Date(
                    property.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Description */}
            <section className="mt-10">
              <h2 className="text-2xl font-semibold">
                About this property
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                {property.description ||
                  "No description has been provided for this property."}
              </p>
            </section>

            {/* Landlord */}
            <section className="mt-10 border-t pt-8">
              <h2 className="text-2xl font-semibold">
                Your host
              </h2>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {property.landlord?.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold">
                    {property.landlord?.name ||
                      "Property Owner"}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {property.landlord?.email}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Rental Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-lg">

              <div>
                <span className="text-3xl font-bold">
                  ৳{property.rentPrice}
                </span>

                <span className="ml-1 text-muted-foreground">
                  / month
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-xl border">
                <div className="border-r p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Availability
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {property.availability}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {property.city || "N/A"}
                  </p>
                </div>
              </div>

              <RequestToRentButton
                propertyId={property.id}
                disabled={property.availability !== "AVAILABLE"}
              />

              <p className="mt-3 text-center text-xs text-muted-foreground">
                You won&apos;t be charged yet
              </p>

              <div className="mt-6 border-t pt-5">
                <div className="flex justify-between text-sm">
                  <span>Monthly rent</span>
                  <span>৳{property.rentPrice}</span>
                </div>

                <div className="mt-3 flex justify-between border-t pt-3 font-semibold">
                  <span>Total</span>
                  <span>৳{property.rentPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
