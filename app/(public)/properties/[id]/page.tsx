import Image from "next/image";

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

  const imageUrl = `${process.env.BACKEND_API_URL}/uploads/${property.propertyPhoto}`;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Image Gallery */}
        <div className="grid h-[450px] grid-cols-1 gap-2 overflow-hidden rounded-2xl md:grid-cols-4">

          {/* Main Image */}
          <div className="relative md:col-span-3">
            <Image
              src={imageUrl}
              alt={property.title || "Property"}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
          </div>

          {/* Side Images */}
          <div className="hidden grid-cols-1 gap-2 md:grid">
            <div className="relative">
              <Image
                src={imageUrl}
                alt="Property"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>

            <div className="relative">
              <Image
                src={imageUrl}
                alt="Property"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-10 lg:grid-cols-3">

          {/* Left */}
          <div className="lg:col-span-2">

            {/* Title */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  {property.availability}
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {property.title || "Beautiful Property"}
                </h1>

                <p className="mt-2 text-muted-foreground">
                  📍 {property.city || "Location not specified"},{" "}
                  {property.country || ""}
                </p>
              </div>
            </div>

            {/* Property Features */}
            <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border p-5 sm:grid-cols-4">
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
                  Rent
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
                  {new Date(property.createdAt).toLocaleDateString()}
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
                  {property.landlord?.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold">
                    {property.landlord?.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {property.landlord?.email}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border bg-background p-6 shadow-lg">

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-3xl font-bold">
                    ৳{property.rentPrice}
                  </span>

                  <span className="text-muted-foreground">
                    {" "}
                    / month
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-lg border">
                <div className="border-r p-4">
                  <p className="text-xs font-medium uppercase">
                    Availability
                  </p>
                  <p className="mt-1 text-sm">
                    {property.availability}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase">
                    Location
                  </p>
                  <p className="mt-1 text-sm">
                    {property.city || "N/A"}
                  </p>
                </div>
              </div>

              <button className="mt-6 w-full rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90">
                Request to Rent
              </button>

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