'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Listing {
  id: string;
  image: string;
  title: string;
  location: string;
  category: string;
  price: string;
  roi: string;
  occupancy: string;
}

interface FeaturedCarouselProps {
  id?: string;
  title: string;
  listings: Listing[];
}

export function FeaturedCarousel({ id, title, listings }: FeaturedCarouselProps) {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [isAtEnd, setIsAtEnd] = React.useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.8;
      const newScrollLeft =
        direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
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
      currentRef.addEventListener('scroll', checkScrollPosition);
    }
    window.addEventListener('resize', checkScrollPosition);
    return () => {
      if (currentRef) currentRef.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [listings]);

  return (
    <section id={id} className="w-full py-[var(--spacing-16)] md:py-[var(--spacing-24)] bg-[var(--color-bg)]">
      <div className="max-w-[var(--container-max)] mx-auto px-[var(--spacing-6)]">
        {/* Title + nav arrows */}
        <div className="mb-[var(--spacing-10)] flex items-end justify-between">
          <h2 className="font-[var(--font-primary)] text-[1.75rem] font-[var(--weight-bold)] text-[var(--color-text)] tracking-[var(--tracking-tight)]">
            {title}
          </h2>
          <div className="flex gap-[var(--spacing-3)]">
            <button
              onClick={() => scroll('left')}
              disabled={isAtStart}
              className={cn(
                'p-2 border border-[var(--color-border)] transition-all hidden md:flex',
                isAtStart ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[var(--color-bg-muted)] cursor-pointer'
              )}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4 text-[var(--color-text)]" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={isAtEnd}
              className={cn(
                'p-2 border border-[var(--color-border)] transition-all hidden md:flex',
                isAtEnd ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[var(--color-bg-muted)] cursor-pointer'
              )}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4 text-[var(--color-text)]" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex w-full gap-[var(--spacing-8)] overflow-x-auto pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {listings.map((listing, index) => (
              <motion.div
                key={listing.id}
                className="group w-[340px] md:w-[420px] flex-shrink-0 rounded-sm cursor-pointer transition-all duration-300 hover:bg-[var(--color-bg-secondary)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* Image — flush to edges */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    alt={listing.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    src={listing.image}
                  />
                  {index === 0 && (
                    <span
                      className="absolute top-4 left-4 text-[11px] font-[var(--weight-bold)] tracking-[0.1em] uppercase px-3 py-2"
                      style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}
                    >
                      {listing.category}
                    </span>
                  )}
                </div>

                {/* Content — padded */}
                <div className="px-[var(--spacing-5)] md:px-[var(--spacing-6)]">
                  {/* Title row: name + ROI */}
                  <div className="flex items-start justify-between gap-4 pt-[var(--spacing-6)] pb-[var(--spacing-1)]">
                    <div>
                      <h3 className="font-[var(--font-primary)] text-[var(--text-lg)] md:text-[var(--text-xl)] font-[var(--weight-bold)] text-[var(--color-text)] leading-[var(--leading-snug)]">
                        {listing.title}
                      </h3>
                      <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mt-[var(--spacing-1)]">
                        {listing.location}
                      </p>
                    </div>
                    {listing.roi !== '—' && (
                      <div className="text-right flex-shrink-0">
                        <p className="font-[var(--font-primary)] text-[var(--text-2xl)] font-[var(--weight-medium)] text-[var(--color-text)]" style={{ lineHeight: '1.1' }}>
                          {listing.roi}
                        </p>
                        <p className="text-[10px] font-[var(--weight-medium)] text-[var(--color-text-muted)] tracking-[0.08em] uppercase mt-0.5">
                          Est. ROI
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="mt-[var(--spacing-6)] pt-[var(--spacing-5)] pb-[var(--spacing-6)]">
                    <div className="flex items-center justify-between mb-[var(--spacing-3)]">
                      <span className="text-[var(--text-sm)] text-[var(--color-text-muted)]">Asset Value</span>
                      <span className="text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text)]">{listing.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-sm)] text-[var(--color-text-muted)]">Occupancy</span>
                      <span className="text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text)]">{listing.occupancy}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
