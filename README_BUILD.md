# Hướng dẫn Obfuscate JavaScript

## Cài đặt

1. Cài đặt Node.js (nếu chưa có): https://nodejs.org/

2. Cài đặt các dependencies:
```bash
npm install
```

## Build và Obfuscate

Chạy lệnh sau để obfuscate tất cả file JavaScript:

```bash
npm run build
```

hoặc

```bash
node build.js
```

## Kết quả

Sau khi chạy build, tất cả file JavaScript đã được obfuscate sẽ nằm trong thư mục `dist/`:

- `dist/config.js` - File config đã obfuscate
- `dist/js/*.js` - Tất cả file JS trong thư mục js đã obfuscate
- `dist/index.html` - File HTML (giữ nguyên)
- `dist/styles.css` - File CSS (giữ nguyên)

## Deploy

Bạn có thể deploy toàn bộ thư mục `dist/` lên server. Code JavaScript đã được obfuscate nên sẽ khó đọc và reverse engineer hơn.

## Lưu ý

- File gốc trong thư mục `js/` và `config.js` vẫn được giữ nguyên
- Chỉ các file trong `dist/` mới được obfuscate
- Nếu cần chỉnh sửa code, hãy chỉnh sửa file gốc rồi chạy lại `npm run build`

