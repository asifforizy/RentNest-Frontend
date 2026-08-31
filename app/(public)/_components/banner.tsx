"use client";

import Image from "next/image";
import h1 from "@/public/banners/h1.jpg";
import h2 from "@/public/banners/h2.jpg";
import h3 from "@/public/banners/h3.jpg";
import h4 from "@/public/banners/h4.jpg";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    id: 1,
    src: h1,
    alt: "Modern villa with pool",
  },
  {
    id: 2,
    src: h2,
    alt: "Luxury apartment interior",
  },
  {
    id: 3,
    src: h3,
    alt: "Beachfront property",
  },
  {
    id: 4,
    src: h4,
    alt: "Modern villa exterior",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="relative h-[60vh] w-full overflow-hidden rounded-2xl">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={banner.src}
            alt={banner.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <p className="text-sm font-medium uppercase tracking-wide">
          Find your dream home
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Discover Properties You&apos;ll Love
        </h1>

        <p className="mt-4 max-w-xl text-white/80">
          Browse thousands of listings tailored to your lifestyle.
        </p>
      </div>

      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/40"
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>

      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/40"
        aria-label="Next banner"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to banner ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === current ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}