import Image from 'next/image';

interface CityCardProps {
  name: string;
  image: string;
  href?: string;
  className?: string;
}

export function CityCard({ name, image, href = '#', className = '' }: CityCardProps) {
  return (
    <a
      href={href}
      className={`group relative block overflow-hidden rounded-[var(--radius-lg)] aspect-[3/4] no-underline ${className}`}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 20vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-[var(--spacing-6)]">
        <h3 className="text-white text-[var(--text-2xl)] font-[var(--weight-semibold)] leading-[var(--leading-tight)]">
          {name}
        </h3>
      </div>
    </a>
  );
}
