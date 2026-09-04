
import { Building2, Users, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen">

      <section className="px-4 pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="container mx-auto">
          <h1 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
            RentNest
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            A simple and secure platform for finding and managing rental
            properties.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-6 text-center md:p-10">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Making Rentals Simple
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">
            RentNest helps landlords list and manage properties while tenants
            can easily discover and request rental homes. With secure access,
            rental requests, payments, and reviews, everything is managed in
            one convenient platform.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 text-center transition-shadow hover:shadow-md">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>

            <h3 className="mt-4 text-lg font-semibold">
              Properties
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Find, list, and manage rental properties easily.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6 text-center transition-shadow hover:shadow-md">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>

            <h3 className="mt-4 text-lg font-semibold">
              For Everyone
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Designed for tenants, landlords, and administrators.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6 text-center transition-shadow hover:shadow-md">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>

            <h3 className="mt-4 text-lg font-semibold">
              Secure & Simple
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Secure access and smooth rental management in one place.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}