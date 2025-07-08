# Руководство по развертыванию

## Подготовка к продакшену

### 1. Сборка проекта

Перед развертыванием выполните сборку проекта:

```bash
npm run build
```

Это создаст оптимизированные файлы в папке `dist/`:
- `style.min.css` - минифицированные стили
- `script.min.js` - минифицированный JavaScript

### 2. Структура файлов для продакшена

```
your-server/
├── index.html              # Главная страница
├── css/
│   ├── style.css          # Основные стили
│   ├── core-theme-*.css   # Тематические стили
│   └── google-fonts-*.css # Шрифты Google
├── js/
│   ├── main.js            # Основной скрипт
│   ├── core.min.js        # Минифицированная библиотека
│   └── site-stat.js       # Статистика сайта
├── images/                 # Все изображения
└── dist/                   # Оптимизированные файлы (опционально)
    ├── style.min.css
    └── script.min.js
```

## Варианты развертывания

### 1. Статический хостинг

#### Netlify
1. Подключите ваш Git репозиторий к Netlify
2. Настройте команду сборки: `npm run build`
3. Укажите папку публикации: `.` (корень проекта)
4. Настройте домен

#### Vercel
1. Подключите репозиторий к Vercel
2. Настройте команду сборки: `npm run build`
3. Укажите папку публикации: `.`
4. Настройте домен

#### GitHub Pages
1. Создайте ветку `gh-pages`
2. Загрузите файлы в эту ветку
3. Включите GitHub Pages в настройках репозитория
4. Выберите ветку `gh-pages` как источник

### 2. VPS/Выделенный сервер

#### Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/aibat-website;
    index index.html;

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Кэширование статических файлов
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Основные файлы
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

#### Apache
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/aibat-website
    
    <Directory /var/www/aibat-website>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Включаем сжатие
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/plain
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE text/xml
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE application/xml
        AddOutputFilterByType DEFLATE application/xhtml+xml
        AddOutputFilterByType DEFLATE application/rss+xml
        AddOutputFilterByType DEFLATE application/javascript
        AddOutputFilterByType DEFLATE application/x-javascript
    </IfModule>
    
    # Кэширование
    <IfModule mod_expires.c>
        ExpiresActive on
        ExpiresByType text/css "access plus 1 year"
        ExpiresByType application/javascript "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType image/jpg "access plus 1 year"
        ExpiresByType image/jpeg "access plus 1 year"
        ExpiresByType image/gif "access plus 1 year"
        ExpiresByType image/ico "access plus 1 year"
        ExpiresByType image/icon "access plus 1 year"
        ExpiresByType text/plain "access plus 1 month"
        ExpiresByType application/pdf "access plus 1 month"
        ExpiresByType application/x-shockwave-flash "access plus 1 month"
    </IfModule>
</VirtualHost>
```

### 3. CDN

Для улучшения производительности рекомендуется использовать CDN:

#### Cloudflare
1. Добавьте ваш домен в Cloudflare
2. Измените DNS записи на Cloudflare
3. Включите автоматическое сжатие
4. Настройте кэширование

#### AWS CloudFront
1. Создайте распределение CloudFront
2. Укажите ваш S3 bucket или сервер как источник
3. Настройте кэширование и сжатие

## SSL/HTTPS

### Let's Encrypt (бесплатно)
```bash
# Установка Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d your-domain.com

# Автоматическое обновление
sudo crontab -e
# Добавьте строку:
0 12 * * * /usr/bin/certbot renew --quiet
```

### Cloudflare SSL
1. Включите SSL/TLS в Cloudflare
2. Выберите режим "Full" или "Full (strict)"
3. Настройте правила безопасности

## Мониторинг и аналитика

### Google Analytics
Добавьте код отслеживания в `<head>` секцию `index.html`:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Мониторинг производительности
- **Google PageSpeed Insights** - анализ производительности
- **GTmetrix** - детальный анализ скорости загрузки
- **WebPageTest** - тестирование из разных локаций

## Резервное копирование

### Автоматические бэкапы
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/aibat-website"
SOURCE_DIR="/var/www/aibat-website"

# Создаем бэкап
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" -C "$SOURCE_DIR" .

# Удаляем старые бэкапы (старше 30 дней)
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +30 -delete
```

Добавьте в crontab:
```bash
0 2 * * * /path/to/backup.sh
```

## Обновление сайта

### Процесс обновления
1. Создайте бэкап текущей версии
2. Загрузите новые файлы
3. Проверьте работоспособность
4. Обновите кэш CDN если необходимо

### Откат изменений
```bash
# Восстановление из бэкапа
tar -xzf backup_20231201_143022.tar.gz -C /var/www/aibat-website/
```

## Безопасность

### Основные меры
1. Регулярно обновляйте сервер
2. Используйте HTTPS
3. Настройте файрвол
4. Мониторьте логи
5. Используйте сложные пароли

### Защита от атак
```nginx
# Nginx конфигурация безопасности
# Ограничение размера запросов
client_max_body_size 10M;

# Защита от DDoS
limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;
limit_req zone=one burst=10 nodelay;

# Скрытие версии сервера
server_tokens off;
```

## Производительность

### Оптимизация изображений
```bash
# Установка ImageOptim (macOS) или аналогичных инструментов
# Сжатие всех изображений перед загрузкой
```

### Минификация
Используйте собранные файлы из папки `dist/` для продакшена.

### Кэширование
Настройте правильные заголовки кэширования для статических файлов. 