#!/bin/bash

# Скрипт для автоматического деплоя и настройки домена
# Использование: ./deploy.sh yourdomain.com

set -e

# Проверка аргументов
if [ $# -eq 0 ]; then
    echo "Использование: $0 <domain>"
    echo "Пример: $0 example.com"
    exit 1
fi

DOMAIN=$1
PROJECT_DIR="/var/www/$DOMAIN"
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"
NGINX_ENABLED="/etc/nginx/sites-enabled/$DOMAIN"

echo "🚀 Начинаем деплой для домена: $DOMAIN"

# Проверяем права sudo
if [ "$EUID" -ne 0 ]; then
    echo "❌ Этот скрипт должен запускаться с правами sudo"
    exit 1
fi

# Создаем директорию для проекта
echo "📁 Создаем директорию проекта..."
mkdir -p $PROJECT_DIR

# Копируем файлы проекта (предполагаем, что скрипт запускается из директории проекта)
echo "📋 Копируем файлы проекта..."
cp -r . $PROJECT_DIR/

# Устанавливаем права
echo "🔐 Устанавливаем права доступа..."
chown -R www-data:www-data $PROJECT_DIR
chmod -R 755 $PROJECT_DIR

# Создаем конфигурацию nginx
echo "⚙️ Создаем конфигурацию nginx..."
cat > $NGINX_CONF << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    root $PROJECT_DIR;
    index index.html index.htm;

    # Логи
    access_log /var/log/nginx/$DOMAIN.access.log;
    error_log /var/log/nginx/$DOMAIN.error.log;

    # Основные настройки
    location / {
        try_files \$uri \$uri/ =404;
    }

    # Кэширование статических файлов
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

# Активируем сайт
echo "🔗 Активируем сайт в nginx..."
ln -sf $NGINX_CONF $NGINX_ENABLED

# Проверяем конфигурацию nginx
echo "🔍 Проверяем конфигурацию nginx..."
nginx -t

# Перезапускаем nginx
echo "🔄 Перезапускаем nginx..."
systemctl reload nginx

# Устанавливаем certbot если не установлен
if ! command -v certbot &> /dev/null; then
    echo "📦 Устанавливаем certbot..."
    apt update
    apt install -y certbot python3-certbot-nginx
fi

# Получаем SSL сертификат
echo "🔒 Получаем SSL сертификат..."
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Настраиваем автообновление сертификата
echo "⏰ Настраиваем автообновление сертификата..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

# Финальная проверка
echo "✅ Проверяем статус сервисов..."
systemctl status nginx --no-pager -l

echo "🎉 Деплой завершен успешно!"
echo "🌐 Ваш сайт доступен по адресу: https://$DOMAIN"
echo "📧 Для получения SSL сертификата использован email: admin@$DOMAIN"
echo ""
echo "📝 Полезные команды:"
echo "  - Просмотр логов nginx: tail -f /var/log/nginx/$DOMAIN.error.log"
echo "  - Проверка SSL: certbot certificates"
echo "  - Обновление сертификата: certbot renew"
echo "  - Перезапуск nginx: systemctl reload nginx" 