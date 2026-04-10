# Дуплекс-Строй — Техническое задание

## 1. Структура проекта

```
app/
├── src/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Advantages.tsx
│   │   ├── About.tsx
│   │   ├── ReadyDuplexes.tsx
│   │   ├── ConstructionDuplexes.tsx
│   │   ├── Mortgage.tsx
│   │   ├── Reviews.tsx
│   │   ├── Steps.tsx
│   │   ├── Guarantees.tsx
│   │   ├── FinalCTA.tsx
│   │   └── Footer.tsx
│   ├── components/
│   │   ├── LeadForm.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── AdvantageCard.tsx
│   │   ├── MortgageCard.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── StepItem.tsx
│   │   ├── GuaranteeItem.tsx
│   │   ├── ImageSlider.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── FloatingButton.tsx
│   │   └── AnimatedCounter.tsx
│   ├── hooks/
│   │   ├── useScrollAnimation.ts
│   │   └── useInView.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── public/
│   └── images/
├── index.html
└── package.json
```

## 2. Компоненты

### UI Компоненты (shadcn/ui)
- Button — кнопки
- Input — поля ввода
- Card — карточки
- Badge — теги и статусы
- Dialog — модальные окна
- Carousel — слайдеры
- Select — выпадающие списки

### Кастомные компоненты

**LeadForm**
- Props: title, fields, buttonText, onSubmit
- Поддержка разных наборов полей
- Валидация

**PropertyCard**
- Props: images, name, area, bedrooms, bathrooms, price, status
- Галерея с слайдером
- Кнопка "Смотреть планировку"
- Мини-форма для просмотра

**AdvantageCard**
- Props: icon, title, description
- Иконка с анимацией
- Hover эффекты

**ProgressBar**
- Props: percentage
- Анимация заполнения
- Цветовая индикация

**AnimatedCounter**
- Props: end, duration, suffix
- Анимация счёта при появлении

## 3. Анимации

### Библиотеки
- **Framer Motion** — основная анимация
- **GSAP + ScrollTrigger** — скролл-анимации

### Реализация

**Fade In Up (Framer Motion):**
```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
}
```

**Stagger Children:**
```tsx
const container = {
  animate: { transition: { staggerChildren: 0.1 } }
}
```

**Scroll Animation (GSAP):**
```tsx
gsap.from(element, {
  scrollTrigger: { trigger: element, start: "top 80%" },
  opacity: 0, y: 50, duration: 0.8
})
```

## 4. Цветовая система (Tailwind)

```javascript
colors: {
  orange: {
    DEFAULT: '#FF6B35',
    dark: '#E55A2B',
    light: '#FF8A5C'
  },
  turquoise: {
    DEFAULT: '#00D4AA',
    dark: '#00B894',
    light: '#33E0BF'
  },
  yellow: {
    DEFAULT: '#FFD93D',
    dark: '#F4C430',
    light: '#FFE066'
  },
  green: {
    DEFAULT: '#4ECB71',
    dark: '#3DB560',
    light: '#6ED88A'
  }
}
```

## 5. Формы

### Валидация
- Телефон: маска +7 (999) 999-99-99
- Email: стандартная валидация
- Имя: минимум 2 символа

### Обработка
- Отправка на API (заглушка)
- Показ loader
- Success/error состояния

## 6. Адаптивность

### Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

### Поведение
- Desktop: полный макет
- Tablet: 2 колонки → 1
- Mobile: одноколоночный, уменьшенные шрифты

## 7. SEO

- Мета-теги
- Open Graph
- Schema.org (LocalBusiness, Product)
- Alt для изображений
