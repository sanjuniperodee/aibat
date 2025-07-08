#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Скрипт для сборки CSS файлов
 * Объединяет все CSS файлы в один оптимизированный файл
 */

const CSS_DIR = path.join(__dirname, '../css');
const OUTPUT_FILE = path.join(__dirname, '../dist/style.min.css');

// Создаем директорию dist если её нет
const distDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

function buildCSS() {
  console.log('🔨 Начинаем сборку CSS...');
  
  try {
    // Читаем все CSS файлы
    const cssFiles = [
      'google-fonts-5c2dfa623dbc4a0023e12261.css',
      'core-theme-5c2dfa623dbc4a0023e12261.css',
      'style.css'
    ];
    
    let combinedCSS = '';
    
    cssFiles.forEach(file => {
      const filePath = path.join(CSS_DIR, file);
      if (fs.existsSync(filePath)) {
        console.log(`📄 Обрабатываем: ${file}`);
        const content = fs.readFileSync(filePath, 'utf8');
        combinedCSS += `/* ${file} */\n${content}\n\n`;
      } else {
        console.warn(`⚠️  Файл не найден: ${file}`);
      }
    });
    
    // Простая минификация (удаляем лишние пробелы и комментарии)
    const minifiedCSS = combinedCSS
      .replace(/\/\*[\s\S]*?\*\//g, '') // Удаляем комментарии
      .replace(/\s+/g, ' ') // Заменяем множественные пробелы на один
      .replace(/\s*{\s*/g, '{') // Убираем пробелы вокруг скобок
      .replace(/\s*}\s*/g, '}') // Убираем пробелы вокруг скобок
      .replace(/\s*:\s*/g, ':') // Убираем пробелы вокруг двоеточий
      .replace(/\s*;\s*/g, ';') // Убираем пробелы вокруг точек с запятой
      .replace(/\s*,\s*/g, ',') // Убираем пробелы вокруг запятых
      .trim();
    
    // Записываем результат
    fs.writeFileSync(OUTPUT_FILE, minifiedCSS);
    
    const stats = fs.statSync(OUTPUT_FILE);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    
    console.log(`✅ CSS собран успешно!`);
    console.log(`📁 Файл: ${OUTPUT_FILE}`);
    console.log(`📊 Размер: ${fileSizeInKB} KB`);
    
  } catch (error) {
    console.error('❌ Ошибка при сборке CSS:', error.message);
    process.exit(1);
  }
}

// Запускаем сборку
buildCSS(); 