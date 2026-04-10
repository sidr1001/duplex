export interface MapObject {
  id: string;
  title: string;
  hint: string;
  coordinates: [number, number];
}

export interface ReadyDuplex {
  id: number;
  name: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: string;
  status: string;
  image: string;
  features: string[];
}

export interface ConstructionDuplex {
  id: number;
  name: string;
  area: number;
  completion: string;
  price: string;
  oldPrice: string | null;
  progress: number;
  offer: string;
  image: string;
  formTitle: string;
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
  ready: {
    title: string;
    subtitle: string;
    openPlanButtonText: string;
    fallbackTitle: string;
    fallbackSubtitle: string;
    fallbackButtonText: string;
    leadButtonText: string;
    duplexes: ReadyDuplex[];
  };
  construction: {
    title: string;
    subtitle: string;
    badgeText: string;
    readinessText: string;
    completionText: string;
    duplexes: ConstructionDuplex[];
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
  ready: {
    title: 'Готовые дуплексы — заезжайте и живите!',
    subtitle: 'Полностью готовые к проживанию дома с отделкой и коммуникациями',
    openPlanButtonText: 'Смотреть планировку',
    fallbackTitle: 'Не подошел ни один вариант?',
    fallbackSubtitle: 'Подберем индивидуальный проект под ваши потребности и бюджет',
    fallbackButtonText: 'Подобрать дуплекс',
    leadButtonText: 'Записаться на просмотр',
    duplexes: [
      {
        id: 1,
        name: 'Дуплекс "Солнечный"',
        area: 120,
        bedrooms: 3,
        bathrooms: 2,
        price: '8 500 000',
        status: 'Готов к заселению',
        image: '/images/duplex-sunny.jpg',
        features: ['Панорамные окна', 'Терраса', 'Гараж на 2 авто']
      },
      {
        id: 2,
        name: 'Дуплекс "Яркий"',
        area: 145,
        bedrooms: 4,
        bathrooms: 2,
        price: '9 800 000',
        status: 'Готов к заселению',
        image: '/images/duplex-bright.jpg',
        features: ['Двухуровневый', 'Сад', 'Камин']
      },
      {
        id: 3,
        name: 'Дуплекс "Семейный"',
        area: 160,
        bedrooms: 4,
        bathrooms: 3,
        price: '11 200 000',
        status: 'Готов к заселению',
        image: '/images/duplex-family.jpg',
        features: ['Бассейн', 'Детская площадка', 'Офис']
      }
    ]
  },
  construction: {
    title: 'Дуплексы в строительстве — успейте купить по стартовой цене!',
    subtitle: 'Инвестируйте в строящиеся объекты и получите максимальную выгоду',
    badgeText: 'В строительстве',
    readinessText: 'Готовность',
    completionText: 'Сдача',
    duplexes: [
      {
        id: 1,
        name: 'Дуплекс "Мечта"',
        area: 135,
        completion: 'IV квартал 2024',
        price: '7 900 000',
        oldPrice: '9 200 000',
        progress: 65,
        offer: 'При бронировании до конца месяца — отделка в подарок!',
        image: '/images/construction-1.jpg',
        formTitle: 'Забронировать по стартовой цене'
      },
      {
        id: 2,
        name: 'Дуплекс "Уютный"',
        area: 150,
        completion: 'II квартал 2025',
        price: '8 500 000',
        oldPrice: null,
        progress: 30,
        offer: 'Рассрочка 0% до конца строительства',
        image: '/images/construction-2.jpg',
        formTitle: 'Узнать условия рассрочки'
      }
    ]
  },
  map: {
    center: [55.751574, 37.573856],
    zoom: 10,
    objects: [
      { id: '1', title: 'Офис продаж', hint: 'Главный офис и шоурум', coordinates: [55.751574, 37.573856] },
      { id: '2', title: 'КП Солнечный', hint: 'Готовые дуплексы', coordinates: [55.801574, 37.673856] }
    ]
  }
};
