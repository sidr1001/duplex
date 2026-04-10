export interface MapObject {
  id: string;
  title: string;
  hint: string;
  coordinates: [number, number];
}

export interface SiteContent {
  contacts: {
    companyName: string;
    phoneDisplay: string;
    phoneHref: string;
    email: string;
    leadRecipientEmail: string;
    address: string;
    workHours: string;
    logoPath: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };
  hero: {
    title: string;
    subtitle: string;
    heroImage: string;
  };
  map: {
    center: [number, number];
    zoom: number;
    objects: MapObject[];
  };
}

export const defaultSiteContent: SiteContent = {
  contacts: {
    companyName: 'Дуплекс-Строй',
    phoneDisplay: '8 (800) 123-45-67',
    phoneHref: '+78001234567',
    email: 'info@duplexstroy.ru',
    leadRecipientEmail: 'sales@duplexstroy.ru',
    address: 'г. Москва, ул. Строителей, 25, офис продаж',
    workHours: 'Пн-Пт: 9:00 - 19:00',
    logoPath: '/images/logo.svg'
  },
  seo: {
    title: 'Яркие дуплексы от застройщика | Дуплекс-Строй',
    description: 'Готовые и строящиеся дуплексы с ипотекой и отделкой под ключ. Запишитесь на просмотр.',
    keywords: 'дуплекс, застройщик, ипотека, купить дом, готовый дуплекс',
    ogTitle: 'Дуплекс-Строй — дуплексы для счастливой жизни',
    ogDescription: 'Подберите готовый или строящийся дуплекс по выгодной цене.',
    ogImage: '/images/hero-duplex.jpg'
  },
  hero: {
    title: 'Яркие дуплексы для счастливой жизни от застройщика!',
    subtitle: 'Собственное производство материалов • Ипотека от 4,9% • Отделка под ключ',
    heroImage: '/images/hero-duplex.jpg'
  },
  map: {
    center: [55.751574, 37.573856],
    zoom: 10,
    objects: [
      {
        id: '1',
        title: 'Офис продаж',
        hint: 'Главный офис и шоурум',
        coordinates: [55.751574, 37.573856]
      },
      {
        id: '2',
        title: 'КП Солнечный',
        hint: 'Готовые дуплексы',
        coordinates: [55.801574, 37.673856]
      }
    ]
  }
};
