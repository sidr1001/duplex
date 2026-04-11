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
  description: string;
  images: string[];
  image?: string;
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
  admin: {
    login: string;
  };
  socials: {
    whatsapp: string;
    telegram: string;
    instagram: string;
    max: string;
  };
  sections: {
    hero: boolean;
    advantages: boolean;
    about: boolean;
    ready: boolean;
    construction: boolean;
    mortgage: boolean;
    reviews: boolean;
    steps: boolean;
    guarantees: boolean;
    map: boolean;
    finalCta: boolean;
  };
  footer: {
    description: string;
    orgName: string;
    orgDetails: string;
    declarationLinkText: string;
    declarationLink: string;
    privacyLinkText: string;
    privacyLink: string;
    sectionsTitle: string;
    contactsTitle: string;
    footerLinks: Array<{ label: string; href: string }>;
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
    navLinks: Array<{ href: string; label: string }>;
    catalogFormTitle: string;
    catalogFormButtonText: string;
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
  admin: {
    login: import.meta.env.VITE_ADMIN_LOGIN || 'admin'
  },
  socials: {
    whatsapp: 'https://wa.me/78001234567',
    telegram: 'https://t.me/duplexstroy',
    instagram: 'https://instagram.com/duplexstroy',
    max: 'https://max.ru/duplexstroy'
  },
  sections: {
    hero: true,
    advantages: true,
    about: true,
    ready: true,
    construction: true,
    mortgage: true,
    reviews: true,
    steps: true,
    guarantees: true,
    map: true,
    finalCta: true
  },
  footer: {
    description: 'Строим яркие дуплексы для счастливой жизни с 2009 года. Собственное производство, все льготные ипотеки, отделка под ключ.',
    orgName: 'ООО «Дуплекс-Строй»',
    orgDetails: 'ИНН 7700000000 • ОГРН 1027700000000 • г. Москва, ул. Строителей, 25',
    declarationLinkText: 'Проектная декларация',
    declarationLink: '#',
    privacyLinkText: 'Политика конфиденциальности',
    privacyLink: '#',
    sectionsTitle: 'Разделы',
    contactsTitle: 'Контакты',
    footerLinks: [
      { label: 'Преимущества', href: '#advantages' },
      { label: 'О компании', href: '#about' },
      { label: 'Готовые дуплексы', href: '#ready' },
      { label: 'В строительстве', href: '#construction' },
      { label: 'Ипотека', href: '#mortgage' },
      { label: 'Отзывы', href: '#reviews' },
      { label: 'Карта', href: '#map' }
    ]
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
    heroImage: '/images/hero-duplex.jpg',
    navLinks: [
      { href: '#advantages', label: 'Преимущества' },
      { href: '#about', label: 'О компании' },
      { href: '#ready', label: 'Готовые дуплексы' },
      { href: '#construction', label: 'В строительстве' },
      { href: '#mortgage', label: 'Ипотека' },
      { href: '#reviews', label: 'Отзывы' }
    ],
    catalogFormTitle: 'Получить каталог проектов + актуальные цены',
    catalogFormButtonText: 'Скачать каталог'
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
        description: 'Светлый дуплекс с панорамными окнами и готовой террасой.',
        images: ['/images/duplex-sunny.jpg', '/images/review-1.jpg', '/images/review-2.jpg'],
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
        description: 'Современный проект с двухуровневой планировкой и зоной камина.',
        images: ['/images/duplex-bright.jpg', '/images/review-3.jpg', '/images/review-4.jpg'],
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
        description: 'Просторный семейный формат с отдельным кабинетом и зоной отдыха.',
        images: ['/images/duplex-family.jpg', '/images/family-happy.jpg', '/images/team.jpg'],
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
