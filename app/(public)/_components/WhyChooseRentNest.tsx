import {
  House,
  ClipboardCheck,
  LayoutDashboard,
  Users,
} from "lucide-react";

const features = [
  {
    icon: House,
    title: "Easy Property Discovery",
    description:
      "Explore rental listings in one convenient place and find a home that suits your lifestyle.",
  },
  {
    icon: ClipboardCheck,
    title: "Simple Rental Requests",
    description:
      "Submit rental requests online and keep track of their status from your account.",
  },
  {
    icon: LayoutDashboard,
    title: "Organized Management",
    description:
      "Landlords can manage property listings and review tenant requests through their dashboard.",
  },
  {
    icon: Users,
    title: "Dedicated User Roles",
    description:
      "Enjoy dedicated experiences designed for tenants and landlords, with tools suited to each role.",
  },
];

export default function WhyChooseRentNest() {
  return (
    <section className="bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Section Introduction */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              The RentNest Advantage
            </span>

            <h2 className="mt-3 max-w-lg text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose RentNest?
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              Finding and managing rental properties should feel simple.
              RentNest brings property discovery, rental requests, and
              property management together in one place.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-card-foreground">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}