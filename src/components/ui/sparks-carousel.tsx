'use client';

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SparkItem {
  id: string | number;
  imageSrc: string;
  title: string;
  subtitle?: string;
  count?: number;
  countLabel?: string;
}

export interface SparksCarouselProps {
  title: string;
  subtitle: string;
  items: SparkItem[];
  actionLabel?: string;
  actionHref?: string;
}

export const SparksCarousel = React.forwardRef<
  HTMLDivElement,
  SparksCarouselProps
>(({ title, subtitle, items, actionLabel, actionHref }, ref) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [isAtEnd, setIsAtEnd] = React.useState(false);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.8;
      const newScrollLeft =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const checkScrollPosition = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setIsAtStart(scrollLeft < 10);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
      }
    };

    const currentRef = carouselRef.current;
    if (currentRef) {
      checkScrollPosition();
      currentRef.addEventListener("scroll", checkScrollPosition);
    }
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [items]);

  return (
    <section ref={ref} className="w-full py-[var(--spacing-12)]">
      <div className="max-w-[var(--container-max)] mx-auto px-[var(--spacing-6)]">
        {/* Header */}
        <div className="mb-[var(--spacing-8)] flex items-end justify-between gap-[var(--spacing-8)]">
          <div>
            <h2 className="font-[var(--font-primary)] text-[1.75rem] font-[var(--weight-bold)] text-[var(--color-text)] tracking-[var(--tracking-tight)]">
              {title}
            </h2>
            <p className="mt-[var(--spacing-2)] text-[var(--text-base)] text-[var(--color-text-secondary)] max-w-lg leading-[var(--leading-relaxed)]">
              {subtitle}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-[var(--spacing-4)] flex-shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={isAtStart}
              className={cn(
                "p-2.5 border border-[var(--color-border)] transition-all",
                isAtStart
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-[var(--color-bg-muted)] cursor-pointer"
              )}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-[var(--color-text)]" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={isAtEnd}
              className={cn(
                "p-2.5 border border-[var(--color-border)] transition-all",
                isAtEnd
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-[var(--color-bg-muted)] cursor-pointer"
              )}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-[var(--color-text)]" />
            </button>
            {actionLabel && (
              <a
                href={actionHref || "#"}
                className="inline-flex items-center gap-2 text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text)] tracking-[var(--tracking-caps)] uppercase no-underline hover:opacity-70 transition-opacity ml-[var(--spacing-4)]"
              >
                {actionLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex w-full gap-[var(--spacing-6)] overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className="group w-[360px] md:w-[420px] flex-shrink-0 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    src={item.imageSrc}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-[var(--spacing-6)]">
                    {item.subtitle && (
                      <p className="text-[var(--text-xs)] font-[var(--weight-medium)] text-white/70 tracking-[var(--tracking-caps)] uppercase mb-[var(--spacing-1)]">
                        {item.subtitle}
                      </p>
                    )}
                    <h3 className="font-[var(--font-primary)] text-[var(--text-2xl)] md:text-[var(--text-3xl)] font-[var(--weight-medium)] text-white leading-[var(--leading-tight)]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

SparksCarousel.displayName = "SparksCarousel";
