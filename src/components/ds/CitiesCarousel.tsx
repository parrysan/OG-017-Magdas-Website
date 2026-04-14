'use client';

import { SparksCarousel } from '@/components/ui/sparks-carousel';

interface City {
  id: string;
  name: string;
  region: string;
  image: string;
}

interface CitiesCarouselProps {
  id?: string;
  title: string;
  subtitle: string;
  actionLabel?: string;
  cities: City[];
}

export function CitiesCarousel({ id, title, subtitle, actionLabel, cities }: CitiesCarouselProps) {
  return (
    <div id={id} className="bg-[var(--color-bg)]">
      <SparksCarousel
        title={title}
        subtitle={subtitle}
        actionLabel={actionLabel}
        actionHref="#"
        items={cities.map((city) => ({
          id: city.id,
          imageSrc: city.image,
          title: city.name,
          subtitle: city.region,
        }))}
      />
    </div>
  );
}
