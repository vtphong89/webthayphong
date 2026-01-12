# Changelog - Chuyển sang API

## ✅ Đã hoàn thành

### 1. Tạo API Endpoint
- ✅ Tạo file `api/js.js` - Serverless function để serve file JavaScript
- ✅ API endpoint: `/api/js?file=<tên-file>`
- ✅ Hỗ trợ tất cả 8 file JS: config.js, utils.js, wheel.js, timetable.js, countdown.js, schoolWeek.js, teachingPlan.js, main.js

### 2. Cập nhật HTML
- ✅ Cập nhật `index.html` để load JS từ API thay vì file trực tiếp
- ✅ Tất cả `<script src="...">` đã được chuyển sang `/api/js?file=...`

### 3. Cấu hình Vercel
- ✅ Tạo `vercel.json` để cấu hình routing và headers
- ✅ Cấu hình CORS cho API endpoints
- ✅ Đảm bảo API hoạt động đúng trên Vercel

### 4. Tài liệu
- ✅ Tạo `HUONG_DAN_VERCEL.md` - Hướng dẫn deploy lên Vercel
- ✅ Cập nhật `.gitignore` để bỏ qua `.vercel`

## 📋 Cách sử dụng

### Trước đây (load file trực tiếp):
```html
<script src="config.js"></script>
<script src="js/utils.js"></script>
```

### Bây giờ (load qua API):
```html
<script src="/api/js?file=config.js"></script>
<script src="/api/js?file=utils.js"></script>
```

## 🔒 Bảo mật

- ✅ Chỉ cho phép GET request
- ✅ Chỉ các file trong danh sách `ALLOWED_FILES` mới được serve
- ✅ Không thể truy cập file ngoài danh sách cho phép
- ✅ Validate tên file trước khi đọc

## 🚀 Deploy

1. Push code lên GitHub
2. Kết nối với Vercel
3. Vercel tự động detect và deploy
4. Tất cả file JS sẽ được serve qua API

## 📝 Lưu ý

- File gốc trong thư mục `js/` và `config.js` vẫn được giữ nguyên
- API đọc trực tiếp từ file gốc (chưa obfuscate)
- Nếu muốn obfuscate, có thể:
  1. Chạy `npm run build` để tạo file obfuscate trong `dist/`
  2. Cập nhật `api/js.js` để đọc từ `dist/` thay vì file gốc

## 🔄 Kết hợp với Obfuscation

Nếu muốn kết hợp API với obfuscation:

1. Chạy build để tạo file obfuscate:
```bash
npm run build
```

2. Cập nhật `api/js.js` để đọc từ `dist/`:
```javascript
const ALLOWED_FILES = {
  'config.js': path.join(rootPath, 'dist', 'config.js'),
  'utils.js': path.join(rootPath, 'dist', 'js', 'utils.js'),
  // ...
};
```

3. Deploy lại lên Vercel

