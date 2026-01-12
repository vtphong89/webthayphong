# Hướng dẫn Deploy lên Vercel

## 📋 Tổng quan

Dự án này đã được cấu hình để chạy trên Vercel với API endpoints để serve các file JavaScript. Tất cả file `.js` sẽ được load qua API thay vì file trực tiếp.

## 🚀 Cách Deploy

### Bước 1: Cài đặt Vercel CLI (nếu chưa có)

```bash
npm install -g vercel
```

### Bước 2: Đăng nhập Vercel

```bash
vercel login
```

### Bước 3: Deploy

```bash
vercel
```

Hoặc deploy production:

```bash
vercel --prod
```

## 🌐 Deploy qua GitHub (Khuyến nghị)

1. **Push code lên GitHub** (đã có hướng dẫn trong `HUONG_DAN_GITHUB.md`)

2. **Kết nối với Vercel:**
   - Vào https://vercel.com
   - Đăng nhập bằng GitHub
   - Click "New Project"
   - Chọn repository của bạn
   - Vercel sẽ tự động detect và deploy

3. **Cấu hình tự động:**
   - Vercel sẽ tự động detect `vercel.json` và cấu hình routing
   - API endpoints sẽ tự động được tạo từ thư mục `api/`

## 📁 Cấu trúc API

### Endpoint: `/api/js`

**Cách sử dụng:**
```
/api/js?file=config.js
/api/js?file=utils.js
/api/js?file=wheel.js
/api/js?file=timetable.js
/api/js?file=countdown.js
/api/js?file=schoolWeek.js
/api/js?file=teachingPlan.js
/api/js?file=main.js
```

**Ví dụ:**
```html
<script src="/api/js?file=config.js"></script>
```

## 🔒 Bảo mật

- API chỉ cho phép GET request
- Chỉ các file trong danh sách `ALLOWED_FILES` mới được serve
- Không thể truy cập file ngoài danh sách cho phép

## 📝 File cấu hình

### `vercel.json`
- Cấu hình routing cho API
- Set headers cho CORS
- Đảm bảo API endpoints hoạt động đúng

### `api/js.js`
- Serverless function để serve file JavaScript
- Kiểm tra và validate tên file
- Trả về content với header đúng

## ⚙️ Cấu trúc thư mục trên Vercel

```
/
├── api/
│   └── js.js          # API endpoint
├── js/                # Source code (không cần trên server)
├── index.html         # File HTML chính
├── styles.css         # File CSS
├── config.js          # Config (có thể dùng API hoặc file trực tiếp)
├── vercel.json        # Cấu hình Vercel
└── package.json       # Dependencies (nếu có)
```

## 🔄 Workflow

1. **Development:**
   - Chỉnh sửa file trong thư mục `js/` và `config.js`
   - Test local (nếu cần)

2. **Deploy:**
   - Push lên GitHub
   - Vercel tự động deploy
   - Hoặc chạy `vercel --prod`

3. **Production:**
   - Tất cả file JS được serve qua `/api/js?file=...`
   - Code được bảo vệ qua API layer

## 🐛 Troubleshooting

### Lỗi: "File not found"
- Kiểm tra tên file có đúng không
- Kiểm tra file có trong danh sách `ALLOWED_FILES` trong `api/js.js`

### Lỗi: "Method not allowed"
- API chỉ chấp nhận GET request
- Kiểm tra URL có đúng không

### Lỗi: "Internal server error"
- Kiểm tra file có tồn tại không
- Kiểm tra quyền đọc file
- Xem logs trên Vercel dashboard

## 📚 Tài liệu tham khảo

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)

