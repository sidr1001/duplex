import { useEffect, useRef } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';

declare global {
  interface Window {
    ymaps?: {
      ready: (cb: () => void) => void;
      Map: new (el: HTMLElement, state: { center: [number, number]; zoom: number }) => {
        geoObjects: {
          add: (obj: unknown) => void;
        };
      };
      Placemark: new (coords: [number, number], data: { balloonContent: string; hintContent: string }) => unknown;
    };
  }
}

const YANDEX_MAP_SCRIPT_ID = 'yandex-map-script';

export function MapSection() {
  const { content } = useSiteContent();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.ymaps || !mapRef.current) return;

      window.ymaps.ready(() => {
        if (!mapRef.current || !window.ymaps) return;
        const map = new window.ymaps.Map(mapRef.current, {
          center: content.map.center,
          zoom: content.map.zoom
        });

        content.map.objects.forEach((item) => {
          const placemark = new window.ymaps!.Placemark(item.coordinates, {
            balloonContent: item.title,
            hintContent: item.hint
          });
          map.geoObjects.add(placemark);
        });
      });
    };

    if (!document.getElementById(YANDEX_MAP_SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = YANDEX_MAP_SCRIPT_ID;
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      script.onload = initMap;
      document.body.appendChild(script);
      return;
    }

    initMap();
  }, [content.map]);

  return (
    <section id="map" className="py-20 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Локации объектов на карте</h2>
        <p className="text-dark-light mb-8">Редактируйте точки в админке и они автоматически появятся на Яндекс карте.</p>
        <div ref={mapRef} className="w-full h-[420px] rounded-3xl overflow-hidden" />
      </div>
    </section>
  );
}
