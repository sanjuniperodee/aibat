# 🚀 Руководство по деплою сайта Айбат

## ✅ Что было сделано

### 1. Рефакторинг структуры проекта
- ✅ Вынесены все встроенные стили в отдельные CSS файлы
- ✅ Вынесены все встроенные скрипты в отдельные JS файлы
- ✅ Организованы ассеты в папку `assets/`
- ✅ Исправлены все пути к файлам
- ✅ Создан чистый, читаемый HTML код

### 2. Структура файлов
```
aibat/
├── index.html              # Основной файл (был index_1.html)
├── css/
│   ├── custom.css          # Пользовательские стили
│   ├── core-theme-*.css    # Основная тема
│   ├── google-fonts-*.css  # Google Fonts
│   └── style.css           # Дополнительные стили
├── js/
│   ├── main.js             # Основной скрипт
│   ├── initial.js          # Инициализация
│   ├── page-*.js           # Скрипты страниц
│   └── view-*.js           # Скрипты представлений
├── assets/                 # Все изображения и иконки
├── deploy.sh               # Автоматический скрипт деплоя
└── README.md               # Обновленная документация
```

## 🌐 Локальная разработка

### Запуск локального сервера
```bash
# Сайт уже запущен на http://localhost:8080
# Теперь можно открывать просто http://localhost:8080 (без /index_1.html)
```

## 🚀 Деплой на сервер

### Подготовка сервера
1. **Установите Ubuntu/Debian сервер**
2. **Подключитесь к серверу:**
   ```bash
   ssh user@your-server-ip
   ```

3. **Обновите систему:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

4. **Установите nginx:**
   ```bash
   sudo apt install nginx -y
   sudo systemctl enable nginx
   sudo systemctl start nginx
   ```

### Настройка домена
1. **Настройте DNS записи:**
   - A запись: `yourdomain.com` → IP вашего сервера
   - A запись: `www.yourdomain.com` → IP вашего сервера

2. **Подождите 5-10 минут** для распространения DNS

### Деплой проекта
1. **Клонируйте проект на сервер:**
   ```bash
   git clone <your-repository-url>
   cd aibat
   ```

2. **Запустите скрипт деплоя:**
   ```bash
   sudo ./deploy.sh yourdomain.com
   ```

### Что делает скрипт deploy.sh
- ✅ Создает директорию `/var/www/yourdomain.com`
- ✅ Копирует все файлы проекта
- ✅ Создает конфигурацию nginx
- ✅ Активирует сайт
- ✅ Устанавливает certbot
- ✅ Получает SSL сертификат
- ✅ Настраивает автообновление сертификатов
- ✅ Применяет настройки безопасности

## 🔧 Ручная настройка (если скрипт не работает)

### 1. Создание директории
```bash
sudo mkdir -p /var/www/yourdomain.com
sudo cp -r . /var/www/yourdomain.com/
sudo chown -R www-data:www-data /var/www/yourdomain.com
sudo chmod -R 755 /var/www/yourdomain.com
```

### 2. Конфигурация nginx
```bash
sudo nano /etc/nginx/sites-available/yourdomain.com
```

Содержимое файла:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/yourdomain.com;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

### 3. Активация сайта
```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. SSL сертификат
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 🔍 Проверка работы

### Проверка сайта
- Откройте `http://yourdomain.com` (должен редиректить на HTTPS)
- Откройте `https://yourdomain.com` (должен работать с SSL)

### Проверка сервисов
```bash
# Статус nginx
sudo systemctl status nginx

# Проверка SSL
sudo certbot certificates

# Логи nginx
sudo tail -f /var/log/nginx/yourdomain.com.error.log
```

## 🛠 Полезные команды

### Управление nginx
```bash
sudo systemctl start nginx      # Запуск
sudo systemctl stop nginx       # Остановка
sudo systemctl reload nginx     # Перезагрузка конфигурации
sudo systemctl restart nginx    # Полный перезапуск
```

### Управление SSL
```bash
sudo certbot certificates       # Список сертификатов
sudo certbot renew             # Обновление сертификатов
sudo certbot delete --cert-name yourdomain.com  # Удаление сертификата
```

### Логи и отладка
```bash
# Логи nginx
sudo tail -f /var/log/nginx/yourdomain.com.access.log
sudo tail -f /var/log/nginx/yourdomain.com.error.log

# Проверка конфигурации
sudo nginx -t

# Проверка портов
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
```

## 🔒 Безопасность

### Настройки безопасности в nginx
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: no-referrer-when-downgrade

### Дополнительные меры
```bash
# Настройка файрвола
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Регулярные обновления
sudo apt update && sudo apt upgrade -y
```

## 📊 Мониторинг

### Автоматическое обновление SSL
```bash
# Проверка cron задач
sudo crontab -l

# Ручное обновление
sudo certbot renew --dry-run
```

### Мониторинг диска
```bash
# Проверка места на диске
df -h

# Очистка логов
sudo journalctl --vacuum-time=7d
```

## 🆘 Устранение проблем

### Сайт не загружается
1. Проверьте статус nginx: `sudo systemctl status nginx`
2. Проверьте конфигурацию: `sudo nginx -t`
3. Проверьте логи: `sudo tail -f /var/log/nginx/error.log`

### SSL не работает
1. Проверьте DNS настройки
2. Проверьте сертификаты: `sudo certbot certificates`
3. Проверьте порт 443: `sudo netstat -tlnp | grep :443`

### Ошибки 404
1. Проверьте путь к файлам: `ls -la /var/www/yourdomain.com/`
2. Проверьте права доступа: `sudo chown -R www-data:www-data /var/www/yourdomain.com`

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи nginx
2. Убедитесь в правильности DNS настроек
3. Проверьте права доступа к файлам
4. Убедитесь в корректности SSL сертификата

---

**🎉 Поздравляем! Ваш сайт готов к продакшену!** 