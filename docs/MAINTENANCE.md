# Руководство по обслуживанию сайта

## Обзор изменений (Июль 2024)

### Основные улучшения

1. **Современный дизайн**
   - Обновлен главный экран без карусели для улучшения производительности
   - Добавлены анимации и эффекты для улучшения пользовательского опыта
   - Улучшена мобильная версия сайта

2. **Исправления стилей**
   - Полностью переработаны стили CSS с использованием переменных
   - Добавлены медиа-запросы для адаптивности на всех устройствах
   - Исправлены проблемы с отображением в блоке контактов и футере

3. **Карусели и слайдеры**
   - Оптимизирована карусель в секции питомника
   - Добавлены плавные переходы и навигация

4. **Дополнительные страницы**
   - Созданы отдельные страницы для услуг
   - Созданы отдельные страницы для проектов
   - Добавлены страницы ошибок 404 и 500

5. **SEO-оптимизация**
   - Добавлены метатеги для всех страниц
   - Создан файл sitemap.xml
   - Создан файл robots.txt
   - Добавлены структурированные данные JSON-LD

6. **Производительность**
   - Оптимизированы изображения
   - Добавлено кэширование через .htaccess
   - Улучшена загрузка скриптов

## Регулярное обслуживание

### Еженедельные задачи

- Проверка работоспособности форм обратной связи
- Проверка доступности сайта и скорости загрузки
- Мониторинг ошибок в консоли браузера

### Ежемесячные задачи

- Обновление контента для поддержания актуальности
- Проверка и обновление метаданных для SEO
- Резервное копирование сайта

### Ежеквартальные задачи

- Проверка и обновление информации о проектах и услугах
- Анализ статистики посещаемости
- Оптимизация производительности

## Обновление контента

### Изменение текстов

1. Откройте соответствующий HTML-файл
2. Найдите нужный раздел с текстом
3. Внесите изменения
4. Сохраните файл и загрузите на сервер

### Добавление новых изображений

1. Оптимизируйте изображение (рекомендуемые размеры: до 1200px по ширине)
2. Загрузите изображение в папку `assets/`
3. Обновите ссылку на изображение в HTML-файле

### Добавление новых услуг или проектов

1. Создайте новый HTML-файл в соответствующей папке (`services/` или `projects/`)
2. Используйте существующий файл как шаблон
3. Обновите содержимое
4. Добавьте ссылку на новую страницу в `index.html`
5. Обновите файл sitemap.xml

## Технические аспекты

### Структура файлов

```
.
├── index.html              # Главная страница
├── 404.html                # Страница 404 ошибки
├── 500.html                # Страница 500 ошибки
├── robots.txt              # Файл для поисковых роботов
├── sitemap.xml             # Карта сайта для SEO
├── .htaccess               # Конфигурация Apache
├── css/
│   ├── style.css           # Основные стили
│   └── ...                 # Другие стили
├── js/
│   ├── main.js             # Основной JavaScript
│   └── ...                 # Другие скрипты
├── services/               # Страницы услуг
├── projects/               # Страницы проектов
└── assets/                 # Изображения и ресурсы
```

### Используемые технологии

- HTML5 с семантической разметкой
- CSS3 с переменными, flexbox и grid
- JavaScript (ES6+)
- Swiper.js для слайдеров
- Font Awesome для иконок

## Решение проблем

### Проблемы с отображением

1. Проверьте консоль браузера на наличие ошибок
2. Проверьте, загружаются ли все CSS и JavaScript файлы
3. Проверьте медиа-запросы для разных устройств

### Проблемы с формой обратной связи

1. Проверьте JavaScript-валидацию
2. Проверьте обработчик формы
3. Проверьте настройки сервера для отправки почты

### Проблемы с производительностью

1. Оптимизируйте изображения
2. Минифицируйте CSS и JavaScript
3. Включите сжатие GZIP на сервере
4. Используйте кэширование браузера

## Контакты для поддержки

При возникновении проблем с сайтом обращайтесь:

- **Техническая поддержка**: support@example.com
- **Администратор сайта**: admin@example.com
- **Телефон поддержки**: +7 (XXX) XXX-XX-XX

## Полезные ресурсы

- [Google PageSpeed Insights](https://pagespeed.web.dev/) - анализ производительности
- [Google Search Console](https://search.google.com/search-console) - мониторинг индексации
- [GTmetrix](https://gtmetrix.com/) - анализ скорости загрузки
- [Can I Use](https://caniuse.com/) - проверка поддержки браузерами

## Регулярные задачи

### Ежедневные проверки

#### 1. Мониторинг доступности
- Проверьте доступность сайта: `curl -I https://your-domain.com`
- Проверьте время отклика
- Убедитесь, что SSL сертификат действителен

#### 2. Проверка логов
```bash
# Nginx логи
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Системные логи
journalctl -u nginx --since "1 hour ago"
```

#### 3. Мониторинг дискового пространства
```bash
df -h
du -sh /var/www/aibat-website/*
```

### Еженедельные задачи

#### 1. Анализ производительности
- Запустите Google PageSpeed Insights
- Проверьте GTmetrix отчеты
- Анализируйте Core Web Vitals

#### 2. Обновление системы
```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade

# CentOS/RHEL
sudo yum update
```

#### 3. Проверка безопасности
```bash
# Сканирование уязвимостей
nmap -sV your-domain.com

# Проверка SSL
openssl s_client -connect your-domain.com:443 -servername your-domain.com
```

### Ежемесячные задачи

#### 1. Резервное копирование
```bash
# Создание полного бэкапа
tar -czf backup_$(date +%Y%m).tar.gz -C /var/www/aibat-website .

# Проверка целостности бэкапа
tar -tzf backup_$(date +%Y%m).tar.gz | wc -l
```

#### 2. Анализ трафика
- Проверьте Google Analytics отчеты
- Анализируйте источники трафика
- Изучите поведение пользователей

#### 3. Обновление контента
- Проверьте актуальность информации
- Обновите контактные данные если необходимо
- Добавьте новый контент

## Устранение неполадок

### Проблемы с производительностью

#### Медленная загрузка
1. **Проверьте размер изображений**
   ```bash
   find /var/www/aibat-website/images -name "*.jpg" -exec ls -lh {} \;
   ```

2. **Оптимизируйте изображения**
   ```bash
   # Установка ImageOptim или аналогичного инструмента
   # Сжатие изображений без потери качества
   ```

3. **Проверьте кэширование**
   ```bash
   # Проверка заголовков кэширования
   curl -I https://your-domain.com/css/style.css
   ```

#### Высокая нагрузка на сервер
1. **Анализ логов**
   ```bash
   # Топ IP адресов
   awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10
   
   # Топ запросов
   awk '{print $7}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10
   ```

2. **Настройка rate limiting**
   ```nginx
   # В nginx.conf
   limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
   limit_req zone=api burst=20 nodelay;
   ```

### Проблемы с безопасностью

#### DDoS атаки
1. **Включите защиту в Cloudflare**
2. **Настройте файрвол**
   ```bash
   # UFW (Ubuntu)
   sudo ufw enable
   sudo ufw default deny incoming
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   ```

3. **Мониторинг в реальном времени**
   ```bash
   # Мониторинг соединений
   netstat -an | grep :80 | wc -l
   ```

#### Вредоносные запросы
1. **Анализ логов на подозрительную активность**
   ```bash
   # Поиск SQL инъекций
   grep -i "union\|select\|insert\|delete\|update" /var/log/nginx/access.log
   
   # Поиск XSS атак
   grep -i "script\|javascript\|onload\|onerror" /var/log/nginx/access.log
   ```

2. **Настройка WAF (Web Application Firewall)**
   ```nginx
   # Блокировка подозрительных User-Agent
   if ($http_user_agent ~* (curl|wget|python|bot)) {
       return 403;
   }
   ```

### Проблемы с SSL

#### Истекший сертификат
```bash
# Проверка срока действия
openssl x509 -in /etc/letsencrypt/live/your-domain.com/cert.pem -text -noout | grep "Not After"

# Обновление сертификата
sudo certbot renew --dry-run
sudo certbot renew
```

#### Ошибки SSL
1. **Проверьте конфигурацию**
   ```bash
   # Тест SSL
   openssl s_client -connect your-domain.com:443 -servername your-domain.com
   ```

2. **Обновите SSL конфигурацию**
   ```nginx
   ssl_protocols TLSv1.2 TLSv1.3;
   ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
   ssl_prefer_server_ciphers off;
   ```

## Оптимизация

### Производительность

#### Оптимизация изображений
```bash
# Автоматическая оптимизация
find /var/www/aibat-website/images -name "*.jpg" -exec jpegoptim --strip-all {} \;
find /var/www/aibat-website/images -name "*.png" -exec optipng {} \;
```

#### Настройка кэширования
```nginx
# Кэширование статических файлов
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Vary Accept-Encoding;
}
```

#### Gzip сжатие
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### SEO оптимизация

#### Проверка мета-тегов
- Убедитесь, что все страницы имеют уникальные title и description
- Проверьте правильность Open Graph тегов
- Проверьте структурированные данные

#### Анализ ссылок
```bash
# Поиск битых ссылок
wget --spider -r -nd -nv -H -l 1 -w 2 -o links.log https://your-domain.com
grep -B1 "404" links.log
```

### Мониторинг

#### Настройка алертов
```bash
#!/bin/bash
# check_site.sh
SITE="https://your-domain.com"
EMAIL="admin@your-domain.com"

if ! curl -f -s -o /dev/null -w "%{http_code}" $SITE | grep -q "200"; then
    echo "Сайт недоступен!" | mail -s "Alert: Site Down" $EMAIL
fi
```

#### Автоматический мониторинг
```bash
# Добавьте в crontab
*/5 * * * * /path/to/check_site.sh
```

## Обновления

### Обновление контента

#### Процедура обновления
1. **Создайте бэкап**
   ```bash
   tar -czf backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /var/www/aibat-website .
   ```

2. **Загрузите новые файлы**
   ```bash
   rsync -avz --delete /path/to/new/files/ /var/www/aibat-website/
   ```

3. **Проверьте права доступа**
   ```bash
   chown -R www-data:www-data /var/www/aibat-website
   chmod -R 755 /var/www/aibat-website
   ```

4. **Проверьте работоспособность**
   ```bash
   curl -I https://your-domain.com
   ```

#### Откат изменений
```bash
# Восстановление из бэкапа
tar -xzf backup_20231201_143022.tar.gz -C /var/www/aibat-website/
```

### Обновление системы

#### Планирование обновлений
1. **Выберите время минимальной нагрузки**
2. **Уведомите пользователей о плановых работах**
3. **Подготовьте план отката**

#### Процедура обновления
```bash
# 1. Создайте бэкап
tar -czf system_backup_$(date +%Y%m%d).tar.gz -C /var/www .

# 2. Обновите систему
sudo apt update && sudo apt upgrade

# 3. Перезапустите сервисы
sudo systemctl restart nginx
sudo systemctl restart php-fpm  # если используется

# 4. Проверьте работоспособность
curl -I https://your-domain.com
```

## Документация

### Ведение логов изменений
Создайте файл `CHANGELOG.md` для отслеживания изменений:

```markdown
# Changelog

## [1.1.0] - 2023-12-01
### Added
- Новый раздел "О компании"
- Контактная форма

### Changed
- Обновлен дизайн главной страницы
- Улучшена производительность

### Fixed
- Исправлена ошибка в мобильной версии
- Устранена проблема с загрузкой изображений
```

### Документирование конфигурации
Ведите документацию по всем настройкам сервера и приложения. 