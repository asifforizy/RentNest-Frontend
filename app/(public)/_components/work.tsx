import Link from "next/link";
import {
  Search,
  Send,
  KeyRound,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find Your Property",
    description:
      "Explore rental listings and discover a property that matches your needs and budget.",
  },
  {
    number: "02",
    icon: Send,
    title: "Send a Rental Request",
    description:
      "Found the right place? Submit a rental request and track its status from your account.",
  },
  {
    number: "03",
    icon: KeyRound,
    title: "Get Ready for Your New Home",
    description:
      "Once your request is approved, coordinate with the landlord and prepare for your move.",
  },
];

export default function HowRentNestWorks() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Simple & Convenient
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How RentNest Works
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Finding your next home doesn't have to be complicated.
            Get started in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <span className="text-4xl font-bold text-muted-foreground/20">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-semibold text-card-foreground">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore Properties
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}