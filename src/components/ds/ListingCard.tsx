import Image from 'next/image';
import { Button } from './Button';

interface ListingData {
  image: string;
  title: string;
  location: string;
  category: string;
  price: string;
  roi: string;
  area: string;
  status: string;
}

interface ListingCardProps {
  listing: ListingData;
  ctaLabel?: string;
  href?: string;
  className?: string;
}

export function ListingCard({ listing, ctaLabel = 'View Details', href = '#', className = '' }: ListingCardProps) {
  return (
    <div className={`group bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border-subtle)] hover:shadow-[var(--shadow-md)] transition-all duration-[var(--transition-base)] ${className}`}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute top-3 left-3 bg-black/70 text-white text-[var(--text-xs)] font-medium px-2.5 py-1 rounded-full">
          {listing.category}
        </span>
      </div>
      <div className="p-[var(--spacing-5)]">
        <h3 className="text-[var(--text-lg)] font-[var(--weight-semibold)] text-[var(--color-text)] mb-1 leading-[var(--leading-snug)]">
          {listing.title}
        </h3>
        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mb-[var(--spacing-4)]">
          {listing.location}
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-[var(--spacing-4)] text-[var(--text-sm)]">
          <div>
            <span className="text-[var(--color-text-muted)]">Price </span>
            <span className="font-[var(--weight-medium)] text-[var(--color-text)]">{listing.price}</span>
          </div>
          <div>
            <span className="text-[var(--color-text-muted)]">ROI </span>
            <span className="font-[var(--weight-medium)] text-[var(--color-cta)]">{listing.roi}</span>
          </div>
          <div>
            <span className="text-[var(--color-text-muted)]">Area </span>
            <span className="font-[var(--weight-medium)] text-[var(--color-text)]">{listing.area}</span>
          </div>
          <div>
            <span className="text-[var(--color-text-muted)]">Status </span>
            <span className="font-[var(--weight-medium)] text-[var(--color-text)]">{listing.status}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" href={href} pill>{ctaLabel}</Button>
      </div>
    </div>
  );
}
