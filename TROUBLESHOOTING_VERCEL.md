# Troubleshooting - Vercel Deployment

## ❌ Vấn đề: Không upload được lên Vercel từ GitHub

### 🔍 Các nguyên nhân thường gặp:

### 1. **Lỗi Build/Deploy**
- Kiểm tra logs trên Vercel Dashboard
- Xem tab "Deployments" → chọn deployment → xem "Build Logs"

### 2. **Thiếu file cấu hình**
- ✅ Đảm bảo có `vercel.json` (đã có)
- ✅ Đảm bảo có `package.json` (đã có)
- ✅ Đảm bảo có thư mục `api/` với file `js.js`

### 3. **Lỗi API Route**
- Vercel tự động detect API routes trong thư mục `api/`
- File `api/js.js` sẽ tự động thành endpoint `/api/js`
- Không cần cấu hình phức tạp trong `vercel.json`

### 4. **Lỗi đọc file**
- Trên Vercel, `process.cwd()` trỏ về thư mục gốc của project
- Đảm bảo file tồn tại trong repository

## ✅ Giải pháp

### Bước 1: Kiểm tra cấu trúc thư mục trên GitHub

Đảm bảo có các file sau:
```
/
├── api/
│   └── js.js          ✅ Phải có
├── js/                ✅ Phải có
├── index.html         ✅ Phải có
├── config.js          ✅ Phải có
├── styles.css         ✅ Phải có
├── vercel.json        ✅ Phải có
└── package.json       ✅ Phải có
```

### Bước 2: Kiểm tra Vercel Dashboard

1. Vào https://vercel.com/dashboard
2. Chọn project của bạn
3. Xem tab "Deployments"
4. Click vào deployment mới nhất
5. Xem "Build Logs" để tìm lỗi

### Bước 3: Kiểm tra lỗi thường gặp

#### Lỗi: "Cannot find module"
- Đảm bảo `package.json` có đầy đủ dependencies
- Vercel sẽ tự động chạy `npm install`

#### Lỗi: "File not found"
- Kiểm tra đường dẫn file trong `api/js.js`
- Đảm bảo file tồn tại trong repository

#### Lỗi: "Build failed"
- Kiểm tra `vercel.json` có đúng format JSON không
- Đảm bảo không có syntax error

### Bước 4: Test local với Vercel CLI

```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Test local
vercel dev
```

## 🔧 Cấu hình tối thiểu

### vercel.json (đã được đơn giản hóa)
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

### api/js.js
- Phải export function async nhận `(req, res)`
- Vercel tự động detect và tạo endpoint

## 📝 Checklist trước khi deploy

- [ ] Tất cả file đã được commit và push lên GitHub
- [ ] `vercel.json` có đúng format JSON
- [ ] `api/js.js` tồn tại và có code đúng
- [ ] `package.json` tồn tại
- [ ] Tất cả file JS trong `js/` và `config.js` tồn tại
- [ ] `index.html` đã được cập nhật để dùng API

## 🆘 Nếu vẫn không được

1. **Xóa và tạo lại project trên Vercel:**
   - Xóa project cũ
   - Tạo project mới
   - Import lại từ GitHub

2. **Kiểm tra GitHub repository:**
   - Đảm bảo repository là public hoặc bạn đã cấp quyền cho Vercel
   - Kiểm tra branch đúng (thường là `main` hoặc `master`)

3. **Liên hệ support:**
   - Vercel có support tốt
   - Xem logs và gửi cho support nếu cần

## 🔄 Alternative: Deploy không dùng API

Nếu API không hoạt động, có thể tạm thời quay lại load file trực tiếp:

1. Cập nhật `index.html`:
```html
<script src="config.js"></script>
<script src="js/utils.js"></script>
<!-- ... -->
```

2. Đảm bảo tất cả file được deploy
3. Vercel sẽ serve static files tự động

