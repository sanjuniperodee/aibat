# Руководство для разработчиков

## Настройка среды разработки

### Требования
- Node.js 14.0.0 или выше
- npm 6.0.0 или выше
- Git

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

Это запустит локальный сервер на порту 3000 с автоматической перезагрузкой при изменениях.

## Структура проекта

```
aibat-website/
├── index.html              # Главная страница
├── css/                    # Стили
│   ├── style.css          # Основные стили
│   ├── core-theme-*.css   # Тематические стили
│   └── google-fonts-*.css # Шрифты Google
├── js/                     # JavaScript файлы
│   ├── main.js            # Основной скрипт
│   ├── core.min.js        # Минифицированная библиотека
│   └── site-stat.js       # Статистика сайта
├── images/                 # Изображения
├── docs/                   # Документация
├── scripts/                # Скрипты сборки
├── dist/                   # Собранные файлы (создается автоматически)
├── package.json           # Зависимости и скрипты
├── .eslintrc.json         # Конфигурация ESLint
├── .gitignore             # Исключения Git
└── README.md              # Документация
```

## Стандарты кодирования

### HTML
- Используйте семантические теги (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Всегда указывайте атрибуты `alt` для изображений
- Используйте правильную иерархию заголовков (h1, h2, h3, ...)
- Добавляйте мета-теги для SEO

```html
<!-- Хорошо -->
<header class="site-header">
  <nav class="main-navigation">
    <ul>
      <li><a href="/">Главная</a></li>
      <li><a href="/about">О нас</a></li>
    </ul>
  </nav>
</header>

<main class="site-main">
  <section class="hero">
    <h1>Заголовок страницы</h1>
    <p>Описание контента</p>
  </section>
</main>
```

### CSS
- Следуйте методологии BEM (Block Element Modifier)
- Используйте CSS переменные для цветов и размеров
- Пишите адаптивные стили с мобильным подходом
- Группируйте связанные стили

```css
/* BEM методология */
.site-header {
  background-color: var(--primary-color);
  padding: 1rem 0;
}

.site-header__logo {
  max-width: 200px;
}

.site-header__navigation {
  display: flex;
  gap: 1rem;
}

.site-header__navigation--mobile {
  flex-direction: column;
}

/* CSS переменные */
:root {
  --primary-color: #27a337;
  --secondary-color: #333;
  --text-color: #666;
  --spacing-unit: 1rem;
}
```

### JavaScript
- Используйте современный ES6+ синтаксис
- Следуйте принципам функционального программирования
- Добавляйте комментарии к сложной логике
- Обрабатывайте ошибки

```javascript
// Современный JavaScript
const initSite = () => {
  try {
    // Инициализация компонентов
    initNavigation();
    initSliders();
    initForms();
  } catch (error) {
    console.error('Ошибка инициализации сайта:', error);
  }
};

// Функциональный подход
const createElement = (tag, className, content) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.textContent = content;
  return element;
};

// Обработка ошибок
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
    return null;
  }
};
```

## Рабочий процесс

### Создание новой функциональности

1. **Создайте ветку для новой функции**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Разработайте функциональность**
   - Следуйте стандартам кодирования
   - Пишите тесты если необходимо
   - Документируйте изменения

3. **Проверьте код**
   ```bash
   npm run lint
   npm run lint:fix
   ```

4. **Создайте pull request**
   - Опишите изменения
   - Добавьте скриншоты если необходимо
   - Укажите тестирование

### Исправление багов

1. **Создайте ветку для исправления**
   ```bash
   git checkout -b fix/bug-description
   ```

2. **Исправьте баг**
   - Воспроизведите проблему
   - Напишите тест для предотвращения регрессии
   - Проверьте на разных устройствах

3. **Протестируйте исправление**
   ```bash
   npm run dev
   # Проверьте в разных браузерах
   ```

## Тестирование

### Ручное тестирование
- Проверьте на разных браузерах (Chrome, Firefox, Safari, Edge)
- Протестируйте на мобильных устройствах
- Проверьте доступность (WCAG 2.1)
- Убедитесь в корректной работе без JavaScript

### Автоматизированное тестирование
```javascript
// Пример простого теста
const testNavigation = () => {
  const nav = document.querySelector('.main-navigation');
  const links = nav.querySelectorAll('a');
  
  // Проверяем наличие ссылок
  if (links.length === 0) {
    console.error('Навигация не содержит ссылок');
    return false;
  }
  
  // Проверяем валидность ссылок
  links.forEach(link => {
    if (!link.href || link.href === '#') {
      console.warn('Найдена невалидная ссылка:', link);
    }
  });
  
  return true;
};
```

## Производительность

### Оптимизация изображений
- Используйте современные форматы (WebP, AVIF)
- Оптимизируйте размеры изображений
- Добавляйте lazy loading

```html
<!-- Lazy loading -->
<img src="placeholder.jpg" 
     data-src="actual-image.jpg" 
     loading="lazy" 
     alt="Описание изображения">
```

### Оптимизация CSS
- Минимизируйте количество HTTP запросов
- Используйте CSS Grid и Flexbox
- Избегайте вложенных селекторов

### Оптимизация JavaScript
- Загружайте скрипты асинхронно
- Используйте debounce для обработчиков событий
- Минимизируйте DOM манипуляции

```javascript
// Debounce функция
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Использование
const handleResize = debounce(() => {
  // Обработка изменения размера окна
}, 250);

window.addEventListener('resize', handleResize);
```

## Доступность (Accessibility)

### Основные принципы
- Используйте семантическую разметку
- Добавляйте ARIA атрибуты где необходимо
- Обеспечьте навигацию с клавиатуры
- Поддерживайте достаточный контраст

```html
<!-- Семантическая разметка -->
<nav aria-label="Главная навигация">
  <ul role="menubar">
    <li role="none">
      <a href="/" role="menuitem" aria-current="page">Главная</a>
    </li>
  </ul>
</nav>

<!-- Форма с правильными лейблами -->
<form>
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  
  <button type="submit" aria-describedby="submit-help">
    Отправить
  </button>
  <div id="submit-help" class="sr-only">
    Нажмите Enter для отправки формы
  </div>
</form>
```

### CSS для доступности
```css
/* Скрытый контент для скринридеров */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Фокус для клавиатурной навигации */
a:focus,
button:focus,
input:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Улучшенный контраст */
@media (prefers-contrast: high) {
  :root {
    --text-color: #000;
    --background-color: #fff;
  }
}
```

## Развертывание

### Подготовка к продакшену
```bash
# Сборка проекта
npm run build

# Проверка собранных файлов
ls -la dist/
```

### Проверка перед развертыванием
- [ ] Все изображения оптимизированы
- [ ] CSS и JS минифицированы
- [ ] Проверена доступность
- [ ] Протестирована адаптивность
- [ ] Проверена производительность

## Полезные инструменты

### Разработка
- **Live Server** - локальный сервер с автоперезагрузкой
- **Browser DevTools** - отладка и профилирование
- **Lighthouse** - анализ производительности

### Тестирование
- **WAVE** - проверка доступности
- **PageSpeed Insights** - анализ скорости
- **Cross-browser testing** - тестирование в разных браузерах

### Оптимизация
- **ImageOptim** - оптимизация изображений
- **PurgeCSS** - удаление неиспользуемых стилей
- **Webpack Bundle Analyzer** - анализ размера бандла

## Ресурсы для изучения

### Документация
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

### Стандарты
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev](https://web.dev/)
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals) 