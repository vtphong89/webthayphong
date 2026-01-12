# Fix Lỗi Vercel - Hướng dẫn nhanh

## ✅ Đã kiểm tra: Tất cả file đều OK!

Cấu hình local đã đúng. Vấn đề có thể ở Vercel. Làm theo các bước sau:

## 🔧 Bước 1: Xem lỗi cụ thể trên Vercel

1. **Vào Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Chọn project của bạn

2. **Xem Deployments:**
   - Click tab "Deployments"
   - Click vào deployment mới nhất (có thể có dấu ❌)

3. **Xem Build Logs:**
   - Scroll xuống phần "Build Logs"
   - Copy toàn bộ lỗi và gửi cho tôi

## 🔄 Bước 2: Thử các giải pháp phổ biến

### Giải pháp 1: Xóa và tạo lại project

1. Trên Vercel Dashboard:
   - Settings → General → Scroll xuống cuối
   - Click "Delete Project"
   - Xác nhận xóa

2. Tạo project mới:
   - Click "New Project"
   - Chọn repository từ GitHub
   - Click "Deploy"
   - **KHÔNG** thay đổi bất kỳ cấu hình nào

### Giải pháp 2: Kiểm tra Root Directory

1. Vào Settings → General
2. Tìm "Root Directory"
3. Đảm bảo để **TRỐNG** (không điền gì)
4. Save và Redeploy

### Giải pháp 3: Kiểm tra Build Command

1. Vào Settings → General
2. Tìm "Build Command"
3. Đảm bảo để **TRỐNG** (không cần build)
4. Tìm "Output Directory"
5. Đảm bảo để **TRỐNG**
6. Save và Redeploy

### Giải pháp 4: Kiểm tra Framework Preset

1. Vào Settings → General
2. Tìm "Framework Preset"
3. Chọn **"Other"** hoặc **"Vite"** (không phải Next.js)
4. Save và Redeploy

## 📋 Checklist khi tạo project mới

Khi import project từ GitHub:

- [ ] Framework Preset: **Other** hoặc **Vite**
- [ ] Root Directory: **Để trống**
- [ ] Build Command: **Để trống**
- [ ] Output Directory: **Để trống**
- [ ] Install Command: **npm install** (mặc định)
- [ ] Development Command: **Để trống**

## 🐛 Debug API Endpoint

Sau khi deploy thành công, test API:

1. **Lấy URL của deployment:**
   - Vào Deployments
   - Copy URL (ví dụ: `https://your-project.vercel.app`)

2. **Test API:**
   - Mở browser
   - Truy cập: `https://your-project.vercel.app/api/js?file=config.js`
   - Nếu thấy code JavaScript → ✅ API hoạt động
   - Nếu thấy lỗi → Copy lỗi và gửi cho tôi

## ⚠️ Lỗi thường gặp và cách fix

### Lỗi: "Build Command failed"
- **Nguyên nhân:** Vercel đang cố build project như Next.js
- **Fix:** Đặt Framework Preset = "Other"

### Lỗi: "Cannot find module"
- **Nguyên nhân:** Thiếu dependencies
- **Fix:** Đảm bảo `package.json` có đầy đủ (không cần thiết cho project này)

### Lỗi: "Function timeout"
- **Nguyên nhân:** API đọc file quá lâu
- **Fix:** Không cần fix, file nhỏ nên không timeout

### Lỗi: "404 Not Found" khi truy cập API
- **Nguyên nhân:** Vercel không detect API route
- **Fix:** 
  1. Kiểm tra file `api/js.js` có trong repository không
  2. Đảm bảo không có `.vercelignore` bỏ qua `api/`
  3. Thử xóa và tạo lại project

## 🆘 Nếu vẫn không được

Gửi cho tôi:

1. **Screenshot Build Logs** từ Vercel
2. **URL của deployment** (nếu có)
3. **Lỗi cụ thể** bạn thấy

Tôi sẽ giúp bạn fix chi tiết hơn!

## ✅ Cấu hình đúng cho project này

```
Framework Preset: Other
Root Directory: (trống)
Build Command: (trống)
Output Directory: (trống)
Install Command: npm install
Development Command: (trống)
```

**Lưu ý:** Project này là static site + API, không cần build!

