// Script kiểm tra cấu hình Vercel
const fs = require('fs');
const path = require('path');

console.log('🔍 Kiểm tra cấu hình Vercel...\n');

let hasError = false;

// 1. Kiểm tra vercel.json
console.log('1. Kiểm tra vercel.json...');
try {
  const vercelJson = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  console.log('   ✅ vercel.json hợp lệ');
} catch (error) {
  console.log('   ❌ vercel.json có lỗi:', error.message);
  hasError = true;
}

// 2. Kiểm tra api/js.js
console.log('\n2. Kiểm tra api/js.js...');
if (fs.existsSync('api/js.js')) {
  console.log('   ✅ api/js.js tồn tại');
  const apiContent = fs.readFileSync('api/js.js', 'utf8');
  if (apiContent.includes('module.exports')) {
    console.log('   ✅ api/js.js có export đúng');
  } else {
    console.log('   ❌ api/js.js thiếu module.exports');
    hasError = true;
  }
} else {
  console.log('   ❌ api/js.js không tồn tại');
  hasError = true;
}

// 3. Kiểm tra các file JS cần thiết
console.log('\n3. Kiểm tra các file JS...');
const requiredFiles = [
  'config.js',
  'js/utils.js',
  'js/wheel.js',
  'js/timetable.js',
  'js/countdown.js',
  'js/schoolWeek.js',
  'js/teachingPlan.js',
  'js/main.js'
];

let missingFiles = [];
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - KHÔNG TỒN TẠI`);
    missingFiles.push(file);
    hasError = true;
  }
});

// 4. Kiểm tra index.html
console.log('\n4. Kiểm tra index.html...');
if (fs.existsSync('index.html')) {
  const htmlContent = fs.readFileSync('index.html', 'utf8');
  if (htmlContent.includes('/api/js?file=')) {
    console.log('   ✅ index.html đã cập nhật để dùng API');
  } else {
    console.log('   ⚠️  index.html chưa cập nhật để dùng API');
    console.log('      Cần thay đổi script tags sang /api/js?file=...');
  }
} else {
  console.log('   ❌ index.html không tồn tại');
  hasError = true;
}

// 5. Kiểm tra package.json
console.log('\n5. Kiểm tra package.json...');
if (fs.existsSync('package.json')) {
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log('   ✅ package.json hợp lệ');
  } catch (error) {
    console.log('   ❌ package.json có lỗi:', error.message);
    hasError = true;
  }
} else {
  console.log('   ⚠️  package.json không tồn tại (không bắt buộc)');
}

// Tổng kết
console.log('\n' + '='.repeat(50));
if (hasError) {
  console.log('❌ CÓ LỖI! Vui lòng sửa các lỗi trên trước khi deploy.');
  if (missingFiles.length > 0) {
    console.log('\n📋 File thiếu:');
    missingFiles.forEach(file => console.log(`   - ${file}`));
  }
  process.exit(1);
} else {
  console.log('✅ Tất cả kiểm tra đều PASS! Có thể deploy lên Vercel.');
  console.log('\n📝 Bước tiếp theo:');
  console.log('   1. Commit và push lên GitHub');
  console.log('   2. Vào Vercel và import project');
  console.log('   3. Vercel sẽ tự động deploy');
}
console.log('='.repeat(50));

