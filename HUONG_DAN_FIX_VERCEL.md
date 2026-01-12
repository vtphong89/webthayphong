# Hướng dẫn Fix Lỗi Vercel

## 🔍 Bước 1: Kiểm tra cấu hình

Chạy script kiểm tra:

```bash
npm run check
```

hoặc

```bash
node check-vercel.js
```

Script sẽ kiểm tra:
- ✅ `vercel.json` có đúng format không
- ✅ `api/js.js` có tồn tại và đúng format không
- ✅ Tất cả file JS cần thiết có tồn tại không
- ✅ `index.html` đã cập nhật chưa

## 🔧 Bước 2: Sửa các lỗi phát hiện

### Lỗi: "vercel.json có lỗi"
- Kiểm tra JSON syntax
- Đảm bảo không có dấu phẩy thừa
- Validate JSON online: https://jsonlint.com/

### Lỗi: "api/js.js không tồn tại"
- Tạo file `api/js.js` (đã có sẵn)
- Đảm bảo file được commit lên GitHub

### Lỗi: "File JS không tồn tại"
- Kiểm tra file có trong thư mục `js/` không
- Đảm bảo file được commit lên GitHub

## 📋 Bước 3: Đảm bảo cấu trúc đúng

```
/
├── api/
│   └── js.js          ← Phải có
├── js/
│   ├── utils.js       ← Phải có
│   ├── wheel.js       ← Phải có
│   ├── timetable.js    ← Phải có
│   ├── countdown.js   ← Phải có
│   ├── schoolWeek.js  ← Phải có
│   ├── teachingPlan.js ← Phải có
│   └── main.js        ← Phải có
├── config.js          ← Phải có
├── index.html         ← Phải có
├── styles.css         ← Phải có
├── vercel.json        ← Phải có
└── package.json       ← Phải có
```

## 🚀 Bước 4: Deploy lại

### Cách 1: Qua GitHub (Khuyến nghị)

1. **Commit và push:**
```bash
git add .
git commit -m "Fix Vercel configuration"
git push
```

2. **Trên Vercel:**
   - Vào Dashboard
   - Chọn project
   - Click "Redeploy" hoặc đợi auto-deploy

### Cách 2: Qua Vercel CLI

```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 🐛 Debug trên Vercel

1. **Xem Build Logs:**
   - Vào Vercel Dashboard
   - Chọn project → Deployments
   - Click vào deployment mới nhất
   - Xem tab "Build Logs"

2. **Xem Function Logs:**
   - Vào tab "Functions"
   - Click vào `/api/js`
   - Xem logs để debug

3. **Test API:**
   - Vào tab "Deployments"
   - Click vào URL của deployment
   - Thử truy cập: `https://your-domain.vercel.app/api/js?file=config.js`

## ⚠️ Lỗi thường gặp

### "Cannot find module 'fs'"
- Không cần fix, `fs` là built-in module của Node.js
- Vercel sẽ tự động xử lý

### "File not found"
- Kiểm tra đường dẫn trong `api/js.js`
- Đảm bảo file tồn tại trong repository
- Kiểm tra `process.cwd()` có đúng không

### "Build failed"
- Xem Build Logs để biết lỗi cụ thể
- Kiểm tra `package.json` có dependencies không hợp lệ không

### "Function timeout"
- API đọc file có thể mất thời gian
- Có thể cần tăng timeout trong Vercel settings

## ✅ Checklist cuối cùng

Trước khi deploy, đảm bảo:

- [ ] Đã chạy `npm run check` và không có lỗi
- [ ] Tất cả file đã được commit
- [ ] Đã push lên GitHub
- [ ] `vercel.json` đúng format
- [ ] `api/js.js` tồn tại và đúng format
- [ ] Tất cả file JS trong `js/` tồn tại
- [ ] `index.html` đã cập nhật để dùng API

## 🆘 Vẫn không được?

1. **Xóa project và tạo lại:**
   - Xóa project trên Vercel
   - Tạo project mới
   - Import lại từ GitHub

2. **Kiểm tra quyền GitHub:**
   - Đảm bảo Vercel có quyền truy cập repository
   - Kiểm tra repository là public hoặc đã cấp quyền

3. **Liên hệ support:**
   - Vercel có support tốt
   - Gửi logs và mô tả vấn đề

