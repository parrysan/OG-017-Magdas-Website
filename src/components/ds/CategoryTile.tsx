import Image from 'next/image';

interface CategoryTileProps {
  name: string;
  image: string;
  href?: string;
  className?: string;
}

export function CategoryTile({ name, image, href = '#', className = '' }: CategoryTileProps) {
  return (
    <a
      href={href}
      className={`group relative block overflow-hidden rounded-[var(--radius-lg)] aspect-[4/3] no-underline ${className}`}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white text-[var(--text-xl)] font-[var(--weight-semibold)] tracking-[var(--tracking-wide)]">
          {name}
        </h3>
      </div>
    </a>
  );
}
