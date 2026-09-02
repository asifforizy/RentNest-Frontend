// app/services/page.tsx

import {
  Building2,
  Search,
  FileCheck,
  CreditCard,
  Star,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Property Listing",
    description:
      "Landlords can easily list, update, and manage their rental properties.",
  },
  {
    icon: Search,
    title: "Property Search",
    description:
      "Tenants can explore available properties and find their ideal home.",
  },
  {
    icon: FileCheck,
    title: "Rental Requests",
    description:
      "Send and manage rental requests quickly and conveniently.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Manage rental payments securely through the RentNest platform.",
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    description:
      "Share experiences and help others make better rental decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Access",
    description:
      "Role-based access ensures a secure experience for every user.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="px-4 pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="container mx-auto">
          <h1 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
            Our Services
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Everything you need to make finding and managing rental properties
            simple and convenient.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-2xl border bg-card p-6 text-center transition-shadow hover:shadow-md"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h2 className="mt-4 text-lg font-semibold">
                  {service.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}