#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Скрипт для сборки JavaScript файлов
 * Объединяет все JS файлы в один оптимизированный файл
 */

const JS_DIR = path.join(__dirname, '../js');
const OUTPUT_FILE = path.join(__dirname, '../dist/script.min.js');

// Создаем директорию dist если её нет
const distDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

function buildJS() {
  console.log('🔨 Начинаем сборку JavaScript...');
  
  try {
    // Читаем все JS файлы в правильном порядке
    const jsFiles = [
      'core.min.js',
      'main.js',
      'site-stat.js'
    ];
    
    let combinedJS = '';
    
    jsFiles.forEach(file => {
      const filePath = path.join(JS_DIR, file);
      if (fs.existsSync(filePath)) {
        console.log(`📄 Обрабатываем: ${file}`);
        const content = fs.readFileSync(filePath, 'utf8');
        combinedJS += `// ${file}\n${content}\n\n`;
      } else {
        console.warn(`⚠️  Файл не найден: ${file}`);
      }
    });
    
    // Простая минификация
    const minifiedJS = combinedJS
      .replace(/\/\/.*$/gm, '') // Удаляем однострочные комментарии
      .replace(/\/\*[\s\S]*?\*\//g, '') // Удаляем многострочные комментарии
      .replace(/\s+/g, ' ') // Заменяем множественные пробелы на один
      .replace(/\s*{\s*/g, '{') // Убираем пробелы вокруг скобок
      .replace(/\s*}\s*/g, '}') // Убираем пробелы вокруг скобок
      .replace(/\s*;\s*/g, ';') // Убираем пробелы вокруг точек с запятой
      .replace(/\s*,\s*/g, ',') // Убираем пробелы вокруг запятых
      .replace(/\s*\(\s*/g, '(') // Убираем пробелы вокруг скобок
      .replace(/\s*\)\s*/g, ')') // Убираем пробелы вокруг скобок
      .trim();
    
    // Записываем результат
    fs.writeFileSync(OUTPUT_FILE, minifiedJS);
    
    const stats = fs.statSync(OUTPUT_FILE);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    
    console.log(`✅ JavaScript собран успешно!`);
    console.log(`📁 Файл: ${OUTPUT_FILE}`);
    console.log(`📊 Размер: ${fileSizeInKB} KB`);
    
  } catch (error) {
    console.error('❌ Ошибка при сборке JavaScript:', error.message);
    process.exit(1);
  }
}

// Запускаем сборку
buildJS(); 