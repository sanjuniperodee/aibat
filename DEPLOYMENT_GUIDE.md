# 🚀 Руководство по деплою сайта EcoForest Group

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
```