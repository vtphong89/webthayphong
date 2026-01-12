# Hướng dẫn Upload lên GitHub

## ✅ CÁC FILE NÊN UPLOAD LÊN GITHUB

Upload **TẤT CẢ** các file sau (file gốc, chưa obfuscate):

### File chính:
- ✅ `index.html` - File HTML chính
- ✅ `styles.css` - File CSS
- ✅ `config.js` - File cấu hình

### Thư mục js/ (source code gốc):
- ✅ `js/utils.js`
- ✅ `js/wheel.js`
- ✅ `js/timetable.js`
- ✅ `js/countdown.js`
- ✅ `js/schoolWeek.js`
- ✅ `js/teachingPlan.js`
- ✅ `js/main.js`

### File build và cấu hình:
- ✅ `package.json` - Cấu hình dependencies
- ✅ `build.js` - Script để obfuscate
- ✅ `build.bat` - Script tự động build (Windows)
- ✅ `README.md` - Hướng dẫn dự án
- ✅ `README_BUILD.md` - Hướng dẫn build
- ✅ `HUONG_DAN_CAI_DAT.txt` - Hướng dẫn cài đặt

## ❌ CÁC FILE KHÔNG NÊN UPLOAD (đã được .gitignore tự động bỏ qua)

- ❌ `node_modules/` - Thư mục dependencies (sẽ tự động cài khi chạy `npm install`)
- ❌ `dist/` - Thư mục chứa file đã obfuscate (chỉ dùng để deploy lên server)
- ❌ `package-lock.json` - File lock (có thể bỏ qua, nhưng thường nên giữ)
- ❌ `*.log` - File log

## 📋 QUY TRÌNH LÀM VIỆC

### 1. Làm việc với code:
- Chỉnh sửa file gốc trong thư mục `js/` và `config.js`
- Commit và push lên GitHub

### 2. Khi cần deploy:
- Chạy `npm run build` để tạo file obfuscate trong `dist/`
- Upload thư mục `dist/` lên server (KHÔNG upload lên GitHub)

## 🔒 LÝ DO

- **GitHub**: Lưu source code gốc để có thể chỉnh sửa, review, và chia sẻ
- **Server**: Deploy file đã obfuscate trong `dist/` để bảo vệ code

## 📝 LỆNH GIT CƠ BẢN

```bash
# Kiểm tra file nào sẽ được commit
git status

# Thêm tất cả file (tự động bỏ qua file trong .gitignore)
git add .

# Commit
git commit -m "Update code"

# Push lên GitHub
git push
```

## ⚠️ LƯU Ý

- File `.gitignore` đã được cấu hình sẵn, Git sẽ tự động bỏ qua `dist/` và `node_modules/`
- Nếu ai đó clone repo về, họ chỉ cần chạy `npm install` để cài dependencies
- Để build file obfuscate, chạy `npm run build`

